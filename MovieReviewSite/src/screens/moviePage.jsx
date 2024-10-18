import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container } from "react-bootstrap";
import "../ScreensStyle/moviePage.css";
import MoviePost from "../component/moviePost";
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
import ListIcon from "../component/listIcon";

function MoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("movie"));
  const movieKey = searchParams.get("movie");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  // const movieKey = location.get('movie');
  // console.log(movieKey);

  const [movies, setMovies] = useState([]);

  const loadMoviesAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/movie/post", {
      _id: new mongoose.Types.ObjectId(movieKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("pelicula encontrada!");
      console.log(response.data);
      setMovies(response.data);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  //   const deletePostAPI = async() =>{
  //     const response = await axios.post("http://localhost:8080/api/posts/delete",{
  //         "_id": new mongoose.Types.ObjectId("670b4a12b684cd1a3ba70092")

  //     })
  //     console.log(response.data);
  //     if(response.data){
  //         console.log("post eliminado!");
  //          console.log(response.data);
  //         // console.log(response.data[0].image);
  //         // setImage(response.data[1].image);
  //     }
  //     else{

  //     }

  //   }

  //       const updatePostAPI = async() =>{
  //     const response = await axios.post("http://localhost:8080/api/posts/update",{
  //         "id": new mongoose.Types.ObjectId("670b32a0b684cd1a3ba7004c"),
  //         "title":"Bito",
  //         "body":"Ninconpoop",
  //         "user_id": new mongoose.Types.ObjectId("00000001378a794de18120e5"),
  //         "movie_id": new mongoose.Types.ObjectId("00000001378a794de18120e6"),
  //         "created_at": "2024-10-13T02:38:24.498+00:00"
  //     })
  //     console.log(response.data);
  //     if(response.data){
  //         console.log("post actualizado!");
  //          console.log(response.data);
  //         // console.log(response.data[0].image);
  //         // setImage(response.data[1].image);
  //     }
  //     else{

  //     }

  //   }

  // const loadMovieSearchAPI = async() =>{

  //     const response = await axios.post("http://localhost:8080/api/movie/search",{
  //         "title":"The"
  //     })
  //     console.log(response.data);
  //     if(response.data){
  //         console.log("encontrado peliculas!");
  //         // console.log(response.data[0].image);
  //         console.log(response.data);
  //     }
  //     else{
  //       setWrongLogin(true);
  //     }

  //   }

  useEffect(() => {
    loadMoviesAPI();
    // deletePostAPI();
    // updatePostAPI();
    //loadMovieSearchAPI();
  }, []);

  return (
    <div className="moviePage">
      <TopBar></TopBar>
      <Container className="container  pt-4">
        <Row xs={12}>
          <Col xs={{ span: 4, offset: 1 }} className="mb-3">
            {/* <MovieIcon movie={movies} /> */}
            <div className="movieIcon">
              <img
                className="mb-2 posterMovie"
                src={
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
                }
                alt="No"
              ></img>
              <div>
                <h4>{"TITULO"}</h4>
              </div>
            </div>
          </Col>
          <Col xs={6} className="mb-3">
            <div className="trailer">
              <h4 className="trailerText">Trailer</h4>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/D_O2zAbZYeg?si=mXHE3N41U-GKuB2Q"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <div className="mb-5">
                <h4>{"Release date: " + "FECHA"}</h4>
              </div>
              <h4>Movie Synopsis</h4>
              <p>Texto</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 10, offset: 1 }}>
            <hr className="separator" />
          </Col>
        </Row>

        <Row xs={12} className="d-flex flex-row">
          <Col xs={{ span: 4, offset: 1 }} className="text-start mb-3">
            <h3>Lists that have this movie</h3>
          </Col>
          <Col xs={{ span: 10, offset: 1 }} className="mb-3">
            <ListIcon />
            {/* <div>
                <img className='mb-2' style={{width:100, height: 150}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images" alt="No"></img>
                <div><h4>Title</h4></div>
                </div> */}
          </Col>
        </Row>

        <Row>
          <Col xs={{ span: 10, offset: 1 }}>
            <hr className="separator" />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="text-start" xs={{ span: 4, offset: 1 }}>
            <h3>Posts about this movie</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 10, offset: 1 }}>
            <MoviePost title={"La pelicula mas pelicula que he visto"} />
          </Col>
        </Row>
      </Container>
      <BottomBar />
    </div>
  );
}
export default MoviePage;
