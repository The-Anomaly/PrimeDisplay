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
import "./SignIn.css";
import signinwelcome from "../../../assets/3.jpg";
import fb from "../../../assets/fbsignup.png";
import google from "../../../assets/google.png";
import linkedin from "../../../assets/linked.png";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import lock from "../../../assets/lock_icon.png";
import mail from "../../../assets/mail_icon.png";

interface State {
  email: string;
  password: string;
  errorMessage: string;
  isLoading: boolean;
}
const facebookIcon = ({ onClick }) => {
  return (
    <span>
      <img onClick={onClick} src={fb} alt="socailmedia1" />
    </span>
  );
};
const SignIn: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    email: "",
    password: "",
    errorMessage: "",
    isLoading: false,
  });
  const { email, password, errorMessage, isLoading } = state;
  
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const sendFormData = () => {
    setFormState({ ...state, isLoading: true });
    const data = {
      email,
      password,
    };
    axios
      .post<any, AxiosResponse<any>>(`${API}/accounts/login/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response?.data?.token)
          );
          getUserInfo(response.data.token);
          getCurrentAssessmentPosition(response.data.token);
        }
        setFormState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          return setFormState({
            ...state,
            errorMessage: error?.response?.data[0]?.message,
            isLoading: false,
          });
        }
        if (error && error?.response?.status === 404) {
          return setFormState({
            ...state,
            errorMessage: error?.response?.data.error,
            isLoading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "Failed to Login",
          isLoading: false,
        });
      });
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (email === "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }
    if (password === "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your password",
      });
    } else {
      sendFormData();
    }
  };
  const getCurrentAssessmentPosition = (token): void => {
    axios.get(`${API}/progress`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          if (
            response.data[0].onboarding_chat === false ||
            response.data[0].next === "onboarding_chat"
          ) {
            return props.history.push("/clientchat");
          } else if (
            response.data[0].next === "phase_one" ||
            response.data[0].phase_one === false
          ) {
            return props.history.push(`/assessment/welcome`);
          } else if (
            response.data[0].phase_two_nature === false ||
            response.data[0].phase_two_health === false ||
            response.data[0].phase_two_building === false ||
            response.data[0].phase_two_creative === false
          ) {
            return props.history.push(`/assessment/phaseone/complete`);
          } else if (
            response.data[0].phase_two_sports === false ||
            response.data[0].phase_two_business === false ||
            response.data[0].phase_two_stem === false ||
            response.data[0].phase_two_humanitarian === false
          ) {
            return props.history.push(`/assessmentphasetwo1`);
          } else if (response.data[0].phase_three === false) {
            return props.history.push(`/assessment/phasetwo/complete`);
          } else if (response.data[0].phase_four === false) {
            return props.history.push(`/assessment/phasethree/complete`);
          } else if (
            response.data[0].next === "home" &&
            response.data[0].onboarding_chat === true &&
            response.data[0].phase_one === true &&
            response.data[0].phase_two_sports === true &&
            response.data[0].phase_two_business === true &&
            response.data[0].phase_two_stem === true &&
            response.data[0].phase_two_humanitarian === true &&
            response.data[0].phase_two_nature === true &&
            response.data[0].phase_two_health === true &&
            response.data[0].phase_two_building === true &&
            response.data[0].phase_two_creative === true &&
            response.data[0].phase_three === true &&
            response.data[0].phase_four === true
          ) {
            return props.history.push(`/overview`);
          }
        }
      })
      .catch((error) => {});
  };
  const changeActionOnFormData = (e: any) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
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
  const errorGoogle = (error) => {
    setFormState({
      ...state,
      // errorMessage: "failed to login",
    });
  };
  const authenticate = (response) => {
    if (response) {
      const data = {
        name: response.name,
        email: response.email,
        user_id: response.id,
        provider: "facebook",
        imageUrl:
          response.picture && response.picture.data && response.picture.data.url
            ? response.picture.data.url
            : "",
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
            errorMessage: "failed to login",
          });
        });
    }
  };
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
            <div className="signwa">Sign In</div>
            <div className="signwa1">To Get Clarity</div>
            {errorMessage && (
              <Alert key={2} variant="danger">
                {errorMessage}
              </Alert>
            )}
            <Form onSubmit={validateForm}>
              <Form.Group controlId="formBasicEmail" className="diff23">
                <img className="signup_icon" src={mail} alt="last name" />
                <Form.Control
                  type="email"
                  name="email"
                  className="field1 signform"
                  value={email}
                  onChange={changeActionOnFormData}
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <img className="signup_icon" src={lock} alt="last name" />
                <Form.Control
                  type="password"
                  name="password"
                  className="field1 signform"
                  value={password}
                  onChange={changeActionOnFormData}
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" className="subbtn" type="submit">
                {!isLoading ? "Sign In" : "Signing In"}
              </Button>
              <div className="alreadyhave1">
                <Link to="/forgotpassword">Forgot Password ?</Link>
              </div>
              <div className="alreadyhave">
                Don't have an account?
                <Link to="/signup">
                  <span className="logn"> Sign Up</span>
                </Link>
              </div>
              <h6 className="text-divider">
                <span className="divider-text">or connect using</span>
                <div className="centeredline"></div>
              </h6>
              <div className="socialwrapper">
                {/* <div className="socialIcons1">
                  <FacebookAuth
                    appId="950826675353579"
                    callback={authenticate}
                    component={facebookIcon}
                    autoLoad={false}
                    reAuthenticate={true}
                  />
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

export default SignIn;
