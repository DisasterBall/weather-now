import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import { fetchSensors } from './http/sensorAPI.js';
import { fetchWeathers } from './http/weatherAPI.js';

import { IntlProvider } from "react-intl";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";


const App = observer(() => {
  const locale = LOCALES.UKRAINIAN
  const {user} = useContext(Context)
  const {sensor} = useContext(Context)
  const {weather} = useContext(Context)
  const [currentLocale, setCurrentLocale] = useState(locale)
  
  const handleChange = (value) => {
    setCurrentLocale(value)
  }
  
  useEffect(() => {
    check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    })
}, [])

  useEffect(() => {
    fetchSensors().then(data => 
      sensor.setSensors(data))
    fetchWeathers().then(data => 
      weather.setWeathers(data))
  }, [])
  

  return (
    <IntlProvider 
    messages={messages[locale]}
    locale={locale}
    defaultLocale={LOCALES.UKRAINIAN}
    >
    <BrowserRouter>
      <NavBar currentLocale={currentLocale} handleChange={handleChange}/>
      <AppRouter />
    </BrowserRouter>
    </IntlProvider>
  );
})

export default App;
