/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Types Disclaimer
 * ----------------
 *
 * Some of types that used in react-utterances-client are copied and modified from utterances-react-component.
 *
 * The utterances-react-component is released under MIT license.
 *
 * The react-utterances-client is released under MIT license.
 */
export type UtterancesProps = {
	/**
	 * Comments respository for use with this component.
	 */
	repo: Repo;
	/**
	 * Label that will be assigned to issues created by Utterances.
	 */
	label?: string;
	/**
	 * Theme that will be used by Utterances.
	 * @default 'github-light'
	 */
	theme?: Theme;
	/**
	 * Indicates when the browser should load this component.
	 * In the case, you want to modify the default behaviour for some reason.
	 * @default 'lazy'
	 */
	loading?: 'lazy' | 'eager';
	/**
	 * Event callback when this component finish loading.
	 */
	onLoad?: (e: any) => void;
	/**
	 * Event callback when this component throw errors.
	 */
	onError?: (e: any) => void;
	/**
	 * Place you want to keep your token.
	 *
	 * 'session' to sessionStorage, 'local' to LocalStorage
	 * @default 'local'
	 */
	tokenStorage?: 'local' | 'session';
	/**
	 * Placeholder when this component is still loading.
	 * You can disable, or enable it with default placeholder or provide your own placeholder component.
	 * This also will force loading prop to 'eager' regardless what you set.
	 * @default false
	 */
	placeholder?: boolean | React.ReactElement;
	/**
	 * ClassName of the Utterances iframe container.
	 */
	containerClassName?: string;
	/**
	 * Style of the Utterances iframe container.
	 */
	containerStyle?: React.CSSProperties;
	/**
	 * ClassName of the Utterances iframe.
	 */
	iframeClassName?: string;
	/**
	 * Style of the Utterances iframe.
	 */
	iframeStyle?: React.CSSProperties;
} & Issue;

type Repo = `${string}/${string}`;
type Issue =
	| {
			/**
			 * Mapping the current page with term like page url, page title, OpenGraph title, page pathname or evern your own list of terms.
			 * This prop cannot be used with issueNumber.
			 */
			issueTerm: Term | string[];
			/**
			 * Mapping the current page with specific issue number in the repository.
			 * This prop cannot be used with issueTerm.
			 */
			issueNumber?: never;
	  }
	| {
			/**
			 * Mapping the current page with term like page url, page title, OpenGraph title, page pathname or evern your own list of terms.
			 * This prop cannot be used with issueNumber.
			 */
			issueTerm?: never;
			/**
			 * Mapping the current page with specific issue number in the repository.
			 * This prop cannot be used with issueTerm.
			 */
			issueNumber: number;
	  };
type Term = 'pathname' | 'url' | 'title' | 'og:title';
type Theme =
	| 'github-light'
	| 'github-dark'
	| 'preferred-color-scheme'
	| 'github-dark-orange'
	| 'icy-dark'
	| 'dark-blue'
	| 'photon-dark'
	| 'boxy-light'
	| 'gruvbox-dark';

export interface ResizeMessage {
	type: 'resize';
	height: number;
}
