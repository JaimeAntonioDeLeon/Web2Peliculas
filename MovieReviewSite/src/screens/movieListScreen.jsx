import React from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container } from "react-bootstrap";
import "../ScreensStyle/movieListScreen.css";
import MovieIcon from "../component/movieIcon";
function MovieListScreen() {
  return (
    <div className="movieListScreen">
      <TopBar></TopBar>
      <Container className="container">
        <Row xs={12}>
          <Col xs={12} className="text-start mb-5">
            <h2 className="listTitle">{"LIST TITLE"}</h2>
            <h4 className="listUser">{"by " + "USERNAME"}</h4>
          </Col>
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
          </Row>
        </Row>
      </Container>
      <BottomBar />
    </div>
  );
}
export default MovieListScreen;
