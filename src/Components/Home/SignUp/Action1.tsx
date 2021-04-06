import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ManImg from "../../../assets/man-in-hoodie.svg";
import PlayBtn from "../../../assets/play-btn.svg";
import "./Action1.css";



const Action1 = () =>{
    return(
        <>
        <Navbar />
        <div className = "action1-section">
            <Container className="action1-container" fluid={true}>
            <div className="action1-header">
                <p className="action1-heading"> Access your full dashboard for a trial offer of <span className="purple-color">N5000/month</span></p>
            </div>
            <div className ="img-section">
                <img src={ManImg} className="image-man" />  
                <img src={PlayBtn} className="play-btn"/>  

            </div>
            <div className="subscribe-btn">
                <button className="subscribe-button">Subscribe</button>
            </div>


                </Container>


        </div>
        </>
    )
}

export default Action1
