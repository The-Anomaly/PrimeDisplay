import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ActivityIcon from "../../../assets/activity-icon.svg";
import SearchIcon from "../../../assets/search-icon.svg";
import WorkIcon from "../../../assets/work-icon.svg";
import GraphIcon from "../../../assets/graph-icon.svg";
import PhoneIcon from "../../../assets/action-calling-icon.svg";
import PaperIcon from "../../../assets/paper-icon.svg";
import CalendarIcon from "../../../assets/calendar-icon.svg";
import FolderIcon from "../../../assets/folder-icon.svg";
import "./Action.css";



const Action = () =>{
    return(
        <div>
            <Navbar />
            <div className="action-section">
        <Container className="action-container" fluid={true}>
            <div className="action-header">
                <h1 className="action-heading"> Choose an Action</h1>
            </div>
                <Row className="action-row">
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                            <img src={ActivityIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>Start a career <br /> Audit</p>
                            </div>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                        <img src={SearchIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>Discover your<br/>Strengths</p>
                            </div>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                        <img src={WorkIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>Build your<br/>Professional Profile</p>
                            </div>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                        <img src={GraphIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>View Career<br/>Insights</p>
                            </div>
                    </Col>
                </Row>

                <Row className="action-row">
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                            <img src={PhoneIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>Talk to a  <br /> Counsellor</p>
                            </div>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                        <img src={PaperIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>View Counsellor’s<br/>Recommendation</p>
                            </div>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                        <img src={CalendarIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>Create a Personal<br/>Career To-Do List</p>
                            </div>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="action-cards">
                        <div className="action-card-icon">
                        <img src={FolderIcon} className="card-icon" />
                            </div>
                            <div className="action-card-body">
                                <p>Currated<br/>Opportunities for you</p>
                            </div>
                    </Col>
                </Row>


            </Container>
            </div>

        </div>
    )
}

export default Action;