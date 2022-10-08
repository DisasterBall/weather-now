import React, {Component, useEffect, useState, useContext } from "react";
import L, { marker } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import { Context } from "../../index.js";





L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const Map = () =>{
    const {sensor} = useContext(Context)
    const {weather} = useContext(Context)
    const [actualWeathers, setActualWeathers] = useState([])
    
    const actualClothes = (wthers) => {
        let temp = wthers
        for(let i = 0; i < temp.length; i++){
            if(temp[i].temperature >= 30 && temp[i].windSpeed <= 5){
                temp[i].text = "Шорти, футболка, босоніжки" 
            }else if(temp[i].temperature <= 20 && temp[i].windSpeed >= 8){
                temp[i].text = "Брюки, кофта, кросівки, накидка" 
            }else if(temp[i].temperature === 25 && temp[i].windSpeed === 4){
                temp[i].text = "Шорти, футболка, босоніжки, накидка" 
            }
        }
        weather.setWeathers(temp)
        
      }


    const mergeMarkersWeathers = (markers, weathers) => {
                let array = []
                for(let i = 0; i < markers.length; i++){
                    for(let j = weathers.length-1; j > 0; j--){
                        if(markers[i].id === weathers[j].sensorId){
                            let actual = Object.assign(markers[i], weathers[j])
                            array.push(actual)
                        }
                    }
                }
                setActualWeathers(array)
    }
    useEffect(() => {
        actualClothes(weather.weathers)
      }, [])

    
    useEffect(() => {
        mergeMarkersWeathers(sensor.sensors, weather.weathers)
                   
    }, [sensor.sensors, weather.weathers])
    console.log(actualWeathers)
    return(
                    <MapContainer center={[48.993703, 36.238540]} zoom={13} scrollWheelZoom={false} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {actualWeathers.map((marker) => (
                        
                            <Marker key={marker.sensorId} position={[marker.latitude, marker.longitude]}>
                                <Popup>
                                    Температура: {marker.temperature} °C<br /> 
                                    Вологість: {marker.humidity}%<br />
                                    Швидкість вітру: {marker.windSpeed} м/с<br />
                                    Слід одягнути: {marker.text}
                                </Popup>
                            </Marker>
                        
                    ))}
                    </MapContainer>
    )
}

export default Map;
