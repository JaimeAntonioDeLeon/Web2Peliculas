import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import ListIcon from "../component/listIcon";
import { Row, Col, Container, Toast, ToastContainer } from "react-bootstrap";
import "../ScreensStyle/profileScreen.css";
import axios from "axios";
import mongoose from "mongoose";
function ProfileScreen({ handleLogout }) {
  const [login, setLogin] = useState({});
  const [image, setImage] = useState({});
  const [lists, setLists] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false); //para toast
  const [showError, setShowError] = useState(false); //para toast

  const imageRef = useRef();

  const listsMovieAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/user", {
      id: new mongoose.Types.ObjectId(login._id),
    });
    console.log(response.data);
    if (response.data) {
      console.log("listas encontradas!");
      console.log(response.data);
      setLists(response.data);
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const base64 = await convertToBase64(file);
      // setImage(URL.createObjectURL(event.target.files[0]));
      //setImage(URL.createObjectURL(imageRef.current.files[0]));
      //  console.log(imageRef.current.files[0]);
      setImage(base64);
      console.log(base64);

      //   var image = new Image();
      // image.src = base64;
      // document.body.appendChild(image);
    }
  };

  const uploadImageAPI = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/updateImage",
        {
          id: new mongoose.Types.ObjectId(login._id),
          image: image,
        }
      );
      // setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        setShowSuccess(true);
        console.log("imagen cambiada!");
        console.log(response.data);
        loginAPI();
        //navigate('/');
      } else {
        console.log("No funciona");
      }
      console.log(response.data);
    } catch (e) {
      setShowError(true);
      console.log(e);
      //setWrongRegister(true);
    }
  };

  const loginAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/users/login", {
      username: login.username,
      password: login.password,
    });
    console.log(response.data);
    if (response.data) {
      console.log("actualizado!");
      localStorage.setItem("login", JSON.stringify(response.data));
      setLogin(response.data);
    } else {
      setWrongLogin(true);
    }
  };

  useEffect(() => {
    // console.log(loginSession);
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      console.log(items);
      setLogin(items);
      setImage(items.image);
      console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
      //listsMovieAPI();
    }
    if (login) {
      listsMovieAPI();
    }
  }, []);

  useEffect(() => {
    listsMovieAPI();
  }, [login]);

  return (
    <div className="profileScreen">
      <TopBar handleLogout={handleLogout} />
      <Row>
        <img
          className="ms-auto me-auto profile-picture"
          style={{ width: 200, height: 200 }}
          src={
            login && login.image && image
              ? image
              : "https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
          }
          alt="No"
        ></img>
      </Row>
      <Row>
        <Col xs={{ offset: 5, span: 2 }}>
          <div className="d-flex justify-content-center">
            <input type="file" onChange={onImageChange} ref={imageRef}></input>
          </div>
        </Col>
        <Col>
          <button
            onClick={() => {
              uploadImageAPI();
            }}
          >
            Save
          </button>
        </Col>
      </Row>
      <Container className="container">
        <Row xs={12}></Row>
        <Row>
          <Col className="mt-3" xs={{ offset: 1, span: 10 }}>
            <h2 className="mb-3 text-center">
              {"Username: " + login.username ?? "NOMBRE"}
            </h2>
            <h3 className="mb-3">
              {"Email adress: " + login.email ?? "EMAIL"}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col xs={{ offset: 1, span: 10 }} className="separator mb-1"></Col>
        </Row>
        <Row className="d-flex flex-row pb-4">
          <Col xs={{ offset: 1, span: 11 }}>
            <h2 className="mb-4 text-start">Movie Lists</h2>
          </Col>
        </Row>
        <Row className="d-flex flex-row">
          {/* <Col xs={{ offset: 1, span: 3 }} className="mb-3">
            <ListIcon list={{}}/>
          </Col>
          <Col xs={{ offset: 1, span: 3 }} className="mb-3">
            <ListIcon list={{}}/>
          </Col>
          <Col xs={{ offset: 1, span: 3 }} className="mb-3">
            <ListIcon list={{}}/>
          </Col>
          <Col xs={{ offset: 1, span: 3 }} className="mb-3">
            <ListIcon list={{}} />
          </Col> */}
          {lists.map((list) => {
            console.log(list);
            return (
              <Col xs={{ span: 3, offset: 1 }} className="mb-3">
                <ListIcon list={list} />
              </Col>
            );
          })}
        </Row>
      </Container>
      <BottomBar />
      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowSuccess(false)}
          bg="success"
          show={showSuccess}
          delay={3000}
          autohide
        >
          <Toast.Header style={{ backgroundColor: "green" }}>
            <img
              src="holder.js/10x10?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Hecho!</strong>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "green" }}>
            Imagen cambiada!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          delay={3000}
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
            Error al modificar la imagen!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
export default ProfileScreen;

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
