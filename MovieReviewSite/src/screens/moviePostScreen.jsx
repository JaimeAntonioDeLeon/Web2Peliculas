import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import "../ScreensStyle/moviePostScreen.css";
import axios from "axios";
import mongoose from "mongoose";
import Comment from "../component/comment";
function MoviePostScreen() {
  const bodyRef = useRef();
  const [login, setLogin] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitting");
    if (bodyRef.current.value == "") {
      // setFaltanDatos(true);
      // setWrongRegister(false);
    } else {
      //setFaltanDatos(false);
      createCommentAPI();
    }
  };

  const createCommentAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/comments/", {
        body: bodyRef.current.value,
        user_id: new mongoose.Types.ObjectId(login._id),
        post_id: new mongoose.Types.ObjectId(1),
        created_at: new Date(),
      });
      // setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        //navigate('/');
      } else {
        console.log("no sexo");
      }
      console.log(response.data);
    } catch (e) {
      console.log(e);
      //setWrongRegister(true);
    }
  };

  const loadCommentAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/comments", {});
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      // console.log(response.data[0].image);
      console.log(response.data);
    } else {
      setWrongLogin(true);
    }
  };

  const deletePostAPI = async () => {
    //TODO, hacer ue el _id capture el id de la cosa a cambiar
    const response = await axios.post(
      "http://localhost:8080/api/posts/delete",
      {
        _id: new mongoose.Types.ObjectId("670b4a12b684cd1a3ba70092"),
      }
    );
    console.log(response.data);
    if (response.data) {
      console.log("post eliminado!");
      console.log(response.data);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const updatePostAPI = async () => {
    //TODO, hacer ue el id capture el id de la cosa a cambiar
    const response = await axios.post(
      "http://localhost:8080/api/posts/update",
      {
        id: new mongoose.Types.ObjectId("670b32a0b684cd1a3ba7004c"),
        title: "Bito",
        body: "Ninconpoop",
        user_id: new mongoose.Types.ObjectId("00000001378a794de18120e5"),
        movie_id: new mongoose.Types.ObjectId("00000001378a794de18120e6"),
        created_at: "2024-10-13T02:38:24.498+00:00",
      }
    );
    console.log(response.data);
    if (response.data) {
      console.log("post actualizado!");
      console.log(response.data);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const loadMovieSearchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/comments", {});
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      // console.log(response.data[0].image);
      console.log(response.data);
    } else {
      setWrongLogin(true);
    }
  };

  useEffect(() => {
    loadCommentAPI();
    // console.log(loginSession);
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      console.log(items);
      setLogin(items);
      console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
    }
  }, []);

  return (
    <div className="moviePostScreen">
      <TopBar></TopBar>
      <Container className="container mb-3">
        <Row xs={12}>
          <Container className="mainPost">
            <Col xs={4}>
              <img
                style={{ width: 100, lenght: 100 }}
                src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
              ></img>
            </Col>
            <Col xs={8}>
              <Row>
                <h2>Post Title</h2>{" "}
              </Row>
              <Row>
                <h4>Movie Subject</h4>{" "}
              </Row>
              <Row>
                <p> Post description </p>
              </Row>
            </Col>
          </Container>
          <h4>Images</h4>
        </Row>
      </Container>

      <Container className="container pb-3">
        <form onSubmit={submitHandler}>
          <Row className="mb-4">
            <h4>Comments</h4>
          </Row>
          <Row className="m-3">
            <h5>Write a comment:</h5>
            <Form.Control
              placeholder="Leave a comment here"
              style={{ backgroundColor: "black" }}
              ref={bodyRef}
            />
          </Row>
          <Row xs={12} className="flex-row d-flex m-3">
            <Col xs={{ span: 1 }} className="ms-auto">
              <button type="submit">Send</button>
            </Col>
          </Row>
        </form>
        {/* <Row>
                        <Col xs={1}>
                            <img style={{width:100, lenght: 100}} src= "https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"></img>
                        </Col>
                        <Col xs={9}>This is my coment</Col>
                    </Row> */}
        <Comment text={"This is my comment"} />
        <Comment text={"This is my comment"} />
      </Container>
      <BottomBar />
    </div>
  );
}
export default MoviePostScreen;
