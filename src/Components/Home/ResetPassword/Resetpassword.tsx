import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
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
  successMessage: boolean;
}
const ResetPassword: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    email: "",
    errorMessage: "",
    isLoading: false,
    message: "",
    password: "",
    confirmpassword: "",
    successMessage: false,
  });
  const {
    email,
    errorMessage,
    isLoading,
    message,
    password,
    confirmpassword,
    successMessage,
  } = state;
  const sendFormData = () => {
    const token = props.match.params.token;
    const userid = props.match.params.userid;
    setFormState({ ...state, isLoading: true });
    const data = {
      password,
      confirm_password: confirmpassword,
    };
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
    if (password.length < 7) {
      return setFormState({
        ...state,
        errorMessage: "Password must be more than 6 digits",
        isLoading: false,
      });
    }
    if (password.trim() === "" && confirmpassword.trim() === "") {
      return setFormState({
        ...state,
        errorMessage: "please fill the empty feild(s)",
        isLoading: false,
      });
    }
    if (confirmpassword !== password) {
      return setFormState({
        ...state,
        errorMessage: "Password must be the same",
        isLoading: false,
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
      .catch((error) => {});
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
          errorMessage: "failed to login",
        });
      });
  };
  const errorGoogle = (error) => {
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
      <div>
        <Navbar />
        <div className="rdsignup-section">
          <Container>
            <Row className="rsignuprow">
              <Col md={12} className="rsignupdiv">
              </Col>
              <Col md={7}>
                <Form className="rdsignupform" onSubmit={validateForm}>
                  <div className="rdsignupfrmdv">
                    <h4 className="sgnfrmhder">Password Reset</h4>
                    <div>
                      <div className="sgnupfrmline"></div>
                      <span className="sgnupdescr">
                        Please enter your new password
                      </span>
                    </div>
                  </div>
                  {successMessage && (
                    <Alert
                      key={2}
                      variant="success"
                      className=" alertzuccess text-center"
                    >
                      {successMessage}
                    </Alert>
                  )}
                  {errorMessage && (
                    <Alert
                      key={2}
                      variant="danger"
                      className="alertzuccess text-center"
                    >
                      {errorMessage}
                    </Alert>
                  )}
                  <label>
                    <span className="rdfrmlbl"> New Password </span>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={changeActionOnFormData}
                      placeholder="Enter Password"
                      size={30}
                      className="form-control rdsignupinput"
                    />
                  </label>
                  <label>
                    <span className="rdfrmlbl"> Confirm Password </span>
                    <input
                      type="password"
                      name="confirmpassword"
                      value={confirmpassword}
                      onChange={changeActionOnFormData}
                      placeholder="Confirm Password"
                      size={30}
                      className="form-control rdsignupinput"
                    />
                  </label>
                  <div className="rdsgnupfrmbtndv">
                    <span
                      onClick={validateForm}
                      className="rdsgnfrmbtn rdsgnup-animated"
                    >
                      {isLoading ? "Processing" : "Submit"}
                    </span>
                  </div>
                  <p className="rdsgnalready">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>{" "}
    </>
  );
};

export default ResetPassword;
