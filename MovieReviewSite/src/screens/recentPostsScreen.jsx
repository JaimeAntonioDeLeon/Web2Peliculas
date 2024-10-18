import  {React, useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../component/topBar';
import BottomBar from '../component/bottomBar';
import { Row, Col, Container } from "react-bootstrap"
import "../ScreensStyle/movieReleasesScreen.css"
import MoviePost from '../component/moviePost';

import axios from "axios"
import mongoose from 'mongoose';
import {
    useNavigate, Link
 } from "react-router-dom";

function RecentPostsScreen(){

    const loginAPI = async() =>{


        console.log("nah");
        const response = await axios.post("http://localhost:8080/api/users/login",{
          "username":userRef.current.value,
          "password":passwordRef.current.value
        })
        console.log(response.data);
        if(response.data){
            console.log("encontrado!");
            onLogin(response.data);
            setLogin(response.data);
        }
        else{
          //setWrongLogin(true);
        }

    }


    const [posts, setPosts] = useState([]);
    const loadPostsAPI = async() =>{

        const response = await axios.get("http://localhost:8080/api/posts",{
        })
        console.log(response.data);
        if(response.data){
            console.log("encontrado!");
             console.log(response.data);
             setPosts(response.data);
            // console.log(response.data[0].image);
            // setImage(response.data[1].image);
        }
        else{

        }
      
      }
      
      useEffect(()=>{loadPostsAPI();
        // console.log(loginSession);
        // if(localStorage.getItem('login')){
        //   const items = JSON.parse(localStorage.getItem('login'));
        //   console.log(items);
        //    setLogin(items);
        //    console.log(login); //No aparece nada porque useState toma rato en reaccionar, eso se aplica a lo que importo tambien!
        // }
      }, [])



    return(
        <div className='movieReleasesScreen'>
            <TopBar></TopBar>
            <Container className='container'>
            <Row xs={12} className="pt-4">
            <Col xs={12} className="mb-4">
                <h2>Recent Posts</h2>
                </Col>
                </Row>
           
            <Row xs={12} className="d-flex flex-row">      
                <MoviePost title="I'm blind and even I could see that coming!"/>

                </Row>
                <Row>
                <MoviePost title="Powerful movie!"/>
            </Row>
            {
                    posts.map((movie)=>{return(
                        <Row>
                        <MoviePost title="Powerful movie!"/>
                    </Row>)})
                }
                </Container>
                <BottomBar/>
            
            
        </div>
    )
}
export default RecentPostsScreen