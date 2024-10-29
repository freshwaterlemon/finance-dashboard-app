import { useEffect, useCallback, useState } from 'react';
import './title.css';

const Title = () => {
	// remember the theme on page refresh
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

	const setThemeLight = useCallback(() => {
		document.querySelector('html').style.transition = 'background-color 0.5s ease, color 0.5s ease';
		setTheme('light');
		localStorage.setItem('theme', 'light');
	}, []);

	const setThemeDark = useCallback(() => {
		document.querySelector('html').style.transition = 'background-color 0.5s ease, color 0.5s ease';
		setTheme('dark');
		localStorage.setItem('theme', 'dark');
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<>
			<div className="titlecontainer">
				<h1>Finance Dashboard</h1>
				<div className="themecontainer">
					{/* sun icon */}
					<div onClick={setThemeLight}>
						<svg
							className="themelight"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
						>
							<path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z" />
						</svg>
					</div>
					{/* moon icon */}
					<div onClick={setThemeDark}>
						<svg
							className="themedark"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
						>
							<path d="M380-160q133 0 226.5-93.5T700-480q0-133-93.5-226.5T380-800h-21q-10 0-19 2 57 66 88.5 147.5T460-480q0 89-31.5 170.5T340-162q9 2 19 2h21Zm0 80q-53 0-103.5-13.5T180-134q93-54 146.5-146T380-480q0-108-53.5-200T180-826q46-27 96.5-40.5T380-880q83 0 156 31.5T663-763q54 54 85.5 127T780-480q0 83-31.5 156T663-197q-54 54-127 85.5T380-80Zm80-400Z" />
						</svg>
					</div>
				</div>
			</div>
		</>
	);
};

export default Title;
