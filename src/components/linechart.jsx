import { useState, useEffect } from 'react';
import './linechart.css';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
	Chart as chartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Legend,
	Tooltip,
	Filler,
} from 'chart.js';

chartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Legend,
	Tooltip,
	Filler
);

const LineChart = ({ chartSymbol }) => {
	const [closingPrice, setClosingprice] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const apiweeklyurl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${chartSymbol}&apikey=GJ5TYV75KH1ULNQ6`;
			const response = await fetch(apiweeklyurl);
			const data = await response.json();
			const timeSeries = data['Weekly Time Series'];
			const dates = Object.keys(timeSeries).slice(0, 7).reverse();
			const closePrices = dates.map(
				(date) => timeSeries[date]['4. close']
			);

			setLabels(dates);
			setClosingprice(closePrices);
		};

		if (chartSymbol) {
			fetchData();
		}
	}, [chartSymbol]);

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'weekly close over 7 weeks',
				data: closingPrice,
				fill: {
					target: 'origin',
					above: 'rgb(178, 164, 142, 0.1)',
				},
				borderColor: 'rgb(178, 164, 142)',
				tension: 0.1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		pointBackgroundColor: 'rgb(178, 164, 142)',
		pointHitRadius: '2',
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					boxWidth: 0,
				},
			},
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
			},
		},
	};

	return (
		<div className="linecontainer">
			<Line data={data} options={options} />
		</div>
	);
};

LineChart.propTypes = {
	chartSymbol: PropTypes.string,
};

export default LineChart;
