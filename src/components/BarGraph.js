import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Ensures Chart.js components are auto-imported

const HorizontalBarGraph = () => {
    const data = {
        labels: ['Two Days Ago', 'Yesterday', 'Today'], // Labels for the past three days
        datasets: [
            {
                label: 'Payments',
                data: [150, 200, 180], // Example payment data for the past three days
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Light blue color
                borderColor: 'rgb(54, 162, 235)', // Blue color
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y', // Changes the chart to horizontal bar
        elements: {
            bar: {
                borderWidth: 2,
                borderRadius: 10, // Set border radius
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Places the legend on the right
            }
        },
        // scales: {
        //     x: {
        //         grid: {
        //             display: false // Hide x-axis grid lines
        //         }
        //     }
        // },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        // Add a little space between the bars
        barPercentage: 0.9, // Adjust as needed
        categoryPercentage: 0.9, // Adjust as needed
    };

    return (
        <div style={{ width: '200px', height: '250px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalBarGraph;
