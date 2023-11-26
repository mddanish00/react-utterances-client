export interface ResizeMessage {
	type: 'resize';
	height: number;
}
// modified types from utterances-react-component
export type UtterancesProps = {
	repo: Repo;
	label?: string;
	theme?: Theme;
	loading?: 'eager' | 'lazy';
	onLoad?: () => void;
	placeholder?: boolean | React.ReactElement;
} & Issue;

type Repo = `${string}/${string}`;
type Issue =
	| {
			issueTerm: Term | string[];
			issueNumber?: never;
	  }
	| {
			issueTerm?: never;
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
	| 'boxy-light';
