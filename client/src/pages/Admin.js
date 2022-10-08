import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import AdminUserHide from '../components/moveOut/AdminUserHide';
import AdminSensorHide from '../components/moveOut/AdminSensorHide';


const Admin = () => {
    const [usersVisible, setUsersVisible] = useState(false)
    const [sensorsVisible, setSensorsVisible] = useState(false)

  return (
    <Container>
        <Row className="justify-content-center">
            <Col xs lg="2">    
                <Button
                    
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => {setUsersVisible(true); setSensorsVisible(false)}}
                >
                Користувачі
                </Button>
            </Col>
            <Col xs lg="1">
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 "
                    onClick={() => {setSensorsVisible(true); setUsersVisible(false)}}
                >
                Сенсори
                </Button>
            </Col>
            
        </Row>

        <Row>
        {usersVisible ?
            <AdminUserHide show={"true"} onHide={() => setUsersVisible(false)}/>
            :
            null
        }
        {sensorsVisible ?
            <AdminSensorHide show={"true"} onHide={() => setSensorsVisible(false)}/>
            :
            null
        }   
        </Row>
    </Container>
  );
}

export default Admin;
