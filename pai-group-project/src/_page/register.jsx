import useAuth from '../_services/useAuth'
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import useLogin from '../_services/useLogin';

var _ = require('lodash');

function Register(props) {
  const { isLoggedIn, saveUser } = useAuth();
  const { signUp } = useLogin();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password_conf, setPasswordConf] = useState();
  const [isCompany, setIsCompany] = useState(false);
  const setUsernameDebounce = _.debounce(setUsername, 500);
  const setPasswordDebounce = _.debounce(setPassword, 500);
  const setPasswordConfDebounce = _.debounce(setPasswordConf, 500);

  let navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/");
  }

  // @TODO add password regex validation - no spaces and what not
  const handleSubmit = async e => {
    e.preventDefault();
    // OBSŁUGA BŁĘDÓW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! zajeta nazwa użyt.
    if (username && password && password === password_conf) {
      setLoading(true);
      console.log({ username, password, isCompany })
      signUp({ login: username, password, type: isCompany ? 2 : 1 })
        .then((res) => {
          if (!!res.user) {
            let user = res.user;
            user.token = res.token;
            saveUser(user);
            // setLoading(false);
          } else {
            NotificationManager.error("Rejestracja nie udała się", "Error!");
          }
        })
        .catch(error => {
          saveUser({
            ID: 0,
            login: "test",
            type: isCompany ? 2 : 1,
            token: "token"
          })
          NotificationManager.error(error.message, 'Error!');

        })
    } else {
      NotificationManager.error("Password and password confirmation are not the same", "Error in data!");
    }
  }

  return (
    <section className='my-5'>
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          {/* <h2> Login </h2> */}
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicLogin">
              <Form.Label>Login *</Form.Label>
              <Form.Control type="text" placeholder="Login" onChange={e => setUsernameDebounce(e.target.value.trim())} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password *</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPasswordDebounce(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label>Password *</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPasswordConfDebounce(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCompany">
              <Form.Check type="checkbox" label="Jestem firmą" value={isCompany} onChange={e => setIsCompany(!isCompany)} />
            </Form.Group>

            <Button variant="success" type="submit" className='w-100' disabled={loading}>
              Register
            </Button>
          </Form>
          <p className="text-center mt-4">
            <Link to="/logowanie" >Already have an account? Login now!</Link>
          </p>
        </Col>
      </Row>

    </section>
  );
}

export default Register;
