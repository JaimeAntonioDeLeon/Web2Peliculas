import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import ListIcon from "../component/listIcon";
import "../ScreensStyle/movieReleasesScreen.css";
import MovieIcon from "../component/movieIcon";

import axios from "axios";
import mongoose from "mongoose";

function MovieReleasesScreen({handleLogout}) {
  const [movies, setMovies] = useState([]);
  const SearchBarRef = useRef();

  const loadMoviesAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/movie", {});
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      console.log(response.data);
      setMovies(response.data);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const searchMoviesAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/movie/search", {
      title: SearchBarRef.current.value,
    });
    console.log(response.data);
    if (response.data) {
      console.log("encontrado!");
      console.log(response.data);
      setMovies(response.data);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  useEffect(() => {
    loadMoviesAPI();
    // console.log(loginSession);
    // if(localStorage.getItem('login')){
    //   const items = JSON.parse(localStorage.getItem('login'));
    //   console.log(items);
    //    setLogin(items);
    //    console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
    // }
  }, []);

  return (
    <div className="movieReleasesScreen">
      <TopBar handleLogout={handleLogout} />
      <Container className="container">
        <Row xs={12} className="pt-4">
          <Col xs={12} className="mb-4">
          <Row>
            <Col xs={{offset:1, span:6}}>
            {/* <input ref={searchRef}></input> */}
            <input ref={SearchBarRef}></input>
          <button
            onClick={() => {
              searchMoviesAPI();
            }}
          >
            Buscar
          </button>
          </Col>
          </Row>
            <h2 className="text-start">Movie Releases</h2>
          </Col>
          <Row xs={12} className="d-flex flex-row">
            {/* <Col xs={3} className="mb-3">
              <MovieIcon movie={{ title: "Test" }} />
            </Col>
            <Col xs={3} className="mb-3">
              <MovieIcon movie={{ title: "Test" }} />
            </Col> */}
            {movies.map((movie) => {
              return (
                <Col xs={3} className="mb-3">
                  <MovieIcon movie={movie} />
                </Col>
              );
            })}
          </Row>
        </Row>
      </Container>
      <BottomBar />
    </div>
  );
}
export default MovieReleasesScreen;
