'use client';

import * as React from 'react';

import './style.css';
import { ResizeMessage, UtterancesProps } from './types';

// static variable
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
	? 'github-dark'
	: 'github-light';
const preferredThemeId = 'preferred-color-scheme';
const utterancesOrigin = 'https://utteranc.es';
const frameUrl = `${utterancesOrigin}/utterances.html`;

const Utterances = ({ repo, theme, label, issueNumber, issueTerm }: UtterancesProps) => {
	const attrs = React.useMemo(() => {
		const result: Record<string, string> = {};
		result.repo = repo;
		result.theme = theme === preferredThemeId ? preferredTheme : theme;

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

		return result;
	}, [issueNumber, issueTerm, label, repo, theme]);

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

	return (
		<div className="utterances" ref={containerRef}>
			<iframe
				className="utterances-frame"
				title="Comments"
				scrolling="no"
				src={`${frameUrl}?${new URLSearchParams(attrs)}`}
				loading="lazy"
			/>
		</div>
	);
};

export default Utterances;
