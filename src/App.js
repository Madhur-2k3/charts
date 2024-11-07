// import './App.css';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import chartData from './data/chartData.json';
// import { Line } from 'react-chartjs-2';

// // Register necessary components, including Title, Tooltip, and Legend
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome, Madhur!</h1>
//       <Line 
//         data={{
//           labels: chartData.map((data) =>
//             new Date(data.timestamp).toLocaleString("en-US", {
//               hour: "numeric",
//               minute: "numeric",
//               hour12: true,
//             })
//           ),
//           datasets: [
//             {
//               label: "Moisture",
//               data: chartData.map((data) => data.moistureLevel),
//               backgroundColor: "#064FF0",
//               borderColor: "#064FF0"
//             },
//             {
//               label: "Temperature",
//               data: chartData.map((data) => data.temperature),
//               backgroundColor: "#FF3030",
//               borderColor: "#FF3030"
//             }
//           ]
//         }}
//         options={{
//           plugins: {
//             title: {
//               display: true,  // This enables the title display
//               text: "Daily Moisture Levels and Temperature"
//             },
//             legend: {
//               display: true,  // This enables the legend for dataset labels
//               position: "top"
//             }
//           },
//           responsive: true,
//           maintainAspectRatio: false
//         }}
//       />
//       {/* hello */}
//     </div>
//   );
// }

// export default App;

import './App.css';
import { useState } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import chartData from './data/chartData.json';
import weekData from './data/chartData.json';
import { Line } from 'react-chartjs-2';

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function App() {
  const [startDate, setStartDate] = useState(null); // Start date for 7-day range

  // Filter data to include only 7 days from the selected start date
  const filteredData = weekData.filter(data => {
    if (!startDate) return true; // If no date is selected, show all data
    const date = new Date(data.timestamp);
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 7); // Set end date to 7 days after start date
    return date >= start && date < end;
  });

  return (
    <div className="App">
      {/* <h2>Select Start Date for 7-Day View</h2> */}
      <h2>Welcome,User !</h2>
      <input
        type="date"
        onChange={(e) => setStartDate(e.target.value)}
      />
      
      <Line 
        data={{
          labels: filteredData.map(data => 
            new Date(data.timestamp).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              hour12: true,
            })
          ),
          datasets: [
            {
              label: "Moisture",
              data: filteredData.map(data => data.moistureLevel),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0"
            },
            {
              label: "Temperature",
              data: filteredData.map(data => data.temperature),
              backgroundColor: "#FF3030",
              borderColor: "#FF3030"
            }
          ]
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "7-Day Moisture and Temperature Levels"
            },
            legend: {
              display: true,
              position: "top"
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}

export default App;
