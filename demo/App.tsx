import React from 'react';
import { Utterances } from '../dist/index.js';

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
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<h1>react-utterances-client🔮 Demo</h1>
			<p style={{ fontSize: '12px' }}>
				This icon svg that used as the demo icon, 🔮 is a part of googlefonts/noto-emoji project
				that licensed under the Apache License 2.0.
			</p>
			<h2>Comments</h2>
			<div
				style={{
					marginTop: '2rem',
					marginBottom: '2rem',
				}}
			>
				<p style={{ display: 'inline-block' }}>Theme:&nbsp;</p>
				<select value={selectedTheme} onChange={handleChange}>
					{themeList.map((t, index) => (
						<option key={t + index} value={t}>
							{t}
						</option>
					))}
				</select>
			</div>
			<Utterances
				repo="mddanish00/mddanish00-devblog-comments"
				theme={selectedTheme}
				issueTerm="title"
			/>
		</div>
	);
};

export default App;
