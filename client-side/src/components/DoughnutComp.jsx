import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { getData } from '../services/dataService';

const DoughnutComp = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        // Process data to group by sector and sum intensities
        const groupedData = data.reduce((acc, curr) => {
          if (curr.sector) {
            if (!acc[curr.sector]) {
              acc[curr.sector] = 0;
            }
            acc[curr.sector] += curr.intensity;
          }
          return acc;
        }, {});

        // Prepare labels (sectors) and data (summed intensities)
        const sectors = Object.keys(groupedData);
        const intensities = Object.values(groupedData);

        // Set chart data
        setChartData({
          labels: sectors,
          datasets: [
            {
              data: intensities,
              backgroundColor: sectors.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
              ),
              borderColor: sectors.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
              ),
              borderWidth: 1,
            },
          ],
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
    <div className='roundBar' >
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default DoughnutComp;
