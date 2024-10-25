import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../componentStyle/login.css";
import { useNavigate, Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  FloatingLabel,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
function Login({ loginSession, onLogin }) {
  const navigate = useNavigate();
  //const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('');
  const passwordRef = useRef();
  const userRef = useRef();

  const [login, setLogin] = useState();
  const [wrongLogin, setWrongLogin] = useState(false);
  const [faltanDatos, setFaltanDatos] = useState(false);

  const [show, setShow] = useState(false); //para toast
  const [showError, setShowError] = useState(false); //para toast

  const submitHandler = (e) => {
    console.log("subido!");
    e.preventDefault();

    //setPassword(passwordRef.current.value);
    //setEmail(emailRef.current.value);

    if (userRef.current.value == "" || passwordRef.current.value == "") {
      setFaltanDatos(true);
      setWrongLogin(false);
    } else {
      setFaltanDatos(false);
      loginAPI();
    }
  };

  const loginAPI = async () => {
    console.log("nah");
    const response = await axios.post("http://localhost:8080/api/users/login", {
      username: userRef.current.value,
      password: passwordRef.current.value,
    });
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      setShow(true);
      onLogin(response.data);
      setLogin(response.data);
    } else {
      setWrongLogin(true);
    }
  };
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem('login'));
    // if (items) {
    //  setLogin(items);
    // }
  }, []);

  useEffect(() => {
    if (login) {
      localStorage.setItem("login", JSON.stringify(login));
      console.log("Logged in!");
      setWrongLogin(false);
      navigate("/");
    }
  }, [login]);

  return (
    <div className="login">
      <Row xs={12} className="d-flex flex-row">
        <Col xs={{ span: 4, offset: 4 }}>
          <div className="mainBackground">
            <div className="container">
              <form onSubmit={submitHandler}>
                <h2>Inicia sesion</h2>
                <input placeholder="Usuario" type="text" ref={userRef} />
                <br />
                <input placeholder="contrasena" type="text" ref={passwordRef} />
                <br />
                {wrongLogin && (
                  <p className="errorText">
                    Error: Usuario o contraseña erroneos
                  </p>
                )}
                {faltanDatos && (
                  <p className="errorText">Falta llenar campos!</p>
                )}
                <button type="submit" className="buttonLogin">
                  Iniciar Sesion
                </button>
              </form>
              {/* <p>Submit Value:<b>{password}</b> <b>{email}</b></p> */}
              <Link id="registerLink" to="/register">
                Sin cuenta? Haga una aqui!
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShow(false)}
          bg="success"
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Header style={{ backgroundColor: "green" }}>
            <img
              src="holder.js/10x10?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Welcome!</strong>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "green" }}>
            Logged in!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
    </div>
  );
}
export default Login;
