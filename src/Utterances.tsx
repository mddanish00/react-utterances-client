import * as React from 'react';

import { ResizeMessage, UtterancesProps } from './types';

import utterancesCSSStyle from './style.css?inline';

// Static variables
const preferredThemeId = 'preferred-color-scheme';
const utterancesOrigin = 'https://utteranc.es';
const frameUrl = `${utterancesOrigin}/utterances.html`;

/**
 * Another React component for using Utterances 🔮 on your website!
 *
 * Created by mddanish00
 *
 * API: https://github.com/mddanish00/react-utterances-client/#props
 */
const Utterances = ({
	repo,
	theme,
	label,
	issueNumber,
	issueTerm,
	onLoad,
	placeholder = true,
}: UtterancesProps) => {
	const [attrs, setAttrs] = React.useState<Record<string, string>>({});
	const [loaded, setLoaded] = React.useState<boolean>(false);

	// Load css style
	React.useEffect(() => {
		const cssStyle = document.createElement('style');
		cssStyle.id = 'utterances-css-style';
		cssStyle.appendChild(document.createTextNode(utterancesCSSStyle));
		document.head.appendChild(cssStyle);

		return () => {
			document.head.removeChild(cssStyle);
		};
	});

	// Only run on client-side
	React.useEffect(() => {
		const result: Record<string, string> = {};
		result.repo = repo;

		if (theme === preferredThemeId) {
			result.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'github-dark'
				: 'github-light';
		} else {
			result.theme = theme;
		}

		if (label) {
			result.label = label;
		}

		if (issueNumber) {
			result['issue-number'] = String(issueNumber);
		}

		if (issueTerm) {
			result['issue-term'] = issueTerm;
		}

		const url = new URL(location.href);

		const session = url.searchParams.get('utterances');
		if (session) {
			localStorage.setItem('utterances-session', session);
			url.searchParams.delete('utterances');
			history.replaceState(undefined, document.title, url.href);
		}

		// gather page attributes
		const canonicalLink = document.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
		result.url = canonicalLink ? canonicalLink.href : url.origin + url.pathname + url.search;
		result.origin = url.origin;
		result.pathname =
			url.pathname.length < 2 ? 'index' : url.pathname.slice(1).replace(/\.\w+$/, '');

		result.title = document.title;
		const descriptionMeta = document.querySelector(`meta[name='description']`) as HTMLMetaElement;
		result.description = descriptionMeta ? descriptionMeta.content : '';
		// truncate descriptions that would trigger 414 "URI Too Long"
		const len = encodeURIComponent(result.description).length;
		if (len > 1000) {
			result.description = result.description.slice(
				0,
				Math.floor((result.description.length * 1000) / len),
			);
		}
		const ogtitleMeta = document.querySelector(
			`meta[property='og:title'],meta[name='og:title']`,
		) as HTMLMetaElement;
		result['og:title'] = ogtitleMeta ? ogtitleMeta.content : '';

		result.session = session || localStorage.getItem('utterances-session') || '';

		setAttrs(result);

		return () => {
			setAttrs({});
		};
	}, [repo, theme, label, issueNumber, issueTerm]);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const resizeListener = React.useCallback((event: MessageEvent) => {
		if (event.origin !== utterancesOrigin) {
			return;
		}

		const data = event.data as ResizeMessage;
		if (data && data.type === 'resize' && data.height && containerRef.current) {
			containerRef.current.style.height = `${data.height}px`;
		}
	}, []);

	React.useEffect(() => {
		window.addEventListener('message', resizeListener);
		return () => window.removeEventListener('message', resizeListener);
	}, [resizeListener]);

	const shouldLoad = React.useMemo(() => JSON.stringify(attrs) !== '{}', [attrs]);

	const handleLoad = React.useCallback(() => {
		setLoaded(true);
		if (onLoad) onLoad();
	}, [onLoad]);

	const PlaceholderComponent = React.useMemo(() => {
		if (typeof placeholder === 'boolean') {
			return placeholder ? <p>Loading comments...</p> : null;
		} else {
			return placeholder;
		}
	}, [placeholder]);

	return (
		<div className="utterances" ref={containerRef}>
			{shouldLoad && (
				<>
					<iframe
						className="utterances-frame"
						title="Comments"
						scrolling="no"
						src={`${frameUrl}?${new URLSearchParams(attrs)}`}
						loading="lazy"
						onLoad={handleLoad}
					/>
					{!loaded && PlaceholderComponent}
				</>
			)}
		</div>
	);
};

export default Utterances;
