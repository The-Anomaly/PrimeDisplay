import * as React from 'react';
import '../Home/Home.css';
import './assessment.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../HomeComponents/footer';
import Navbar from '../HomeComponents/navbar';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { AssessmentFirstSection } from './AssessmentComponents/AssessmentFirstSection';
import cherrydone from '../../../assets/cherry-done.png';
import { Link } from 'react-router-dom';

type User = string | null;

const AssessmentFirstPhaseComplete = () => {
  const [name, setName] = React.useState('');
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem('user');
    const currentUser = user ?JSON.parse(user):[{first_name:""}];
    setName(currentUser[0]?.first_name);
  }, []);
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className='firstrowcf cftcontent'>
          <AssessmentFirstSection
            progressBar={15}
            phase='Phase 1'
            nextPhase='Phase 2'
            time={10}
          />
          <Col md={11}>
            <Row className='firstrowcf2 cftcontent'>
              <Col md={12} className='awesomewrap'>
                <div>
                  <img
                    className='cherry-done'
                    src={cherrydone}
                    alt='cherry-done'
                  />
                  <div className='awesome'>You are awesome {name}</div>
                  <div className='awesome1'>
                  You have the personality of a star! We can’t wait for you to see what we see here. 
                  </div>
                  <div className='awesome2'>
                    <Link to='/assessmentphasetwo'>
                      <button className='awesomebtn'>
                        Continue Assessment
                      </button>
                    </Link>
                    <Link to='/'>
                      <button className='awesomebtnsubmit'>
                        Save Progress
                      </button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default AssessmentFirstPhaseComplete;
