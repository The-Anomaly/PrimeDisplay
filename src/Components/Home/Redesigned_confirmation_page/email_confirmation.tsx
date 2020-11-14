import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import Navbar from "../HomeComponents/newnavbar";
import "./email_confirmation.css";
import { withRouter, Link } from "react-router-dom"
import axios,{ AxiosResponse } from 'axios';
import {API} from '../../../config';


const Email_confirm_page = withRouter ((props: any ) => {
  const [state, setState] = useState({
    client: '',
    email: '',
    confirmEmail: '',
    isLoading: false,
    successMessage: '',
    errorMessage: '',
    error: false 
  })
  const {client,email, confirmEmail,isLoading,successMessage,errorMessage}= state
 
  useEffect(()=>{
    const user :any= localStorage.getItem("userEmail") 
    const userEmail = JSON?.parse(user)
    console.log(userEmail)
    setState({
      ...state,
      client:userEmail
    })
  },[]);
  //resend code function
   const resendCode =()=>{
     setState({
       ...state,
       isLoading:true
     })
     const data ={
       email,
     };
     axios.post(`${API}/accounts/resend-code/`,data)
     .then((response)=>{
       if (response.status === 200) {
         return setState({
            ...state,
            successMessage: response.data.message,
            isLoading: false,
         })
       }
     })
     .catch((error)=>{
       console.log(error.response)
       setState({
         ...state,
         errorMessage: error?.response?.data[0].message
       })
     })
   }

  const onSubmit=()=>{
    setState( {...state, isLoading:true} )
    const data={
      email: client,
      code: confirmEmail
    }
    console.log(data)
    axios.post<any, AxiosResponse<any>>(`${API}/accounts/confirm-code/`,data)
    .then(( response )=>{
      console.log(response)

      if (response.status === 200){
        setTimeout(()=>{
          props?.history?.push("/clientchat")
          console.log(props)
        },4000)
          setState({
            ...state,
            successMessage: response.data.message,
          })
      }
      
    })
    .catch((error)=>{
      console.log(error.response)
      if(error){
        return setState({
          ...state,
          errorMessage: error?.response?.data?.message,
          isLoading: false,
          error:true
        })
      }
    })
  
  }
  const onChangeHandler=(e)=>{
    setState({
      ...state,
      confirmEmail: e.target.value
    })
  }
  return(
    <div>
      <Navbar />
      <div className="cnfirmemail_sectn">
        <Container>
          <Row>
            <Col md={12}>
              <p className="cnfim-heading">Confirm your Email</p>
              <p className="cnfim-messg">
                A code has been sent to 
                <span className="cnfirmspan"> {state.client}</span>, please enter
                code below <br /> to confirm your Account
              {successMessage && (
                <Alert key={1} variant="success" >
                    {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert key={2} variant="danger">
                    {errorMessage}
                </Alert>
              )}
              </p>
            </Col>
          </Row>
          <Row className="cnfrmmailrow2">
            <Col md={7}>
              <Form className="cnfirmmailform">
                <Row>
                  <Col md={8}>
                    <input
                      type="text"
                      value={confirmEmail}
                      onChange={onChangeHandler}
                      size={50}
                      className="cnfimmailinpt form-control"
                      placeholder="Please enter the code you received"
                    />
                  </Col>
                  <Col md={4} className="confirmtn-btn" onClick={onSubmit}>
                    Confirm Account
                  </Col>
                </Row>
              </Form>
              <div className="cnfrmdiv">
                <p>Didn’t Recieve any mail? <span className="rsendmail" onClick={resendCode}>Resend!</span></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});
export default Email_confirm_page;
