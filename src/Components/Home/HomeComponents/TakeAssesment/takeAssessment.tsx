import * as React from 'react';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { API } from '../../../../config';
import { Link } from 'react-router-dom';

interface btnProps{
    background:string;
}

const TakeAssessment: React.FunctionComponent<btnProps> = (props:any) => {
  const directUserToAssessment=()=>{
    const availableToken = sessionStorage.getItem('userToken');
    const token = availableToken?JSON.parse(availableToken):props.history.push('/signin');
    getCurrentAssessmentPosition(token);
  };
  const getCurrentAssessmentPosition=(token:string):void=>{
    axios.get(`${API}/progress`,{ headers: { 'Authorization': `Token ${token}` } })
    .then((response)=>{
        if(response.status===200 && response.data[0].next==='phase_four_sports' ||  response.data[0].next==='phase_four_business'||  response.data[0].next==='phase_four_stem'){
           return props.history.push(`/assessmentphasefour1`);
        }
        if(response.status===200 && response.data[0].next==='phase_one'){
            return props.history.push(`/assessmentphaseone`);
        }
        if(response.status===200 && response.data[0].next==='phase_two'){
            return props.history.push(`/assessmentphasetwo`);
        }
        if(response.status===200 && response.data[0].next==='phase_three'){
            return props.history.push(`/assessmentphasethree`);
        }
        if(response.status===200 && response.data[0].next==='phase_five'){
            return props.history.push(`/assessmentphasefive`);
        }
        if(response.status===200 && response.data[0].next==='phase_six'){
            return props.history.push(`/assessmentphasesix`);
        }
        if(response.status===200 && response.data[0].next==='phase_seven'){
            return props.history.push(`/assessmentphaseseven`);
        }
        if(response.status===200 && response.data[0].next==='home'){
            return  props.history.push(`/dashboard/personality`);
        }
    })
    .catch(error=>{
      if(error){
       return props.history.push('/login');
      }
    });
  };
  return (
      <>
        <Col md={12} className='text-center takeAssesment'>
            <Link to='/signin'>
              <button className='TAKE-FREE-ASSESSMENT' style={{background:props.background}}>
                  TAKE FREE ASSESSMENT
              </button>
            </Link>
        </Col>
      </>
  );
};

export default TakeAssessment;
