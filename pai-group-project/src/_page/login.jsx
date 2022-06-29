import useAuth from '../_services/useAuth'
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { LoaderComponent } from '../_components/LoaderComponent';
import { NotificationManager } from 'react-notifications';
import useLogin from '../_services/useLogin';
var _ = require('lodash');

function Login() {
  const { isLoggedIn, saveUser } = useAuth();
  const { signIn } = useLogin();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const setUserNameDebounce = _.debounce(setUserName, 500);
  // const setPasswordDebounce = _.debounce(setPassword, 500);
  // const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <Navigate to={{ pathname: '/' }} />
    )
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      setPassword("");
      // console.log(username, password);
      signIn({ username, password })
        .then((res) => {
          if (!!res.user) {
            let user = res.user;
            user.token = res.token
            saveUser(user);
          } else {
            NotificationManager.error("Logowanie nie udało się", "Error!");
          }
          // setLoading(false);
          // if (res) {
          //   navigate("/", { replace: true });
          // } else {
          //   // NotificationManager.error('Username and/or password are inncorect', 'Error!');
          // }
        })
        .catch((error) => {
          NotificationManager.error(error.message, 'Error!');
          console.error(error);
        })
    } else {
      // 
    }
  }

  return (
    <section>
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          {/* <h2> Login </h2> */}
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicLogin">
              <Form.Label>Login *</Form.Label>
              <Form.Control type="text" placeholder="Login" onChange={e => setUserName(e.target.value.trim())} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password *</Form.Label>
              <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="success" type="submit" className='w-100' disabled={loading}>
              Login
            </Button>
          </Form>

          <p className="text-center mt-4">
            <Link to="/rejestracja" >Don't have an account? Register now!</Link>
          </p>
        </Col>
      </Row>

    </section>
  );
}

export default Login;
