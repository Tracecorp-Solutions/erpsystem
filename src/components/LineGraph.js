import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Auto-imports components needed for the chart

const LineGraph = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'], // Example months
        datasets: [
            {
                label: 'Deposits',
                data: [500, 600, 800, 980, 1200], // Example data showing increase in deposits
                fill: false,
                backgroundColor: 'gray',
                borderColor: 'green',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineGraph;
