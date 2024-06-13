import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { getData } from '../services/dataService';

const DataChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        // Process data to group by sector and sum intensities per year
        const groupedData = data.reduce((acc, curr) => {
          if (curr.sector && curr.start_year) {
            if (!acc[curr.sector]) {
              acc[curr.sector] = {};
            }
            if (!acc[curr.sector][curr.start_year]) {
              acc[curr.sector][curr.start_year] = 0;
            }
            acc[curr.sector][curr.start_year] += curr.intensity;
          }
          return acc;
        }, {});

        // Prepare labels (years) and datasets (sectors)
        const years = Array.from(new Set(data.map(item => item.start_year).filter(Boolean))).sort();
        const datasets = Object.keys(groupedData).map(sector => {
          return {
            label: sector,
            data: years.map(year => groupedData[sector][year] || 0),
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1,
            barThickness: 6,
            maxBarThickness: 4,
            
          };
        });

        setChartData({
          labels: years,
          datasets: datasets
        });
      } catch (err) {
        console.error('ERROR FETCHING DATA', err);
      }
    }

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='charBar'>

        <h2>Sector Intensity</h2>
        
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  )
}

export default DataChart;
