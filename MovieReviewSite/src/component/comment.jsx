import { React, useState, useRef, useEffect } from "react";
import "../componentStyle/comment.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import mongoose from "mongoose";

function Comment({ comment }) {
  const [exists, setExists] = useState(true);
  const [comments, setComments] = useState([]);
  const [login, setLogin] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [commentBody, setCommentBody] = useState();

  const loadCommentAPI = async () => {
    console.log(comment);
    const response = await axios.post(
      "http://localhost:8080/api/comments/get",
      {
        id: new mongoose.Types.ObjectId(comment._id),
      }
    );
    console.log(response.data);
    if (response.data) {
      console.log("comentario encontrado!");
      // console.log(response.data[0].image);
      console.log(response.data);
      setComments(response.data);
      setCommentBody(response.data.body);
    } else {
      //setWrongLogin(true);
    }
  };

  function onChange(event) {
    setCommentBody(event.target.value);
  }

  const updateCommentAPI = async () => {
    try {
      console.log("updating comment "  + commentBody)
      const response = await axios.post(
        "http://localhost:8080/api/comments/update",
        {
          id: comment._id,
          body: commentBody,
        }
      );
      if (response.data) {
        //navigate('/');
      } else {
        console.log("no funciono");
      }
      console.log(response.data);
      console.log("commment update!");
      loadCommentAPI();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCommentAPI = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/comments/delete",
      {
        _id: comment._id,
      }
    );
    console.log(response.data);
    if (response.data) {
      console.log("comentario eliminado!");
      console.log(response.data);
      setExists(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const eliminate = () => {
    console.log("Eliminando");
    if (commentBody == "") {
      // setFaltanDatos(true);
      // setWrongRegister(false);
    } else {
      //setFaltanDatos(false);
      deleteCommentAPI();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitting");
    if (commentBody == "") {
      // setFaltanDatos(true);
      // setWrongRegister(false);
    } else {
      //setFaltanDatos(false);
      updateCommentAPI();
      setUpdateMode(false);
    }
  };

  useEffect(() => {
    loadCommentAPI();
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      console.log(items);
      setLogin(items);
      console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
    }
  }, []);

  return ( 
  <>
    {exists && (
    <Row xs={10} className="comment ms-3 me-3 mb-3 pb-3 pt-3">
      <Col xs={{ span: 1 }}>
        <img
          style={{ width: 100, lenght: 100 }}
          src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
          alt="user"
        />
      </Col>
      <Col xs={8} className="ms-5">
        <Row>
          {comments.user_id && comments.user_id.username}{" "}
          {!comments.user_id && "Username"}
        </Row>
        {!updateMode && <Row>{comments.body}</Row>}
        {updateMode && (
          <Row>
            <form onSubmit={submitHandler}>
              <input type="text" value={commentBody} onChange={onChange} />
              <button type="submit">Save</button>
            </form>
          </Row>
        )}
      </Col>
      {login._id == comment.user_id && (
        <Col xs={3}>
          {!updateMode && (
            <button
              onClick={() => {
                setUpdateMode(true);
              }}
            >
              update
            </button>
          )}
          {updateMode && (
            <button
              onClick={() => {
                setUpdateMode(false);
              }}
            >
              Nevermind
            </button>
          )}
          <button
            onClick={() => {
              eliminate();
            }}
          >
            delete
          </button>
        </Col>
      )}
    </Row>
    )}
    </>
  );
}
export default Comment;
