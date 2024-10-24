import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../componentStyle/register.css";

import { Navigate, useNavigate, Link } from "react-router-dom";

import {
  Row,
  Col,
  Container,
  FloatingLabel,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const fetchAPI = async () => {
  const response = await axios.get("http://localhost:8080/api");
  //setArray(response.data.fruits);
  setArray(response.data);
  console.log(response.data);
};

const funci = () => {
  console.log("Test exitoso!");
};

function Register() {
  const navigate = useNavigate();
  //const [userName, setUserName] = useState('');
  //const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('');
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();

  const [wrongRegister, setWrongRegister] = useState(false);
  const [faltanDatos, setFaltanDatos] = useState(false);

  const [savedImage, setSavedImage] = useState(null);
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false); //para toast
  const [showError, setShowError] = useState(false); //para toast

  const submitHandler = (e) => {
    e.preventDefault();

    //setUserName(usernameRef.current.value);
    //setPassword(passwordRef.current.value);
    //setEmail(emailRef.current.value);
    if (
      emailRef.current.value == "" ||
      usernameRef.current.value == "" ||
      passwordRef.current.value == ""
    ) {
      setFaltanDatos(true);
      setWrongRegister(false);
    } else {
      setFaltanDatos(false);
      registerAPI();
    }
  };

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const base64 = await convertToBase64(file);
      setImage(URL.createObjectURL(event.target.files[0]));
      //setImage(URL.createObjectURL(imageRef.current.files[0]));
      //  console.log(imageRef.current.files[0]);
      setSavedImage(base64);
      console.log(base64);

      //   var image = new Image();
      // image.src = base64;
      // document.body.appendChild(image);
    }
  };

  const registerAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/", {
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        image: savedImage,
      });
      setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        setShow(true);
        navigate("/");
      } else {
        console.log("no hay respuesta");
      }
      console.log(response.data);
    } catch (e) {
      console.log(e);
      setWrongRegister(true);
    }
  };

  return (
    <div className="register">
      <div className="mainBackground">
        <div className="container">
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <h2>Registrate</h2>
            <input placeholder="Correo" type="text" ref={emailRef} />
            <br />
            <input
              placeholder="Nombre de usuario"
              type="text"
              ref={usernameRef}
            />
            <br />
            <input placeholder="contrasena" type="text" ref={passwordRef} />
            <br />

            <input type="file" onChange={onImageChange} ref={imageRef} />
            <img alt="preview image" src={image} style={{ width: 200 }} />

            {wrongRegister ? (
              <p className="errorText">Error: Usuario ya existente!</p>
            ) : (
              <p></p>
            )}
            {faltanDatos && <p className="errorText">Falta llenar campos!</p>}
            <button onClick={funci} type="submit">
              Registrar
            </button>
          </form>
          {/* <p>Submit Value: <b>{userName}</b> <b>{password}</b> <b>{email}</b></p> */}
          <Link id="registerLink" to="/login">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>
      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          delay={3000}
          bg="danger"
          autohide
        >
          <Toast.Header style={{ backgroundColor: "red" }}>
            <img
              src="holder.js/10x10?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error!</strong>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "red" }}>
            Registro fallado!
          </Toast.Body>
        </Toast>
      </ToastContainer>

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
    </div>
  );
}
export default Register;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
