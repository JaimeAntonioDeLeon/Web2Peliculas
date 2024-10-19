import React from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container } from "react-bootstrap";
import ListIcon from "../component/listIcon";
import "../ScreensStyle/listsScreen.css";
function ListScreen({handleLogout}) {
  return (
    <div className="listScreen">
      <TopBar handleLogout={handleLogout} />
      <Container className="container">
        <Row xs={12} className="pt-4">
        <Col xs={{offset:1, span:6}}>
            {/* <input ref={searchRef}></input> */}
            <input></input>
          <button
            onClick={() => {
              //loadMovieSearchAPI();
            }}
          >
            Buscar
          </button>
          </Col>
          <Col xs={12} className="mb-4">
            <h2>Recent Lists</h2>
          </Col>
          <Row xs={12} className="d-flex flex-row">
            <Col xs={3} className="mb-3">
              <ListIcon />
            </Col>
            <Col xs={3} className="mb-3">
              <ListIcon />
            </Col>
          </Row>
        </Row>
      </Container>
      <BottomBar />
    </div>
  );
}
export default ListScreen;
