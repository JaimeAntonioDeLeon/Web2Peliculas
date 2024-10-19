import "../componentStyle/moviePost.css";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MoviePost({ title }) {
  const navigate = useNavigate();
  return (
    <Row xs={10} className="moviePost mb-2 pb-3 pt-3 border border-4 mx-2"  onClick={() => {
      // navigate(`/moviePost?post=${list._id}`);
      navigate(`/moviePost?post=${5}`);
    }}>
      <Col xs={{ span: 1 }}>
        <img
          style={{ width: 100, lenght: 100 }}
          src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
          alt="user"
        />
      </Col>
      <Col xs={8} className="ms-5 mt-4">
        <h5>{title}</h5>
        <h6>{"Pelicula elegida"}</h6>
      </Col>
    </Row>
  );
}
export default MoviePost;
