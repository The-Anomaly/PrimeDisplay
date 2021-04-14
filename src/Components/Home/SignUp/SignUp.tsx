import * as React from "react";
import Navbar from "../HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Footer from "../HomeComponents/footer";
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
import names from "../../../assets/signup1.png";
import mail from "../../../assets/mail_icon.png";
import lock from "../../../assets/lock_icon.png";
import question from "../../../assets/question_icon.png";

interface State {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  referalcode: string;
  confirmPassword: string;
  whereDidYouLearnAboutUs: string;
  errorMessage: string;
  successMsg: any;
  error: boolean;
  isLoading: boolean;
  isloading: boolean;
}
const SignUp: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    whereDidYouLearnAboutUs: "",
    errorMessage: "",
    successMsg: false,
    error: false,
    referalcode: "",
    isLoading: false,
    isloading: false,
  });
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    referalcode,
    whereDidYouLearnAboutUs,
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
      info: whereDidYouLearnAboutUs,
      password,
      password2: confirmPassword,
      referral_code: referalcode,
    };
    axios
      .post<any, AxiosResponse<any>>(`${API}/accounts/signup/`, data)
      .then((response) => {
        window.scrollTo(-0,-0)
        // console.log(response)
        if (response.status === 200) {
          return setFormState({
            ...state,
            errorMessage: "",
            successMsg: response.data.message,
            isLoading: false,
            error: true,
          });
          setTimeout(props.history.push("/signin"), 5000);
        }
      })
      .catch((error) => {
        window.scrollTo(0,0)
        // console.log(error?.response);
        // console.log(error);
        if (error) {
          return setFormState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            error: true,
          });
        }
        setFormState({
          ...state,
          errorMessage: "Signup failed",
          isLoading: false,
          error: true,
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

    if (whereDidYouLearnAboutUs == "") {
      return setFormState({
        ...state,
        errorMessage: "Please empty field",
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
      error: false,
      successMsg: false,
    });
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  const changeActionOnFormData = (e: any) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      error: false,
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
          errorMessage: "Failed to Sign Up",
        });
      });
  };
  const ResendSignUpEmail = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const data = {
      email,
    };
    axios
      .post(`${API}/accounts/resend-email`, data)
      .then((response) => {
        if (response.status == 200) {
          return setFormState({
            ...state,
            successMsg:
              "Email sent, check your email for account activation link. It may take several minutes to arrive",
            isLoading: false,
            isloading: false,
            error: true,
            errorMessage: "",
          });
        }
      })
      .catch((error) => {
        // console.log(error.response);
        setFormState({
          ...state,
          errorMessage: error?.response?.data[0]?.message,
          isloading: false,
          error: false,
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
      errorMessage: "Failed to Sign Up",
    });
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
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <>
      <Navbar counselor={true}/>
      <Container fluid={true}>
        <Row className="kli">
          <Col md={5} className="mo">
            <img
              src={SignupImage}
              className="signupimg img-fluid"
              alt="SignupImage"
            />
          </Col>
          <Col md={5}>
            <div className="signwa">Sign Up</div>
            <div className="signwa1 difg">To Get Clarity</div>
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
                  <Form.Group controlId="formBasicCheckbox" className="diff23">
                    <img className="signup_icon" src={names} alt="first name" />
                    <Form.Control
                      className="field1 signform"
                      value={firstname}
                      onChange={changeActionOnFormData}
                      name="firstname"
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicCheckbox" className="diff23">
                    <img className="signup_icon" src={names} alt="last name" />
                    <Form.Control
                      className="field1 signform"
                      name="lastname"
                      value={lastname}
                      onChange={changeActionOnFormData}
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formBasicEmail" className="diff23">
                <img className="signup_icon" src={mail} alt="Email" />
                <Form.Control
                  type="email"
                  className="field1 signform"
                  value={email}
                  name="email"
                  onChange={changeActionOnFormData}
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="diff23">
                <img className="signup_icon" src={lock} alt="password" />
                <Form.Control
                  type="password"
                  className="field1 signform"
                  value={password}
                  name="password"
                  onChange={changeActionOnFormData}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="diff23">
                <img
                  className="signup_icon"
                  src={lock}
                  alt="confirm password"
                />
                <Form.Control
                  type="password"
                  className="field1 signform"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={changeActionOnFormData}
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail1" className="diff23">
                <img className="signup_icon" src={question} alt="where" />
                <Form.Control
                  as="select"
                  className="field1 form-control signform"
                  onChange={handleActionOnFormData}
                  name="whereDidYouLearnAboutUs"
                >
                  <option className="selectopt">
                    Where did you hear about us?
                  </option>
                  <option className="selectopt" value="Facebook">
                    Facebook
                  </option>
                  <option className="selectopt" value="Linkedin">
                    Linkedin
                  </option>
                  <option className="selectopt" value="Instagram">
                    Instagram
                  </option>
                  <option className="selectopt" value="Referal Link">
                    Referal Link
                  </option>
                  <option className="selectopt" value="Referal Link">
                    Friend
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="">
                <img className="signup_icon" src={question} alt="code" />
                <Form.Control
                  type="text"
                  className="field1 signform"
                  value={referalcode}
                  name="referalcode"
                  onChange={changeActionOnFormData}
                  placeholder="Referral Code (Optional)"
                />
              </Form.Group>
              <div>
                {state.error && (
                  <div className="resend22">
                    Did not receive the email?{" "}
                    <a onClick={ResendSignUpEmail} className="resend">
                      {" "}
                      {state.isloading ? "processing" : "resend"}
                    </a>
                  </div>
                )}
              </div>
              <Button variant="primary" className="subbtn" type="submit">
                {!isLoading ? "Sign Up" : "Signing Up"}
              </Button>
              <div className="alreadyhave">
                Already have an account? {" "}
                <Link to="/signin">
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

export default SignUp;
