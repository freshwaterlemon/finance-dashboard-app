import './stockform.css';
import { useState, useContext } from 'react';
import AppContext from '../AppContext';

export default function StockForm() {
	const { addedStocksDetails, setAddedStocksDetails } =
		useContext(AppContext);

	const [symbol, setSymbol] = useState('');
	const [quantity, setQuantity] = useState('');
	const [purchaseprice, setPurchasePrice] = useState('');
	const [error, setError] = useState('');

	const handleOnSubmit = async (event) => {
		event.preventDefault();

		if (!symbol) {
			setError('Please enter a stock symbol.');
			return;
		}

		const apiurl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=GJ5TYV75KH1ULNQ6`;

		try {
			const response = await fetch(apiurl);
			const data = await response.json();
			if (data['Global Quote'] && data['Global Quote']['05. price']) {
				const price = parseFloat(data['Global Quote']['05. price']);
				setError('');

				// basic input validation
				if (quantity < 1 || purchaseprice < 1) {
					setError('Please enter valid quantity and purchase price.');
					return;
				}

				const pnl = ((price - purchaseprice) * quantity).toFixed(2);
				const newStock = {
					Symbol: symbol,
					Quantity: quantity,
					PurchasePrice: purchaseprice,
					CurrentPrice: price,
					ProfitLoss: pnl,
				};

				// add to context for socklist use
				setAddedStocksDetails([...addedStocksDetails, newStock]);
				// reset input
				setSymbol('');
				setQuantity('');
				setPurchasePrice('');
			} else {
				setError(
					'Symbol does not exist or cannot fetch data (Limited API fetch per day).'
				);
			}
		} catch {
			setError('An error occurred. Please try again.');
		}
	};

	return (
		<div className="inputcontainer">
			<form onSubmit={handleOnSubmit}>
				<input
					value={symbol.trim()}
					className="forminput"
					type="text"
					placeholder="Stock Symbol"
					onChange={(e) => setSymbol(e.target.value)}
				/>
				<input
					value={quantity.trim()}
					className="forminput"
					type="number"
					placeholder="Quantity"
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<input
					value={purchaseprice.trim()}
					className="forminput"
					type="number"
					placeholder="Purchase Price"
					onChange={(e) => setPurchasePrice(e.target.value)}
				/>
				<button className="forminput" type="submit">
					Add Stock
				</button>
			</form>
			{error && <p className="error">{error}</p>}
		</div>
	);
}
