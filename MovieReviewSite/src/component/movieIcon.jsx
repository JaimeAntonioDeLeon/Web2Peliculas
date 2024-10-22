import { React, useState, useRef, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../componentStyle/movieIcon.css";
function MovieIcon({ movie, eliminationMode = false }) {
  useEffect(() => {
    console.log(movie.title);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="movieIcon">
      <img
        className="mb-2"
        style={{ width: 100, height: 150 }}
        onClick={() => {
          if (!eliminationMode) navigate(`/moviePage?movie=${movie._id}`);
        }}
        src={
          movie.poster ??
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
        }
        alt="No"
      ></img>
      <div>
        <h4>{movie.title ?? "Sin titulo"}</h4>
      </div>
    </div>
  );
}
export default MovieIcon;
