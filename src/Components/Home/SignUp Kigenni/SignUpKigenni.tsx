import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./signup.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import formavatar from '../../../assets/formavatar.png';
import formemail from '../../../assets/formemail.png';


interface State {
  fullname:string;
  email:string;
  phonenumber:string;
  successMsg:boolean;
  errorMessage:string
  isLoading:boolean;
}
const SignUpKigenni:React.FunctionComponent = (props:any) => {
  const [state,setFormState] = React.useState<State>({fullname:"",email:"",phonenumber:"",errorMessage:"",successMsg:false,isLoading:false});
  const {fullname,email,phonenumber,errorMessage,successMsg,isLoading} = state;

  const sendFormData=(e)=>{
    e.preventDefault()
    setFormState({...state,isLoading:true});
    const data = {
    };
    axios.post<any, AxiosResponse<any>>(`${API}/accounts/signup/`,data)
    .then(response=>{
      if(response.status===200){
        setFormState({
          ...state,
          successMsg:true,
          isLoading:false
        });
        setTimeout(
          props.history.push("/signin"),
      5000);
      } 
    })
    .catch(error=>{
      if (error && error.response && error.response.data){
        setFormState({
          ...state,
          errorMessage:error.response.data[0].message,
          isLoading:false
        });
      }
      setFormState({
        ...state,
        errorMessage:"Signup failed",
        isLoading:false
      });
    });
  };

 const changeActionOnFormData =(e:any)=>{
     setFormState({...state,
      [e.target.name]:e.target.value,
      errorMessage:"",
      successMsg:false
    });
  };

return (
        <>
           {/* <Navbar/> */}
              <Container fluid={true}>
                <Row className="kli bcbv">
                  <Col md={4} className="">
                    <div className="kigenni1">clarity</div>
                    <div className="kigenni2">Not feeling in control of your life, career or business?</div>
                    <div className="kigenni3"> Take the Clarity Assessment to find direction</div>
                  </Col>
                  <Col md={4}>
                    <div className=" mjcn">Let’s get started</div>
                  {
                    successMsg &&
                    <Alert key={1} variant="success">
                       SignUp Successful
                    </Alert>
                  }
                  {
                    errorMessage &&
                    <Alert key={2} variant="danger">
                      {errorMessage}
                    </Alert>
                  }
                  <Form onSubmit={sendFormData}>
                    <Row>
                      <Col>
                        <Form.Group className="bvbcm" controlId="formBasicCheckbox">
                          <img src={formavatar} className="formavatar" alt="formavatar"/>
                          <Form.Control
                            className="field3"
                            value={fullname}
                            onChange={changeActionOnFormData}
                            name="fullname"
                            placeholder="Full Name"
                          />
                        </Form.Group>
                      </Col>

                    </Row>
                    <Form.Group className="bvbcm" controlId="formBasicEmail">
                      <img src={formemail} className="formavatar" alt="formavatar"/>
                      <Form.Control
                        type="email"
                        className="field3"
                        value={email}
                        name = "email"
                        onChange={changeActionOnFormData}
                        placeholder="Email Address"
                      />
                    </Form.Group>
                    <Form.Group className="bvbcm" controlId="formBasicPassword">
                    <img src={formavatar} className="formavatar" alt="formavatar"/>
                      <Form.Control
                        type="text"
                        className="field3"
                        value={phonenumber}
                        name="phonenumber"
                        onChange={changeActionOnFormData}
                        placeholder="Phone Number"
                        />
                    </Form.Group>
                      <Button variant="primary" className="subbtn ncn" type="submit">
                        {!isLoading?"Start Assessment":"Starting ..."}
                      </Button>
                  </Form>
                </Col>
              </Row>
            {/* <Footer/> */}
          </Container>
        </>
    );
  };

export default SignUpKigenni;