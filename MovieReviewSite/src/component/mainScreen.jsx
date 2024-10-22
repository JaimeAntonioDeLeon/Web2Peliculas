import MoviePost from "./moviePost.jsx";
import { useState, useEffect, useRef } from "react";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import mongoose from "mongoose";
import axios from "axios";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MovieIcon from "./movieIcon.jsx";
import TopBar from "./topBar.jsx";
import "../ScreensStyle/mainScreen.css";
import BottomBar from "./bottomBar.jsx";

function MainScreen({ loginSession, setLogin, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [posts, setPosts] = useState([]);
  const searchRef = useRef();

  const loadMovieSearchAPI = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/movie/search",
      {
        title: searchRef.current.value,
      }
    );
    console.log(response.data);
    if (response.data) {
      console.log("encontrado peliculas!");
      // console.log(response.data[0].image);
      console.log(response.data);
      setMovies(response.data);
    } else {
      setWrongLogin(true);
    }
  };

  const postSearchAPI = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/posts/search",
      {
        title: searchRef.current.value,
      }
    );
    console.log(response.data);
    if (response.data) {
      console.log("encontrado posts!");
      // console.log(response.data[0].image);
      console.log(response.data);
      setPosts(response.data);
    } else {
      setWrongLogin(true);
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("login"));
    if (localStorage.getItem("login")) {
      console.log("logged in!");
    } else {
      //navigate('/');
    }
    postSearchAPI();
    // const items = JSON.parse(localStorage.getItem('login'));
    // if (items) {
    //  setLogin(items);
    // }
  }, []);

  //   const handleLogout = () => {

  //   }

  return (
    <Row xs={12} className="d-flex flex-row mainScreen">
      {/* <h3>Movie Universe</h3> */}
      <TopBar handleLogout={handleLogout} />
      <Container className="container">
        {/* <div>
        <h3>Movie Universe</h3>
        <div>
          <button>Main Page</button>
          <button>Movies</button>
          <button>Lists</button>
          <button>Profile</button>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div> */}
        {/* <div>
          <h3>Movies</h3>
          <input ref={searchRef}></input>
          <button
            onClick={() => {
              loadMovieSearchAPI();
            }}
          >
            Buscar
          </button>
          <Row>
            {movies.map((movie) => {
              return (
                <Row>
                  <MovieIcon movie={movie} />
                </Row>
              );
            })}
          </Row>
        </div> */}

        <div>
          <h3>Recent Posts</h3>
          <input ref={searchRef}></input>
          <button
            onClick={() => {
              postSearchAPI();
            }}
          >
            Buscar
          </button>
          <Row>
            {posts.map((post) => {
              return (
                <Row>
                  <MoviePost post={post} />
                </Row>
              );
            })}
          </Row>
          <MoviePost post={{}} />
          <MoviePost post={{}} />
          <MoviePost post={{}} />
          <div>
            You're gay
            <br />
            All rights reserved
          </div>
        </div>
      </Container>
      <BottomBar />
    </Row>
  );
}
export default MainScreen;
