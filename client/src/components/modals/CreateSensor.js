import React, {useState, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import { createSensor, fetchSensors } from '../../http/sensorAPI';

const CreateSensor = observer(({show, onHide}) => {
    const {sensor} = useContext(Context)
    const [address, setAddress] = useState('')
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    const addSensor = async () => {
        try {
            let data;
            data = await createSensor(address, latitude, longitude)
            fetchSensors().then(dat => sensor.setSensors(dat))
            alert('Все чудово!')
            
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати сенсор
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть адресу"
                    />
                    <Form.Control
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть широту"
                    />
                    <Form.Control
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть довготу"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addSensor}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateSensor;