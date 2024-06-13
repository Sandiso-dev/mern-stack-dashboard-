import { useState } from 'react';
import './App.css';
import DataChart from './components/DataChart';
import Line from './components/Line';
import DoughnutComp from './components/DoughnutComp';

function App() {

  return (
    <div className="container">
      <h1 style={{marginLeft:"20px"}}>Visualisation Data</h1>
      
      <div className="dashboards_one">
      <Line />
      </div>

      <div className="dashboard_two">
      <DataChart />
      <DoughnutComp/>
      </div>
      
    </div>
  )
}

export default App
