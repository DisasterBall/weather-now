import React, {useContext, useEffect, useState} from 'react';
import {Container, Button, Card} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { fetchUsers, updateUsers, deleteUsers} from '../../http/userAPI.js';
import CreateUsers from '../modals/CreateUsers';


const AdminUserHide = observer(() => {
    const {user} = useContext(Context)
    const [userVisible, setUserVisible] = useState(false)
    const [number, setNumber] = useState(0)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        fetchUsers().then(data => user.setUsers(data))
    }, [])

    const setParams = (id, name, mail, rol) => {
        setNumber(id)
        setUsername(name)
        setEmail(mail)
        setRole(rol)
    }

    const updateUser = async () => {
        try {
            let data;
            data = await updateUsers(username, email, role, number);
            fetchUsers().then(dat => user.setUsers(dat))
            setNumber(0)
            alert(data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const deleteUser = async (id) => {
        try {
            let data;
            data = await deleteUsers(id);
            fetchUsers().then(dat => user.setUsers(dat))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

  return (
    <Container className="mt-4 col-12">
        <Card className="card border-secondary">
            <Card.Header className="bg-secondary text-white">
                <Button className="btn-success" onClick={() => setUserVisible(true)}>
                    <i className="fa fa-plus" aria-hidden="true">Додати користувача</i>
                </Button>
 
            </Card.Header>

            <Card.Body className="table-responsive-md">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr className="bg-secondary text-white text-center">
                            <th className="d-none">Id</th>
                            <th>Ім`я користувача</th>
                            <th>Пошта</th>
                            <th>Роль</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.users.map(user =>
                        ( number !== user.id ?    
                            <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                                                <td className="text-center">
                                                    <Button className="btn-md btn-warning" name='user.id'
                                                    onClick={() => {setParams(user.id, user.username, user.email, user.role)}}>
                                                    <i className="fa fa-pencil" aria-hidden="true">Редагувати</i> 
                                                    </Button>
                                                    &nbsp;
                                                    <Button className="btn-md btn-danger" name='user.id'
                                                    onClick={() => deleteUser(user.id)}>
                                                    <i className="fa fa-times" aria-hidden="true">Видалити</i> 
                                                    </Button>
                                                </td>

                                               
                            </tr>
                            :
                            <tr key={user.id}>
                            <td><input type='text' className='form-control' 
                            defaultValue={user.username} onChange={e => setUsername(e.target.value)}/> </td>

                            <td><input type='text' className='form-control' 
                            defaultValue={user.email} onChange={e => setEmail(e.target.value)}/> </td>

                            <td><input type='text' className='form-control' 
                            defaultValue={user.role} onChange={e => setRole(e.target.value)}/> </td>
                                <td className="text-center">
                                    <Button className="btn-md btn-success"
                                        onClick={() => {updateUser()}}>
                                    <i className="fa fa-pencil" aria-hidden="true">Зберігти</i> 
                                    </Button>
                                    &nbsp;
                                    <Button className="btn-md btn-danger" name='user.id'
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
        <CreateUsers show={userVisible} onHide={() => setUserVisible(false)}/>    
    </Container>

            
  );
});

export default AdminUserHide;
