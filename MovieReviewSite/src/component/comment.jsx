import "../componentStyle/comment.css";
import { Row, Col, Container } from "react-bootstrap";

function Comment({ text }) {
  return (
    <Row xs={10} className="comment ms-3 me-3 mb-3 pb-3 pt-3">
      <Col xs={{ span: 1 }}>
        <img
          style={{ width: 100, lenght: 100 }}
          src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg"
          alt="user"
        />
      </Col>
      <Col xs={8} className="ms-5">
        {text}
      </Col>
    </Row>
  );
}
export default Comment;
