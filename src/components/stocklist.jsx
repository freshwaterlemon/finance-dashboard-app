import './stocklist.css';
import { useContext, useState, useCallback } from 'react';
import AppContext from '../AppContext';
import LineChart from './linechart';
import BackToTop from './backtotop';

export default function StockList() {
	const { addedStocksDetails } = useContext(AppContext);
	const [searchQuery, setSearchQuery] = useState('');

	// search filter
	const filteredStocks = addedStocksDetails.filter((stock) =>
		stock.Symbol.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const renderStockItem = useCallback(
		(stocksInList, index) => (
			<ul className="stockliststack" key={index}>
				<li>
					<div className="stockliststackcontainer">
						<div className="stockliststackptag">
							<p>Symbol: {stocksInList.Symbol}</p>
							<p>Quantity: {stocksInList.Quantity}</p>
							<p>Purchase Price: {stocksInList.PurchasePrice}</p>
							<p>Current Price: {stocksInList.CurrentPrice}</p>
							<p
								className={
									stocksInList.ProfitLoss > 0
										? 'profit'
										: 'loss'
								}
							>
								Profit/Loss:{' '}
								{stocksInList.ProfitLoss > 0
									? `+${stocksInList.ProfitLoss}`
									: stocksInList.ProfitLoss}
							</p>
						</div>
						<div className="stockliststacklinechart">
							<LineChart chartSymbol={stocksInList.Symbol} />
						</div>
					</div>
				</li>
			</ul>
		),
		[]
	);

	return (
		<>
			<div className="stocklist">
				<h2>Stock List</h2>

				{addedStocksDetails.length === 0 ? (
					<p className="nostocklist">No stocks added yet</p>
				) : (
					<>
						<div className="searchbarcontainer">
							<input
								type="search"
								placeholder="Filter By Symbol..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="stocklistsearchbar"
							/>
						</div>
						{filteredStocks.length === 0 ? (
							<p className="nostocklist">
								No stocks match your search
							</p>
						) : (
							<div
								id="stockliststackmain"
								className="stockliststackmain"
							>
								{filteredStocks.map((stocksInList, index) =>
									renderStockItem(stocksInList, index)
								)}
							</div>
						)}
					</>
				)}
				{/* back to top button */}
				<BackToTop />
			</div>
		</>
	);
}
