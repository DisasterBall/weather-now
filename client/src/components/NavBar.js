import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'
import { MAIN_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, STATISTIC_ROUTE} from '../utils/constsRoutes';



const NavBar = observer(({ currentLocale, handleChange }) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE, {replace: true})
    }

    if(user.isAuth){
        if(user.user.role === 'ADMIN'){
            return (
            <Navbar bg="dark" variant="dark">
            <Container>
                <p style={{color:'white', marginTop: '6px', fontSize: '28px'}}>WeatherNow</p>
                
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            onClick={() => navigate(STATISTIC_ROUTE, {replace: true})}
                        >
                        Статистика
                        </Button>
                        <Button
                            style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            onClick={() => navigate(MAIN_ROUTE, {replace: true})}
                        >
                        Мапа
                        </Button>
                        <Button
                            style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE, {replace: true})}
                        >
                        Панель Адміністратора
                        </Button>
                        <Button
                            style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            
                            className="ml-2"
                        >
                        Uk
                        </Button>
                        <Button
                            style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            
                            className="ml-2"
                        >
                        Eng
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                        Вийти
                        </Button>
                    </Nav>
            </Container>
            </Navbar>
        )}
        return(
            <Navbar bg="dark" variant="dark">
            <Container>
                <p style={{color:'white', marginTop: '6px', fontSize: '28px'}}>WeatherNow</p>  
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button
                        style={{marginRight: '4px'}}
                        variant={"outline-light"}
                        onClick={() => navigate(STATISTIC_ROUTE, {replace: true})}
                    >
                    Статистика
                    </Button>
                    <Button
                        style={{marginRight: '4px'}}
                        variant={"outline-light"}
                        onClick={() => navigate(MAIN_ROUTE, {replace: true})}
                    >
                    Мапа
                    </Button>
                    <Button
                        style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            
                            className="ml-2"
                        >
                        Uk
                    </Button>
                    <Button
                        style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            
                            className="ml-2"
                        >
                        Eng
                    </Button>
                    <Button
                        variant={"outline-light"}
                        onClick={() => logOut()}
                        className="ml-2"
                    >
                    Вийти
                    </Button>
                </Nav>
            </Container>
            </Navbar>
        )    
        
    }
    console.log(currentLocale)
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <p style={{color:'white', marginTop: '6px', fontSize: '28px'}}>WeatherNow</p>
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button
                        style={{marginRight: '4px'}}
                            variant={"outline-light"}
                            
                            className="ml-3"
                           
                    >
                    Uk
                    </Button>
                    <Button
                            variant={"outline-light"}
                            
                            className="ml-2"
                            
                    >
                    Eng
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;