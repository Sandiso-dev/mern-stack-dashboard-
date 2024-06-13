import React, { useEffect, useState } from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import { getData } from '../services/dataService';

const Line = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        // Process data to group by topic and year
        const groupedData = data.reduce((acc, curr) => {
          if (curr.topic && curr.start_year) {
            if (!acc[curr.topic]) {
              acc[curr.topic] = {};
            }
            if (!acc[curr.topic][curr.start_year]) {
              acc[curr.topic][curr.start_year] = 0;
            }
            acc[curr.topic][curr.start_year] += curr.intensity;
          }
          return acc;
        }, {});

        // Prepare labels (years) and datasets (topics)
        const years = Array.from(new Set(data.map(item => item.start_year).filter(Boolean))).sort();
        const datasets = Object.keys(groupedData).map(topic => {
          return {
            label: topic,
            data: years.map(year => groupedData[topic][year] || 0),
            fill: false,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1,
          };
        });

        setChartData({
          labels: years,
          datasets: datasets
        });
      } catch (err) {
        console.error('ERROR FETCHING DATA', err);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='lineChar'>

    <h2>Topic Trends</h2>

      <LineChart
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false // Hide the legend
            }
          }
        }}
      />
    </div>
  );
};

export default Line;
