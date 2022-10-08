import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE} from "../utils/constsRoutes";
import {login, registration} from "../http/userAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { FormattedMessage, useIntl } from 'react-intl'


const Auth = observer(() => {
  const intl = useIntl();
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
      try {
          let data;
          if (isLogin) {
              data = await login(email, password);
          } else {
              data = await registration(username, email, password);
          }
          user.setUser(data)
          user.setIsAuth(true)
          navigate(MAIN_ROUTE, {replace: true})
      } catch (e) {
          alert(e.response.data.message)
      }

  }

  return (
      <Container
          className="d-flex justify-content-center align-items-center"
          style={{height: window.innerHeight - 54}}
      >
          <Card style={{width: 600, marginTop: '-50px'}} className="p-4">
              <h2 className="m-auto">{isLogin ? <FormattedMessage id='authoriz' /> : "Реєстрація"}</h2>
              <Form className="d-flex flex-column">
                {isLogin ?
                <>
                    <Form.Control
                      className="mt-3"
                      placeholder={intl.formatMessage({id: 'place_email'})}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Form.Control
                      className="mt-3"
                      placeholder={intl.formatMessage({id: 'place_pass'})}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                  />
                  </>
                  :
                  <>
                  <Form.Control
                      className="mt-3"
                      placeholder="Введіть Ваше ім'я користувача"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                  />
                  <Form.Control
                      className="mt-3"
                      placeholder="Введіть Вашу пошту"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Form.Control
                      className="mt-3"
                      placeholder="Введіть Ваш пароль"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                  />
                  </>
                }
                  
                  <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                      {isLogin ?
                          <div style={{marginTop: '10px'}}>
                              <FormattedMessage id='not_acc' /> <NavLink to={REGISTRATION_ROUTE}><FormattedMessage id='reg' /></NavLink>
                          </div>
                          :
                          <div style={{marginTop: '10px'}}>
                              Є обліковий запис? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
                          </div>
                      }
                      <Button
                          variant={"outline-success"}
                          onClick={click}
                      >
                          {isLogin ? <FormattedMessage id='signUp' /> : 'Реєстрація'}
                      </Button>
                  </div>

              </Form>
          </Card>
      </Container>
  );
});

export default Auth;
