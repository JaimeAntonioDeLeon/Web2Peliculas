import { Row, Col, Container } from "react-bootstrap"
import "../componentStyle/topBar.css"
function TopBar(){
    return(
<Row xs={12} className="topBar pb-3 mb-3">
                <Col xs={12} className="mb-4">Movie Universe</Col>
                <Col xs={{span:2, offset:1}}>Home</Col>
                {/* <Col xs={2}>Home</Col> */}
                <Col xs={2}>Movie</Col>
                <Col xs={2}>Lists</Col>
                <Col xs={2}>Profile</Col>
                <Col xs={2}>Logout</Col>
            </Row>
        )
     }
export default TopBar