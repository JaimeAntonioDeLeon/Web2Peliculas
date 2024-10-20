import { React, useState, useRef, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../componentStyle/listIcon.css";
import { useNavigate } from "react-router-dom";
import mongoose from "mongoose";
import axios from "axios";


function ListIcon({list}) {
  console.log("Lista:");
  console.log(list);
  const navigate = useNavigate();


  const [lists, setLists] = useState({});

  const loadListAPI = async () => {
    const response = await axios.post("http://localhost:8080/api/list/get", {
      id: new mongoose.Types.ObjectId(list._id),
    });
    console.log(response.data);
    if (response.data) {
      console.log("lista encontrada!");
      console.log(response.data);
      setLists(response.data);
      // setLoading(false);
      // console.log(response.data[0].image);
      // setImage(response.data[1].image);
    } else {
    }
  };

  useEffect(() => {
    loadListAPI();
  }, []);

  return (
    <div className="listIcon  mb-2">
      <div
        className="iconContainer d-flex flex-row "
        align="center"
        onClick={() => {
          navigate(`/movieList?list=${list._id}`);
        }}
      >
        {lists.movies && lists.movies.length > 0 && lists.movies[0].poster && <img
          className="image1"
          style={{ width: 100, height: 120 }}
          src={lists.movies[0].poster}
          alt="No"
        ></img>}
        {(!lists.movies || lists.movies.length == 0) && <img
          className="image1"
          style={{ width: 100, height: 120 }}
          src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"}
          alt="No"
        ></img>}
        {lists.movies && lists.movies.length > 1 && lists.movies[1].poster && <img
          className="image2"
          style={{ width: 100, height: 120 }}
          src={lists.movies[1].poster}
          alt="No"
        ></img>}
        {(!lists.movies || lists.movies.length <= 1) && <img
          className="image2"
          style={{ width: 100, height: 120 }}
          src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"}
          alt="No"
        ></img>}
        {lists.movies && lists.movies.length > 2 && lists.movies[2].poster && <img
          className="image3"
          style={{ width: 100, height: 120 }}
          src={lists.movies[2].poster}
          alt="No"
        ></img>}
        {(!lists.movies || lists.movies.length <= 2) && <img
          className="image3"
          style={{ width: 100, height: 120 }}
          src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"}
          alt="No"
        ></img>}
        {/* <img
          className="image2"
          style={{ width: 100, height: 120 }}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
          alt="No"
        ></img>
        <img
          className="image3"
          style={{ width: 100, height: 120 }}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images"
          alt="No"
        ></img> */}
      </div>
      <div className=" d-flex flex-row">
        <h4 className="ms-auto me-auto">{list.title ?? "Title"}</h4>
      </div>
    </div>
  );
}
export default ListIcon;
