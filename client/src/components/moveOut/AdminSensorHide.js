import React, {useContext, useEffect, useState} from 'react';
import {Container, Button, Card} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { fetchSensors, updateSensor, deleteSensor} from '../../http/sensorAPI.js';
import CreateSensor from '../modals/CreateSensor';


const AdminSensorHide = observer(() => {
    const {sensor} = useContext(Context)
    const [sensorVisible, setSensorVisible] = useState(false)
    const [number, setNumber] = useState(0)
    const [address, setAddress] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    useEffect(() => {
        fetchSensors().then(data => sensor.setSensors(data))
    }, [])

    const setParams = (id, adrs, lat, lon) => {
        setNumber(id)
        setAddress(adrs)
        setLatitude(lat)
        setLongitude(lon)
    }

    const updateSensors = async () => {
        try {
            let data;
            data = await updateSensor(address, latitude, longitude, number);
            fetchSensors().then(dat => sensor.setSensors(dat))
            setNumber(0)
            alert(data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const deleteSensors = async (id) => {
        try {
            let data;
            data = await deleteSensor(id);
            fetchSensors().then(dat => sensor.setSensors(dat))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

  return (
    <Container className="mt-4 col-12">
        <Card className="card border-secondary">
            <Card.Header className="bg-secondary text-white">
                <Button className="btn-success" onClick={() => setSensorVisible(true)}>
                    <i className="fa fa-plus" aria-hidden="true">Додати сенсор</i>
                </Button>
 
            </Card.Header>

            <Card.Body className="table-responsive-md">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr className="bg-secondary text-white text-center">
                            <th className="d-none">Id</th>
                            <th>Адреса</th>
                            <th>Широта</th>
                            <th>Довгота</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensor.sensors.map(sensor =>
                        ( number !== sensor.id ?    
                            <tr key={sensor.id}>
                            <td>{sensor.address}</td>
                            <td>{sensor.latitude}</td>
                            <td>{sensor.longitude}</td>
                                                <td className="text-center">
                                                    <Button className="btn-md btn-warning" name='sensor.id'
                                                    onClick={() => {setParams(sensor.id, sensor.address, sensor.latitude, sensor.longitude)}}>
                                                    <i className="fa fa-pencil" aria-hidden="true">Редагувати</i> 
                                                    </Button>
                                                    &nbsp;
                                                    <Button className="btn-md btn-danger" name='sensor.id'
                                                    onClick={() => deleteSensors(sensor.id)}>
                                                    <i className="fa fa-times" aria-hidden="true">Видалити</i> 
                                                    </Button>
                                                </td>

                                               
                            </tr>
                            :
                            <tr key={sensor.id}>
                            <td><input type='text' className='form-control' 
                            defaultValue={sensor.address} onChange={e => setAddress(e.target.value)}/> </td>

                            <td><input type='text' className='form-control' 
                            defaultValue={sensor.latitude} onChange={e => setLatitude(e.target.value)}/> </td>

                            <td><input type='text' className='form-control' 
                            defaultValue={sensor.longitude} onChange={e => setLongitude(e.target.value)}/> </td>
                                <td className="text-center">
                                    <Button className="btn-md btn-success"
                                        onClick={() => {updateSensors()}}>
                                    <i className="fa fa-pencil" aria-hidden="true">Зберігти</i> 
                                    </Button>
                                    &nbsp;
                                    <Button className="btn-md btn-danger" name='sensor.id'
                                        onClick={() => setNumber(0)}>
                                    <i className="fa fa-times" aria-hidden="true">Закрити</i> 
                                    </Button>
                                </td>

                            </tr>
                        )
                        )
                         
                        }
                    </tbody>
                </table>
            </Card.Body>
        </Card>
        <CreateSensor show={sensorVisible} onHide={() => setSensorVisible(false)}/>    
    </Container>

            
  );
});

export default AdminSensorHide;
