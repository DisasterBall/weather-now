import React, {useContext, useState, useEffect} from "react";
import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import {Context} from "../index.js";
import { fetchWeathers } from '../http/weatherAPI.js'
Chart.register(...registerables);


const Charts = () => {
  const {weather} = useContext(Context)
  const [localWeather, setLocalWeather] = useState([])

  useEffect(() => {
    fetchWeathers().then(data => 
      setLocalWeather(data))
  }, [])

  console.log(localWeather)
  const lineChartData = {
    labels: ["25.08.2022", "26.08.2022", "27.08.2022", "27.08.2022"],
    datasets: [
      {
        data: [20, 30, 25],
        label: "Температура",
        borderColor: "#3333ff",
        fill: true,
        lineTension: 0.5
      }
    ]
  };

  return (
    <Line
      type="line"
      width={160}
      height={60}
      options={{
        title: {
          display: true,
          fontSize: 20
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={lineChartData}
    />
  );
};
export default Charts;