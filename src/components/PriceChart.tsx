import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  history: { timestamp: number; price: number }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ history }) => {
  const reverse = [...history].reverse();
  const data = {
    labels: reverse.map((point) => new Date(point.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Price',
        data: reverse.map((point) => point.price),
        fill: true,
        borderColor: '#A855F7',
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (EUR)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PriceChart;