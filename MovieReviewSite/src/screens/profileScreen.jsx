import  React from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../component/topBar';
import BottomBar from '../component/bottomBar';
import ListIcon from '../component/listIcon';
import { Row, Col, Container } from "react-bootstrap"
import "../ScreensStyle/profileScreen.css"
function ProfileScreen(){


    return(
        <div className='profileScreen'>
            <TopBar></TopBar>
            <Row>
            <img className='ms-auto me-auto' style={{width:200, height: 200}} src="https://static.vecteezy.com/system/resources/previews/000/574/215/non_2x/vector-sign-of-user-icon.jpg" alt="No"></img>
            </Row>
            <Container className='container'>
            <Row xs={12} >
                
            </Row>
            <Row>
            <Col className='mt-3' xs={{offset:1, span:10}}>
                <h2 className='mb-3'>Username</h2>
                <h3 className='mb-3'>Registration date:</h3>
                <h3 className='mb-3'>Email adress</h3>
            </Col>
            </Row>
            <Row>
                <Col xs={{offset:1, span:10}} className='separator mb-3'></Col>
            </Row>
            <Row  className="d-flex flex-row pb-4">
                <Col xs={{offset:1, span:11}}>
                <h2 className='mb-4'>Movie Lists</h2>
                </Col>
                <Col xs={2} className="mb-3">         
                <ListIcon/>
                </Col>
                <Col xs={2} className="mb-3">         
                <ListIcon/>
                </Col>
                <Col xs={2} className="mb-3">         
                <ListIcon/>
                </Col>
                </Row>
            
                </Container>
                <BottomBar/>
            
            
        </div>
    )
}
export default ProfileScreen