import '../componentStyle/moviePost.css';
import { Row, Col, Container } from "react-bootstrap"

function MoviePost({title}){


    return(
    <Row xs={10} className='moviePost mb-2 pb-3'>
        <Col xs={{offset:1, span:1}}><img style={{width:100, lenght: 100}} src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg" alt="user" /></Col>
        <Col xs={8} className="ms-5">{title}</Col>
    </Row>
    )
}
export default MoviePost