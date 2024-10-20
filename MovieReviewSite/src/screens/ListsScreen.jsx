import { React, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import TopBar from "../component/topBar";
import BottomBar from "../component/bottomBar";
import { Row, Col, Container } from "react-bootstrap";
import ListIcon from "../component/listIcon";
import "../ScreensStyle/listsScreen.css";

import axios from "axios";
import mongoose from "mongoose";

function ListScreen({handleLogout}) {

  const SearchBarRef = useRef();
  const [lists, setLists] = useState([]);

  const searchListsAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/search", {
      title: SearchBarRef.current.value,
    });
    console.log(response.data);
    if (response.data) {
      console.log("Listas encontradas!");
      console.log(response.data);
      setLists(response.data);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  useEffect(() => {
    searchListsAPI();
  }, []);

  return (
    <div className="listScreen">
      <TopBar handleLogout={handleLogout} />
      <Container className="container">
        <Row xs={12} className="pt-4">
        <Col xs={{offset:1, span:6}}>
            {/* <input ref={searchRef}></input> */}
            <input ref={SearchBarRef}></input>
          <button
            onClick={() => {
              searchListsAPI();
            }}
          >
            Buscar
          </button>
          </Col>
          <Col xs={12} className="mb-4">
            <h2>Recent Lists</h2>
          </Col>
          <Row xs={12} className="d-flex flex-row">
            <Col xs={{ span: 2, offset: 1 }} className="mb-3">
              <ListIcon list={{}}/>
            </Col>
            <Col xs={{ span: 2, offset: 1 }} className="mb-3">
              <ListIcon list={{}}/>
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
        </Row>
      </Container>
      <BottomBar />
    </div>
  );
}
export default ListScreen;
