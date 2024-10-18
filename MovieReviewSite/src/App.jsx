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
            {/* <Route path="/" element ={login? <MainScreen loginSession = {login} onLogin = {setLogin}/>:<Navigate to="/login"/>}>
          </Route> */}
            <Route
              path="/"
              element={
                <MainScreen
                  loginSession={login}
                  setLogin={setLogin}
                  handleLogout={handleLogout}
                />
              }
            ></Route>
            <Route path="/movieList" element={<MovieListScreen />} />
            <Route path="/moviePage" element={<MoviePage />} />
            <Route path="/moviePost" element={<MoviePostScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/recentLists" element={<ListScreen />} />
            <Route path="/movieReleases" element={<MovieReleasesScreen />} />
            <Route path="/recentPosts" element={<RecentPostsScreen />} />
            <Route
              path="/createPost"
              element={<CreatePost loginSession={login} onLogin={setLogin} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
