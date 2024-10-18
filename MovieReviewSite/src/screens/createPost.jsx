import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import "../ScreensStyle/createPost.css";

import axios from "axios";
import mongoose from "mongoose";

function CreatePost(loginSession, onLogin) {
  const [login, setLogin] = useState();
  const [image, setImage] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  const titleRef = useRef();
  const bodyRef = useRef();
  const imageRef = useRef();

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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitting");
    if (titleRef.current.value == "" || bodyRef.current.value == "") {
      // setFaltanDatos(true);
      // setWrongRegister(false);
    } else {
      //setFaltanDatos(false);
      createPostAPI();
    }
  };

  const createPostAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/posts/", {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        // "user_id":new mongoose.Types.ObjectId(1),
        user_id: new mongoose.Types.ObjectId(login._id),
        movie_id: new mongoose.Types.ObjectId(1),
        status: "Posted",
        created_at: new Date(),
      });
      // setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        console.log(response.data._id);
        if (imageRef.current?.value) {
          console.log("Hay archivos");
          uploadImageAPI(response.data._id);
        }
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

  const uploadImageAPI = async (id) => {
    try {
      const response = await axios.post("http://localhost:8080/api/image/", {
        // "image":imageRef.current.value,
        // "image":new Buffer( imageRef.current.files[0].toString()),
        // "image":new Buffer( imageRef.current.files[0]),
        image: savedImage,
        post_id: new mongoose.Types.ObjectId(id),
      });
      // setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        console.log(response.data._id);

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

  const loadImagesAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/image", {});
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      console.log(response.data[0].image);
      setImage(response.data[1].image);
    } else {
      setWrongLogin(true);
    }
  };

  useEffect(() => {
    loadImagesAPI();
    // console.log(loginSession);
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      console.log(items);
      setLogin(items);
      console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
    }
  }, []);

  return (
    <div className="createPost">
      <TopBar></TopBar>
      <Container className="container">
        <Row xs={12}>
          <Col xs={4}>
            <h2>Topic: MOVIE NAME</h2>
          </Col>
          <Row xs={12} className="d-flex flex-row">
            <Col xs={2} className="mb-3">
              <div>
                <img
                  className="mb-2"
                  style={{ width: 100, height: 150 }}
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
                  alt="No"
                ></img>
                <div>
                  <h4>Title</h4>
                </div>
              </div>
            </Col>
            <Col xs={10}>
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <FloatingLabel controlId="floatingTextarea2" label="Title">
                  <Form.Control
                    placeholder="Leave a comment here"
                    ref={titleRef}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Say what you think..."
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    ref={bodyRef}
                  />
                </FloatingLabel>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  {/* <Form.Control type="file" multiple onChange={onImageChange}/> */}
                  <Form.Control
                    type="file"
                    onChange={onImageChange}
                    ref={imageRef}
                  />
                  <Col xs={{ span: 2 }}>
                    <Form.Label>Image previews</Form.Label>{" "}
                  </Col>
                </Form.Group>
                <Col xs={{ span: 1, offset: 11 }}>
                  <button type="submit" className="ms-auto">
                    Post
                  </button>
                </Col>
              </form>
              <img alt="preview image" src={image} />
            </Col>
          </Row>
        </Row>
      </Container>
      <BottomBar />
    </div>
  );
}
export default CreatePost;

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
