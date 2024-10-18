import { Row, Col, Container } from "react-bootstrap";
import "../componentStyle/topBar.css";
import { useNavigate, Link } from "react-router-dom";
function TopBar({ handleLogout }) {
  const navigate = useNavigate();
  return (
    <Row xs={12} className="topBar pb-3 mb-3">
      <Col xs={12} className="mb-4">
        <h3>Movie Universe</h3>
      </Col>
      <Col
        xs={{ span: 2, offset: 1 }}
        className="border-end border-light"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Col>
      {/* <Col xs={2}>Home</Col> */}
      <Col
        xs={2}
        className="border-end border-light"
        onClick={() => {
          navigate("/movieReleases");
        }}
      >
        <span>Movie</span>
      </Col>
      <Col
        xs={2}
        className="border-end border-light"
        onClick={() => {
          navigate("/recentLists");
        }}
      >
        Lists
      </Col>
      <Col
        xs={2}
        className="border-end border-light"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Profile
      </Col>
      <Col
        xs={2}
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Col>
    </Row>
  );
}
export default TopBar;
