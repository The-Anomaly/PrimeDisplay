import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Footer from "../HomeComponents/newfooter";
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
import FacebookAuth from "react-facebook-auth";

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
const CounsellorsSignIn: React.FunctionComponent = (props: any) => {
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
      .post<any, AxiosResponse<any>>(`${API}/accounts/counsellor-login`, data, {
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
        }
        setFormState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);

        if (error && error?.response?.status == 500) {
          return setFormState({
            ...state,
            errorMessage: "Failed to login, internal server error.",
            isLoading: false,
          });
        }
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
  const getCurrentAssessmentPosition = (token: string): void => {
    axios
      .get(`${API}/progress`, { headers: { Authorization: `Token ${token}` } })
      .then((response) => {
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_four_nature") ||
          response.data[0].next === "phase_four_health" ||
          response.data[0].next === "phase_four_building" ||
          response.data[0].next === "phase_four_creative"
        ) {
          return props.history.push(`/assessmentphasefour`);
        }
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_four_sports") ||
          response.data[0].next === "phase_four_business" ||
          response.data[0].next === "phase_four_stem" ||
          response.data[0].next === "phase_four_humanitarian"
        ) {
          return props.history.push(`/assessmentphasefour1`);
        }
        if (response.status === 200 && response.data[0].next === "phase_one") {
          return props.history.push(`/assessmentphaseone`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "onboarding_chat"
        ) {
          return props.history.push(`/clientchat`);
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
          return props.history.push(`/free/dashboard`);
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
          console.log("Counselor sign in successful");
          console.log(response);
          props.history.push("/counselloroverview");
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
          errorMessage: "failed to login",
        });
      });
  };
  const errorGoogle = (error) => {
    setFormState({
      ...state,
      // errorMessage: "Google login failed",
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
      <Navbar/>
      <Container fluid={true}>
        <Row className="kli newkli">
          <Col md={5} className="mo">
            <img
              src={signinwelcome}
              className="signupimg img-fluid"
              alt="SignupImage"
            />
          </Col>
          <Col md={5}>
            <div className="signwa">Welcome back Counsellor</div>
            <div className="signwa1 signtxt">Enter Details</div>
            {errorMessage && (
              <Alert key={2} variant="danger">
                {errorMessage}
              </Alert>
            )}
            <Form onSubmit={validateForm}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  className="field1"
                  value={email}
                  onChange={changeActionOnFormData}
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  className="field1"
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
                <Link to="/counsellor/signup">
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

export default CounsellorsSignIn;
