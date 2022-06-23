import useAuth from '../_services/useAuth'
import { useState, useReducer } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { LoaderComponent } from '../_components/LoaderComponent';
var _ = require('lodash');

function Login(props) {
  const {isLoggedIn, login} = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUserNameDebounce = _.debounce(setUserName, 500);
  const setPasswordDebounce = _.debounce(setPassword, 500);
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
      login({ username, password })
        .then((res) => {
          setLoading(false);
          if (res) {
            navigate("/", { replace: true });
          } else {
            // NotificationManager.error('Username and/or password are inncorect', 'Error!');
          }
        })
        .catch((err) => {
          console.error(err);
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name *</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={e => setUserName(e.target.value.trim())} />
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
