import { React, useState, useRef, useEffect } from "react";
import "../componentStyle/comment.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import mongoose from "mongoose";

function Comment({ comment }) {

  const [comments, setComments] = useState([]);

  const loadCommentAPI = async () => {
    console.log(comment);
    const response = await axios.post("http://localhost:8080/api/comments/get", {
      id: new mongoose.Types.ObjectId(comment._id),
    });
    console.log(response.data);
    if (response.data) {
      console.log("comentario encontrado!");
      // console.log(response.data[0].image);
      console.log(response.data);
      setComments(response.data);
    } else {
      //setWrongLogin(true);
    }
  };

  useEffect(() => {
    loadCommentAPI();
  }, []);

  return (
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
      {comments.user_id && (comments.user_id.username)} {!comments.user_id && ("Username")} 
        </Row>
      <Row>
        {comment.body}
        </Row>
      </Col>
    </Row>
  );
}
export default Comment;
