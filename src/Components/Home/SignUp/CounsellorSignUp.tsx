import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Footer from "../HomeComponents/newfooter";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./signup.css";
import SignupImage from "../../../assets/logins.png";
import fb from "../../../assets/fbsignup.png";
import google from "../../../assets/google.png";
import linkedin from "../../../assets/linked.png";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";

interface State {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  whereDidYouLearnAboutUs: string;
  errorMessage: string;
  successMsg: boolean;
  isLoading: boolean;
}
const CounsellorSignUp: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    whereDidYouLearnAboutUs: "",
    errorMessage: "",
    successMsg: false,
    isLoading: false,
  });
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    errorMessage,
    successMsg,
    isLoading,
  } = state;

  const sendFormData = () => {
    setFormState({ ...state, isLoading: true });
    const data = {
      first_name: firstname,
      last_name: lastname,
      email,
      password,
      password2: confirmPassword,
    };
    axios
      .post(`${API}/accounts/counsellor-signup`, data)
      .then((response) => {
        setFormState({
          ...state,
          successMsg: response.data[0].message,
          isLoading: false,
        });
        localStorage.setItem(
          "userToken",
          JSON.stringify(response?.data[0]?.token)
        );
        setTimeout(() => {
          props.history.push("/counselloroverview");
        }, 2000);
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          return setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "Signup failed",
          isLoading: false,
        });
      });
  };
  const validateForm = (e) => { 
    e.preventDefault();
    if (firstname == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your first name",
      });
    }
    if (lastname == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your lastname",
      });
    }

    if (email == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }

    if (password == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your password",
      });
    }
    if (password && email) {
      sendFormData();
    }
  };
  const handleActionOnFormData = (e) => {
    setFormState({
      ...state,
      whereDidYouLearnAboutUs: e.target.value,
      errorMessage: "",
      successMsg: false,
    });
  };
  const changeActionOnFormData = (e: any) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMsg: false,
    });
  };
  const responseGoogle = (response) => {
    const data = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      user_id: response.googleId,
      imageUrl: response.profileObj.imageUrl,
      provider: "Google",
    };
    axios
      .post(`${API}/accounts/socialauth/`, data)
      .then((response) => {
        localStorage.setItem(
          "userToken",
          JSON.stringify(response?.data[0]?.token)
        );
        getCurrentAssessmentPosition(response.data[0]?.token);
        getUserInfo(response.data[0]?.token);
      })
      .catch((error) => {
        setFormState({
          ...state,
          // errorMessage: "failed to login",
        });
      });
  };
  const getUserInfo = (token: string): any => {
    axios
      .get(`${API}/currentuser`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response?.data));
        }
      })
      .catch((error) => {});
  };
  const errorGoogle = (response) => {
    setFormState({
      ...state,
      // errorMessage: "failed to login",
    });
  };
  const getCurrentAssessmentPosition = (token: string): void => {
    axios
      .get(`${API}/progress`, { headers: { Authorization: `Token ${token}` } })
      .then((response) => {
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
        setFormState({
          ...state,
          errorMessage: error?.response?.data?.detail,
        });
      });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <>
      <Navbar />
      <Container fluid={true}>
        <Row className="kli newkli">
          <Col md={5} className="mo">
            <img
              src={SignupImage}
              className="signupimg img-fluid"
              alt="SignupImage"
            />
          </Col>
          <Col md={5}>
            <div className="signwa">Sign up</div>
            <div className="signwa1">Become a Clarity Counsellor</div>
            <div className="signtxt2">Enter Details</div>
            {successMsg && (
              <Alert key={1} variant="info">
                {successMsg}
              </Alert>
            )}
            {errorMessage && (
              <Alert key={2} variant="danger">
                {errorMessage}
              </Alert>
            )}
            <Form onSubmit={validateForm}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Control
                      className="field1"
                      value={firstname}
                      onChange={changeActionOnFormData}
                      name="firstname"
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Control
                      className="field1"
                      name="lastname"
                      value={lastname}
                      onChange={changeActionOnFormData}
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  className="field1"
                  value={email}
                  name="email"
                  onChange={changeActionOnFormData}
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  className="field1"
                  value={password}
                  name="password"
                  onChange={changeActionOnFormData}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  className="field1"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={changeActionOnFormData}
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Button variant="primary" className="subbtn" type="submit">
                {!isLoading ? "Sign Up" : "Signing Up"}
              </Button>
              <div className="alreadyhave">
                Already have an account?
                <Link to="/counsellor/signin">
                  <span className="logn"> Login</span>
                </Link>
              </div>
              <h6 className="text-divider">
                <span className="divider-text">or connect using</span>
                <div className="centeredline"></div>
              </h6>
              <div className="socialwrapper">
                {/* <div className="socialIcons1">
                  <img src={fb} alt="fb" />
                </div> */}
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
                {/* <div className="socialIcons3">
                  <img src={linkedin} alt="fb" />
                </div> */}
              </div>
            </Form>
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default CounsellorSignUp;
