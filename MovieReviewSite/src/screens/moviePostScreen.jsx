import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import "../ScreensStyle/moviePostScreen.css";
import axios from "axios";
import mongoose from "mongoose";
import Comment from "../component/comment";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function MoviePostScreen({handleLogout}) {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("movie"));
  const postKey = searchParams.get("post");
  console.log("This post is: " + postKey);

  const bodyRef = useRef();
  const [login, setLogin] = useState();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

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

  const loadPostAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/posts/post", {
      id: new mongoose.Types.ObjectId(postKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("post encontrado!");
      // console.log(response.data);
      setPost(response.data);
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const createCommentAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/comments/", {
        body: bodyRef.current.value,
        user_id: new mongoose.Types.ObjectId(login._id),
        post_id: new mongoose.Types.ObjectId(postKey),
        created_at: new Date(),
      });
      // setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        //navigate('/');
      } else {
        console.log("no funciono");
      }
      console.log(response.data);
      loadCommentAPI();
    } catch (e) {
      console.log(e);
      //setWrongRegister(true);
    }
  };

  const loadCommentAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/comments/post", {
      id: new mongoose.Types.ObjectId(postKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      // console.log(response.data[0].image);
      console.log(response.data);
      setComments(response.data);
    } else {
      //setWrongLogin(true);
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
    loadPostAPI();
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
      <TopBar handleLogout={handleLogout} />
      <Container className="container mb-3 pb-4">
        <Row>
          <Col xs={{offset:1, span:10}} className="mainPost mt-4 mb-4 pt-3">
          <Row>
            <Col xs={2}>
              <img
              className="userImage"
                style={{ width: 100, lenght: 100 }}
                src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
              ></img>
              <h5>{post.user_id && post.user_id.username}{!post.user_id && "USER"}</h5>
            </Col>
            <Col xs={10} className="text-start">
              <Row className="mb-4">
                <h2>{post.title??"Post Title"}</h2>
              </Row>
              <Row className="mb-4">
                <h4>Movie Subject</h4>
              </Row>
              <Row>
                <p> {post.body ?? "Post description"} </p>
              </Row>
            </Col>
            </Row>
          </Col>
          </Row>
          <Row>
          <h4>Images</h4>
          </Row>
        
      </Container>

      <Container className="container pb-3">
        <form onSubmit={submitHandler}>
          <Row className="mb-4">
            <h4 className="text-start ms-5 mt-4">Comments</h4>
          </Row>
          <Row className="m-3">
            <h5 className="text-start">Write a comment:</h5>
            <Form.Control
              placeholder="Leave a comment here"
              style={{ backgroundColor: "black", color:"white"}}
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
        <Comment comment={{body: "This is my comment"}} />
        <Comment comment={{body: "This is my comment"}} />
        {comments.map((comment) => {
            console.log(post);
              return (
                    <Comment comment={comment} />
              );
            })}
      </Container>
      <BottomBar />
    </div>
  );
}
export default MoviePostScreen;
