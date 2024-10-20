import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import ListIcon from "../component/listIcon";
import { Row, Col, Container } from "react-bootstrap";
import "../ScreensStyle/profileScreen.css";
import axios from "axios";
import mongoose from "mongoose";
function ProfileScreen({handleLogout}) {

  const [login, setLogin] = useState({});
  const [lists, setLists] = useState([]);

  const listsMovieAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/user", {
      id: new mongoose.Types.ObjectId(login._id),
    });
    console.log(response.data);
    if (response.data) {
      console.log("listas encontradas!");
      console.log(response.data);
      setLists(response.data)
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  useEffect(() => {
    // console.log(loginSession);
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      console.log(items);
      setLogin(items);
      console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
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
          src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
          alt="No"
        ></img>
      </Row>
      <Container className="container">
        <Row xs={12}></Row>
        <Row>
          <Col className="mt-3" xs={{ offset: 1, span: 10 }}>
            <h2 className="mb-3 text-center">{"Username: " + login.username??"NOMBRE"}</h2>
            <h3 className="mb-3">{"Registration date: " + "FECHA"}</h3>
            <h3 className="mb-3">{"Email adress: " + login.email??"EMAIL"}</h3>
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
          <Col xs={{ offset: 1, span: 3 }} className="mb-3">
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
          </Col>
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
    </div>
  );
}
export default ProfileScreen;
