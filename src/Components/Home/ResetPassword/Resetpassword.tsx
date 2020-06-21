import * as React from "react";
import Navbar from "../HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Footer from "../HomeComponents/footer";
import Col from "react-bootstrap/Col";
import "../SignUp/signup.css";
import "./resetpassword.css";
import signinwelcome from "../../../assets/3.jpg";
import fb from "../../../assets/fbsignup.png";
import google from "../../../assets/google.png";
import linkedin from "../../../assets/linked.png";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";

interface State {
  email: string;
  errorMessage: string;
  isLoading: boolean;
  message: string;
  password: string;
  confirmpassword: string;
}
const ResetPassword: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    email: "",
    errorMessage: "",
    isLoading: false,
    message: "",
    password: "",
    confirmpassword: "",
  });
  const {
    email,
    errorMessage,
    isLoading,
    message,
    password,
    confirmpassword,
  } = state;
  const sendFormData = () => {
    const token = props.match.params.token;
    const userid = props.match.params.userid;
    setFormState({ ...state, isLoading: true });
    const data = {
      password,
      confirm_password:confirmpassword,
    };
    console.log(API);
    axios
      .post<any, AxiosResponse<any>>(
        `${API}/resetpassword/${userid}/${token}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response?.data[0]?.message);
        if (response.status === 200) {
          return setFormState({
            ...state,
            isLoading: false,
            message: response?.data[0]?.message,
          });
        }
        setFormState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error && error.response && error.response.data) {
          setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "Sending Failed",
          isLoading: false,
        });
      });
  };
  const validateForm = (e) => {
    e.preventDefault();
    setFormState({ ...state, isLoading: true });
      if (password.trim() === "" && confirmpassword.trim() === "") {
        return setFormState({
          ...state,
          errorMessage: "please fill the empty feild(s)",
          isLoading: false,
        });
      }
      if (confirmpassword !== password) {
        return  setFormState({ 
          ...state,
          errorMessage:"Password must be the same",
          isLoading: false
        });
      }
      else{
        sendFormData()
      }
   }
  const getCurrentAssessmentPosition = (token: string): void => {
    axios
      .get(`${API}/progress`, { headers: { Authorization: `Token ${token}` } })
      .then((response) => {
        console.log(response);
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_four_sports") ||
          response.data[0].next === "phase_four_business" ||
          response.data[0].next === "phase_four_stem"
        ) {
          return props.history.push(`/assessmentphasefour1`);
        }
        if (response.status === 200 && response.data[0].next === "phase_one") {
          return props.history.push(`/assessmentphaseone`);
        }
        if (response.status === 200 && response.data[0].next === "phase_two") {
          return props.history.push(`/assessmentphasetwo`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_three"
        ) {
          return props.history.push(`/assessmentphasethree`);
        }
        if (response.status === 200 && response.data[0].next === "phase_five") {
          return props.history.push(`/assessmentphasefive`);
        }
        if (response.status === 200 && response.data[0].next === "phase_six") {
          return props.history.push(`/assessmentphasesix`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_seven"
        ) {
          return props.history.push(`/assessmentphaseseven`);
        }
        if (response.status === 200 && response.data[0].next === "home") {
          return props.history.push(`/dashboard/personality`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeActionOnFormData = (e: any) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      message: "",
    });
  };
  const getUserInfo = (token: string): any => {
    axios
      .get(`${API}/currentuser`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(response?.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    const data = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      user_id: response.googleId,
      imageUrl: response.profileObj.imageUrl,
      provider: "Google",
    };
    console.log(data);
    axios
      .post(`${API}/accounts/socialauth/`, data)
      .then((response) => {
        console.log(response?.data[0]?.token);
        sessionStorage.setItem(
          "userToken",
          JSON.stringify(response?.data[0]?.token)
        );
        getCurrentAssessmentPosition(response.data[0]?.token);
        getUserInfo(response.data[0]?.token);
      })
      .catch((error) => {
        setFormState({
          ...state,
          errorMessage: "failed to login",
        });
      });
  };
  const errorGoogle = (error) => {
    console.log(error);
    setFormState({
      ...state,
      errorMessage: "Failed to login",
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <>
      <Navbar />
      <Container fluid={true}>
        <Row className="kli">
          <Col md={5} className="mo">
            <img
              src={signinwelcome}
              className="signupimg img-fluid"
              alt="SignupImage"
            />
          </Col>
          <Col md={5}>
            <div className="signwa ilaks">Reset Password</div>
            {errorMessage && (
              <Alert key={2} variant="danger">
                {errorMessage}
              </Alert>
            )}
            {message ? (
              <Alert key={3} variant="info">
                <div> {message}</div>
              </Alert>
            ) : (
              ""
            )}
            <Form onSubmit={validateForm}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="password"
                  name="password"
                  className="field1"
                  value={password}
                  onChange={changeActionOnFormData}
                  placeholder="Password"
                />
                <br />
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  className="field1"
                  value={confirmpassword}
                  onChange={changeActionOnFormData}
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Button variant="primary" className="subbtn" type="submit">
                {!isLoading ? "Submit" : "Submitting"}
              </Button>
              <div className="alreadyhave">
                <Link to="/signin">
                  <span className="logn"> Sign In</span>
                </Link>
              </div>
              <h6 className="text-divider">
                <span className="divider-text">or connect using</span>
                <div className="centeredline"></div>
              </h6>
              <div className="socialwrapper">
                <div className="socialIcons1">
                  <img src={fb} alt="fb" />
                </div>
                <GoogleLogin
                  clientId="53707797583-8rbiv5j6gdac35ik840rtcc65pklp9e9.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <div className="socialIcons2">
                      <img
                        src={google}
                        className="gooogg"
                        onClick={renderProps.onClick}
                        alt="fb"
                      />
                    </div>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={errorGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                <div className="socialIcons3">
                  <img src={linkedin} alt="fb" />
                </div>
              </div>
            </Form>
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default ResetPassword;
