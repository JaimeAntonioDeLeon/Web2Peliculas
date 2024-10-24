import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container, Toast, ToastContainer } from "react-bootstrap";
import "../ScreensStyle/movieListScreen.css";
import MovieIcon from "../component/movieIcon";
import mongoose from "mongoose";
import axios from "axios";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
function MovieListScreen({ handleLogout }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("movie"));
  const listKey = searchParams.get("list");

  const [list, setList] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);

  const [show, setShow] = useState(false); //para toast
  const [showError, setShowError] = useState(false); //para toast

  const loadListAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/get", {
      id: new mongoose.Types.ObjectId(listKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("lista encontrada!");
      console.log(response.data);
      setList(response.data);
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const RemoveMovieFromListAPI = async (movieId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/list/removeMovie",
        {
          id: new mongoose.Types.ObjectId(listKey),
          movie: new mongoose.Types.ObjectId(movieId),
        }
      );
      console.log(response.data);
      if (response.data) {
        console.log("Pelicula removida!!");
        console.log(response.data);
        loadListAPI();
        setShow(true);
        // setList(response.data);
        // setLoading(false);
        // console.log(response.data[0].image);
        // setImage(response.data[1].image);
      } else {
      }
    } catch (e) {
      setShowError(true);
      console.log(e);
    }
  };
  const handleOptionChange = (changeEvent) => {
    if (changeEvent.target.value == "true") setDeleteMode(true);
    else setDeleteMode(false);
  };

  useEffect(() => {
    loadListAPI();
  }, []);

  return (
    <div className="movieListScreen">
      <TopBar handleLogout={handleLogout} />
      <Container className="container">
        <Row xs={12}>
          <Col xs={8} className="text-start mb-5">
            <h2 className="listTitle">{list.title ?? "LIST TITLE"}</h2>
            <h4 className="listUser">
              {list.user_id &&
                (list.user_id
                  ? "by " + list.user_id.username
                  : "USERNAME")}{" "}
              {!list.user_id && "by " + "USERNAME"}
            </h4>
          </Col>
          {
            <Col xs={4}>
              <span>{"Mode: "}</span>
              <input
                type="radio"
                name="listMode"
                id="radioView"
                value={false}
                checked={!deleteMode}
                onChange={handleOptionChange}
              />
              <label for="radioView" className="me-2">
                View
              </label>
              <input
                type="radio"
                name="listMode"
                id="radioDelete"
                value={true}
                checked={deleteMode}
                onChange={handleOptionChange}
              />
              <label for="radioDelete">Delete</label>
            </Col>
          }
          <Row xs={12} className="d-flex flex-row">
            <Col xs={3} className="mb-3">
              <MovieIcon movie={{}} />
              {/* <div>
                <img
                  className="mb-2"
                  style={{ width: 100, height: 150 }}
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
                  alt="No"
                ></img>
                <div>
                  <h4>Title</h4>
                </div>
              </div> */}
            </Col>
            <Col xs={3} className="mb-3">
              <MovieIcon movie={{}} />
            </Col>
            <Col xs={3} className="mb-3">
              <MovieIcon movie={{}} />
            </Col>
            <Col xs={3} className="mb-3">
              <MovieIcon movie={{}} />
            </Col>
            <Col xs={3} className="mb-3">
              <MovieIcon movie={{}} />
            </Col>
            {list.movies &&
              list.movies.map((movie) => {
                return (
                  <Col
                    xs={3}
                    className="mb-3"
                    onClick={() => {
                      if (deleteMode) RemoveMovieFromListAPI(movie._id);
                    }}
                  >
                    <MovieIcon movie={movie} eliminationMode={deleteMode} />
                  </Col>
                );
              })}
          </Row>
        </Row>
      </Container>
      <BottomBar />
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
            Error: la lista no se pudo eliminar!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShow(false)}
          bg="success"
          show={show}
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
            Pelicula removida!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
export default MovieListScreen;
