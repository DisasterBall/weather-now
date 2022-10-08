import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import SensorStore from './store/SensorStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherStore from './store/WeatherStore';


export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    sensor: new SensorStore(),
    weather: new WeatherStore()
  }}>
    <App />
  </Context.Provider>
);


