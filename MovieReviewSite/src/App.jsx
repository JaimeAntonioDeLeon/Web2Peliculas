import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./component/register";
import Login from "./component/login";
import MainScreen from "./component/mainScreen";
import MovieListScreen from "./screens/movieListScreen";
import MoviePage from "./screens/moviePage";
import MoviePostScreen from "./screens/moviePostScreen";
import ProfileScreen from "./screens/profileScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import ListScreen from "./screens/ListsScreen";
import MovieReleasesScreen from "./screens/movieReleasesScreen";
import RecentPostsScreen from "./screens/recentPostsScreen";
import CreatePost from "./screens/createPost";
import UpdatePost from "./screens/updatePost";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const [login, setLogin] = useState();
  const [currentMovie, setCurrentMovie] = useState();

  useEffect(() => {
    //localStorage.setItem('login', JSON.stringify(login));
  }, [login]);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      const items = JSON.parse(localStorage.getItem("login"));
      console.log(items);
      setLogin(items);
    }
  }, []);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users"); //ya no regresa objetos! Deberia cambiar server o esto
    //setArray(response.data.fruits);
    //setArray(response.data);
    console.log(response.data);
    const responsePost = await axios.get("http://localhost:8080/api/posts"); //ya no regresa objetos! Deberia cambiar server o esto
    console.log(responsePost.data);
  };

  function handleLogout() {
    console.log("Session terminada");
    setLogin(undefined);
    localStorage.clear();
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Router>
        <div>
          {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/login"
              element={<Login loginSession={login} onLogin={setLogin} />}
            ></Route>
            <Route
              path="/"
              element={
                login ? (
                  <MainScreen
                    loginSession={login}
                    onLogin={setLogin}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            ></Route>
            {/* <Route
              path="/"
              element={
                <MainScreen
                  loginSession={login}
                  setLogin={setLogin}
                  handleLogout={handleLogout}
                />
              }
            ></Route> */}
            <Route
              path="/movieList"
              element={
                login ? (
                  <MovieListScreen handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/moviePage"
              element={
                login ? (
                  <MoviePage handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/moviePost"
              element={
                login ? (
                  <MoviePostScreen handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                login ? (
                  <ProfileScreen handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/recentLists"
              element={
                login ? (
                  <ListScreen handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/movieReleases"
              element={
                login ? (
                  <MovieReleasesScreen handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/recentPosts"
              element={
                login ? (
                  <RecentPostsScreen handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/createPost"
              element={
                login ? (
                  <CreatePost
                    loginSession={login}
                    onLogin={setLogin}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/updatePost"
              element={
                login ? (
                  <UpdatePost handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
