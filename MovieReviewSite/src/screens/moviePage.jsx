import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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

function MoviePage({handleLogout}) {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("movie"));
  const movieKey = searchParams.get("movie");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Using LOCATION");
  console.log(location);
  
  // const movieKey = location.get('movie');
  // console.log(movieKey);

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();
  const [lists, setLists] = useState([]);
  const [posts, setPosts] = useState([]);

  const [login, setLogin] = useState({});
  const [userLists, setUserLists] = useState([]);

  const [show, setShow] = useState(false);


  const listNameRef = useRef();


  const loadMoviesAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/movie/post", {
      _id: new mongoose.Types.ObjectId(movieKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("pelicula encontrada!");
      // console.log(response.data);
      setMovies(response.data);
      setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const listsMovieAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/movie", {
      movie_id: new mongoose.Types.ObjectId(movieKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("listas encontradas!");
      // console.log(response.data);
      setLists(response.data)
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const listsUserAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/user", {
      id: new mongoose.Types.ObjectId(login._id),
    });
    console.log(response.data);
    if (response.data) {
      console.log("listas encontradas!");
      // console.log(response.data);
      setUserLists(response.data)
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  const createListAPI = async () => {
    try {
      console.log("Creando lista!")
      const response = await axios.post("http://localhost:8080/api/list/", {
        title: listNameRef.current.value,
        movies: [new mongoose.Types.ObjectId(movieKey)],
        user_id: new mongoose.Types.ObjectId(login._id),
        created_at: new Date(),
      });
      // setWrongRegister(false);

      //setArray(response.data.fruits);
      //setArray(response.data);
      if (response.data) {
        console.log(response.data._id);
        //navigate('/');
      } else {
        console.log("Ha fallado");
      }
      console.log(response.data);
    } catch (e) {
      console.log(e);
      //setWrongRegister(true);
    }
  };

  const postsMovieAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/posts/movie", {
      movie_id: new mongoose.Types.ObjectId(movieKey),
    });
    console.log(response.data);
    if (response.data) {
      console.log("posts encontrados!");
      // console.log(response.data);
      setPosts(response.data)
      // setLoading(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadMoviesAPI();
    listsMovieAPI();
    postsMovieAPI();
    // deletePostAPI();
    // updatePostAPI();
    //loadMovieSearchAPI();
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      setLogin(items);
      //console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
    }
  }, []);

  useEffect(() => {
    listsUserAPI();
  }, [login]);
  

  return (
    <div className="moviePage">
      <TopBar handleLogout={handleLogout} />
      {!loading && (
      <Container className="container  pt-4">
        <Row xs={12}>
          <Col xs={{ span: 4, offset: 1 }} className="mb-3">
            {/* <MovieIcon movie={movies} /> */}
            <div className="movieIcon">
              <img
                className="mb-2 posterMovie"
                src={
                  movies.poster??"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
                }
                alt="No"
              ></img>
              <div>
                <h4>{movies.title??"TITULO"}</h4>
              </div>
            </div>
          </Col>
          <Col xs={6} className="mb-3">
            <div className="trailer">
              <h4 className="trailerText">Trailer</h4>
              <iframe
                width="560"
                height="315"
                src={movies.trailer??"https://www.youtube.com/embed/D_O2zAbZYeg?si=mXHE3N41U-GKuB2Q"}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <div className="mb-5">
                <h4>{"Release date: " + movies.released_at.slice(0,10)}</h4>
              </div>
              <h4>Movie Synopsis</h4>
              <p>{movies.synopsis?? "No hay synopis"}</p>
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
          <Col xs={{offset: 5, span:2}}><button className="ms-auto" onClick={()=>{handleShow()}}>Add to list</button></Col>
          <Col xs={{ span: 2, offset: 1 }} className="mb-3">
            <ListIcon list={{}} />
            {/* <div>
                <img className='mb-2' style={{width:100, height: 150}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images" alt="No"></img>
                <div><h4>Title</h4></div>
                </div> */}
          </Col>
          {lists.map((list) => {
            console.log(list);
              return (
                <Col xs={{ span: 2, offset: 1 }} className="mb-3">
                  <ListIcon list={list} />
                </Col>
              );
            })}

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
          <Col xs={{offset: 5, span:2}}><button className="ms-auto" onClick={()=>{navigate(`/createPost?movie=${movieKey}`);}}>Make post</button></Col>
        </Row>
        <Row>
          <Col xs={{ span: 10, offset: 1 }}  className="mb-3">
            <MoviePost post={{}} />
          </Col>
        </Row>
        {posts.map((post) => {
            console.log(post);
              return (
                <Row>
                  <Col xs={{ span: 10, offset: 1 }} className="mb-3">
                    <MoviePost post={post} />
                  </Col>
                </Row>
              );
            })}
      </Container>
      )}
      <BottomBar />

      <Modal show={show} onHide={handleClose}size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Menu de lista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
              <Row>
                <Col>
                <h3>Crear Lista</h3>
                <p className="mb-3">La lista se creara con la pelicula agregada automaticamente!</p>
                <Row>
                <input type="text" className="mb-4 w-75" ref={listNameRef}/>
                </Row>
                <Row className="">
                <button className="w-50" onClick={()=>{if(listNameRef.current.value != "")createListAPI()}}> Guardar </button>
                </Row>
                </Col>
                <Col>
                <h3>Agregar a lista existente</h3>
                <p>Selecciona la lista a la que deseas agregar la pelicula y oprime agregar!</p>
                <Form.Select aria-label="Default select example" className="mb-4 listSelect" >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  {userLists.map((list) => {
                    console.log("lista de usuario: " + list.title);
                    return (
                        <option value={list._id} >{list.title}</option>
                    );
                  })}   
                </Form.Select>
                <Row>
                <Button variant="primary" onClick={handleClose}className="w-50 listSelect" disabled={userLists.length <= 0}>
                  Guardar
                </Button>
                </Row>
                </Col>
              </Row>
            </Container> 
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MoviePage;
