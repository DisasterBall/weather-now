import React, {useState, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import { createUsers, fetchUsers } from '../../http/userAPI';

const CreateUsers = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const addUser = async () => {
        try {
            let data;
            data = await createUsers(username, email, password, role)
            fetchUsers().then(dat => user.setUsers(dat))
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
                    Додати користувача
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть ім'я користувача"
                    />
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть пошту"
                    />
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть пароль"
                    />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{role || "Виберіть роль"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => setRole('USER')}
                                >
                                    USER
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => setRole('ADMIN')}
                                >
                                    ADMIN
                                </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> 
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addUser}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateUsers;