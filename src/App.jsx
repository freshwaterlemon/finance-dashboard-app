import './App.css';
import StockForm from './components/stockForm';
import StockList from './components/stocklist';
import Title from './components/title';
import { useState, useEffect } from 'react';
import AppContext from './AppContext';

function App() {
	const [addedStocksDetails, setAddedStocksDetails] = useState([]);
	const [selectedSymbol, setSelectedSymbol] = useState('');

	// remember the theme selected
	useEffect(() => {
		const selectedTheme = localStorage.getItem('theme');
		document.querySelector('html').style.transition = 'background-color 0.5s ease, color 0.5s ease';

		if (selectedTheme) {
			document
				.querySelector('html')
				.setAttribute('data-theme', selectedTheme);
		}
	}, []);

	return (
		<AppContext.Provider
			value={{ addedStocksDetails, setAddedStocksDetails, selectedSymbol, setSelectedSymbol }}
		>
			<div className="app">
				<Title />
				<StockForm />
				<StockList />
			</div>
		</AppContext.Provider>
	);
}

export default App;
