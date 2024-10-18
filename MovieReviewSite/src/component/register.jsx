import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../componentStyle/register.css";

import { Navigate, useNavigate, Link } from "react-router-dom";

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

  const [wrongRegister, setWrongRegister] = useState(false);
  const [faltanDatos, setFaltanDatos] = useState(false);

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

  const registerAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/", {
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
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
          <form onSubmit={submitHandler}>
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
            {" "}
            Ya tienes cuenta?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
