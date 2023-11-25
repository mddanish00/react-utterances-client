import React from 'react';
import Utterances from '../dist/index.js';

type Theme =
	| 'github-light'
	| 'github-dark'
	| 'preferred-color-scheme'
	| 'github-dark-orange'
	| 'icy-dark'
	| 'dark-blue'
	| 'photon-dark'
	| 'boxy-light';

const themeList: Theme[] = [
	'github-light',
	'github-dark',
	'preferred-color-scheme',
	'github-dark-orange',
	'icy-dark',
	'dark-blue',
	'photon-dark',
	'boxy-light',
];

const App = () => {
	const [selectedTheme, setSelectedTheme] = React.useState<Theme>('github-light');

	const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		//@ts-expect-error may wrong types
		setSelectedTheme(e.target.value);
	};

	return (
		<div>
			<select value={selectedTheme} onChange={handleChange}>
				{themeList.map((t, index) => (
					<option key={t + index} value={t}>
						{t}
					</option>
				))}
			</select>
			<Utterances
				repo="mddanish00/mddanish00-devblog-comments"
				theme={selectedTheme}
				issueTerm="url"
			/>
		</div>
	);
};

export default App;
