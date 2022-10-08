import React, {useEffect, useState} from "react";
import Chart from "../components/Chart.js";
import { fetchSensors} from '../http/sensorAPI.js'


const Statistic = () => {
  const [sensors, setSensors] = useState([])


//   useEffect(() => {
//     fetchSensors().then(data => setSensors(data))  
// }, [])

  return (
    <Chart />
  );
}

export default Statistic;