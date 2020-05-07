import * as React from 'react';
import '../Home/Home.css';
import './assessment.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../HomeComponents/footer';
import Navbar from '../HomeComponents/navbar';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { AssessmentFirstSection } from './AssessmentComponents/AssessmentFirstSection';
import nextis5 from '../../../assets/nextis5.png';
import { Link } from 'react-router-dom';
import '../Forms/recruitmentform.css';
import axios from 'axios';
import { API } from '../../../config';
import { ToastContainer, toast } from 'react-toastify';
 


type User = string | null



 const AssessmentThirdPhaseComplete =(props:any)=> {
    const [ name,setName ] = React.useState('')
    React.useEffect(():any=>{
        window.scrollTo(-0,-0)
        let user:User = sessionStorage.getItem('user')
        const currentUser = JSON.parse(user?user:'')
        setName(currentUser[0].first_name)
        console.log(currentUser[0].first_name)
    },[])

  return (
    <div>
        <Navbar/>
        <Container fluid={true}>
            <Row className="firstrowcf cftcontent">
               <AssessmentFirstSection progressBar={30} phase="Phase 3" nextPhase="Phase 4" time={10}/>
               <Col md={11}>
                    <Row className="firstrowcf2 cftcontent">
                        <Col md={12} className="awesomewrap">
                            <div>
                                <img className="cherry-done" src={nextis5} alt="cherry-done"/>
                                <div className="awesome">
                                    Almost there {name}, just one more to go
                                </div>
                                <div className="awesome1">
                                    Your surprise just <span className="doubled">doubled!</span> Complete next section to access it
                                </div>
                                <div className="awesome2">
                                <Link to="/assessmentphasefour"><button className="awesomebtn">Continue Assessment</button></Link> 
                                <Link to="/"> <button className="awesomebtnsubmit">Save Progress</button></Link>
                                </div>
                            </div>
                        </Col> 
                    </Row>
               </Col>
            </Row>
        <Footer/>
        </Container>
    </div>
  )
}

export default AssessmentThirdPhaseComplete;
