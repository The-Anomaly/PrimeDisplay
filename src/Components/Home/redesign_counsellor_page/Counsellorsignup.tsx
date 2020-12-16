import React, { useState, useEffect } from "react";
import Navbar from "../../KigenniDashboard/CounsellorLandingPage/counsellornavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { API } from "../../../config";
import Alert from "react-bootstrap/Alert";
import eye from "../../../assets/eye.png";
import eyeclose from "../../../assets/eye-off.png";
import drpdwnarr from "../../../assets/dwn-arrw.png";
import modalimg from "../../../assets/ouroffer.svg"

const counsellorSignup = withRouter((props: any) => {
  const [state, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    howYouHeardAboutUs: "",
    referralCode: "",
    successMessage: "",
    errorMessage: "",
    passwordIsOpen: true,
    error: false,
    isLoading: false,
  });
  const {
    firstname,
    email,
    passwordIsOpen,
    password,
    howYouHeardAboutUs,
    referralCode,
    lastname,
    isLoading,
    successMessage,
    errorMessage,
  } = state;
  const [modState, setModState] = React.useState(false);
  const closeSignUpModal =()=> {
    setModState(false);
  }
  const onSubmit = () => {
    setFormState({ ...state, isLoading: true });
    const data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      info: howYouHeardAboutUs,
    };
    // console.log(data);
    //posting data to the api
    axios.post(`${API}/accounts/counsellor-signup/`, data)
    .then( ( response ) => {
      // console.log(response)
      setFormState({
          ...state,
          successMessage: response.data[0].message,
          isLoading: false,
      })
      if (response.status === 200){
       
         localStorage.setItem(
          "userToken",
          JSON.stringify(response.data[0].token)
        );
        setTimeout(()=>{
          props?.history?.push("/counselloroverview")
          // console.log(props)
        },5000)
       console.log("counsellor signup complete")
        //  localStorage.setItem(
        //   "userToken",
        //   JSON.stringify(response.data[0].token)
        // );
        // setTimeout(()=>{
        //   props?.history?.push("/counselloroverview")
        //   console.log(props)
        // },5000)
         setFormState({
          ...state,
          errorMessage: "",
          successMessage: response.data.message, 
          isLoading:false,
          error: true
        });
        setModState(true);
      }
    })
    .catch( (error) => {
      // console.log(error.response);
      window.scrollTo(-0,-0);
      if (error && error.response && error.response.data){
        return setFormState({
              ...state,
            errorMessage: error?.response?.data[0].message,
            isLoading: false,
            error: true,
          });
        }
        setFormState({
          ...state,
          errorMessage: "signup failed, check your internet connection",
          isLoading: false,
          error: true,
        });
      });
  };
  const validateForm = (e) => { 
    e.preventDefault();
    if (password.length < 6) {
      return setFormState({
        ...state,
        errorMessage: "Password must be at least 6 characters long",
        isLoading: false,
      });
    }
    if (firstname == "" && lastname=="" && email=="" && password == ""){
      return setFormState({
        ...state,
        errorMessage: "please enter your details"
      })
    }
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
    
    if (howYouHeardAboutUs == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter how you heard about us",
      });
    }

    if (password == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your password",
      });
    }
    if (password && email && firstname && lastname && howYouHeardAboutUs) {
      onSubmit();
    }
  };
  const onChangeHandler = (e) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMessage: "",
    });
  };
  const formActionHandler = (e) => {
    setFormState({
      ...state,
      howYouHeardAboutUs: e.target.value,
    });
  };
  const hidePassword=()=>{
    setFormState({
      ...state,
      passwordIsOpen:state.passwordIsOpen?false:true
    })
  }
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
      errorMessage: "failed to login",
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
    <div>
      <Navbar />
      <Modal
      show = {modState}
      centered = {true}
      // onHide = {closeSignUpModal}
      className = "Csignup"
      >
        <Modal.Body className="Csignupmodbody Csignuptxt1">
          <img 
          className="Csignupimg"
          src={modalimg}
          alt="sign up in progress"
          />
          <div className="Csignuptxt1">Thanks for signing up to be a Clarity counsellor!</div>
          <div className="Csignuptxt2">You'll be contacted by our admin via mail within 7 working days.</div>
          <Link to="/forcounsellors"><div className="Csignupbtn">&#8592; Back To Home</div></Link>
        </Modal.Body>
      </Modal>
      <div className="rdsignup-section counsellorsignup paddit">
        <Container>
          <Row className="rsignuprow">
            <Col md={12} className="rsignupdiv newrsignupdiv">
              <p>
                Registering to this website, you accept our
                <span className="t_plinkspn">
                  <Link to="/terms&conditions" target="_blank"> Terms of Use </Link>{" "}
                </span>{" "}
                and our
                <span className="t_plinkspn">
                  {" "}
                  <Link to="/privacy_policy" target="_blank">Privacy Policy</Link>{" "}
                </span>
              </p>
            </Col>
            <Col md={7}>
              <Form className="rdsignupform" onSubmit={validateForm}>
                <div className="rdsignupfrmdv">
                  <h4 className="sgnfrmhder">Sign Up</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(Become a Clarity Counsellor)</span>
                  </div>
                </div>
                {successMessage && (
                  <Alert key={2} variant="success" className=" alertzuccess">
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert key={2} variant="danger" className="alertzuccess">
                    {errorMessage}
                  </Alert>
                )}
                <Row>
                  <Col md={6}>
                    <label>
                      <span className="rdfrmlbl"> First Name</span>
                      <input
                        type="text"
                        name="firstname"
                        onChange={onChangeHandler}
                        value={firstname}
                        placeholder="Enter your first name"
                        size={75}
                        className="form-control rdsignupinput"
                      />
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <span className="rdfrmlbl"> Last Name</span>
                      <input
                        type="text"
                        name="lastname"
                        onChange={onChangeHandler}
                        value={lastname}
                        placeholder="Enter your Last name"
                        size={75}
                        className="form-control rdsignupinput"
                      />
                    </label>
                  </Col>
                </Row>

                <label>
                  <span className="rdfrmlbl"> Email Address </span>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    placeholder="Enter your Email Address"
                    size={30}
                    className="form-control rdsignupinput"
                  />
                </label>
                <label>
                  <span className="rdfrmlbl">Password</span>
                  <input
                    type={passwordIsOpen ? "password" : "text"}
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    placeholder="Enter your Password"
                    size={75}
                    className="form-control rdsignupinput"
                  />
                </label>
                <div className="text-right">
                  {passwordIsOpen ? (
                    <img
                      src={eye}
                      className="hideeye"
                      onClick={hidePassword}
                      alt="hideeye"
                    />
                  ) : (
                    <img
                      src={eyeclose}
                      className="hideeye"
                      onClick={hidePassword}
                      alt="hideeye"
                    />
                  )}
                </div>   
                <p className="redsgnfrmpar">
                  Your password must be at least 6 characters long and must
                  contain letters, numbers and special characters. Cannot
                  contain whitespace.
                </p>
                    {" "}
                    <span className="rdfrmlblslt">How you heard about us</span>
                    <select
                      onChange={formActionHandler}
                      className="rdseltinpt form-control"
                      required
                    >
                      <option
                        value=""
                        className="rdsltopt"
                        disabled
                        selected
                        hidden
                      >
                        --Please select--
                      </option>
                      <option value="Facebook" className="rdsltopt">
                        Facebook
                      </option>
                      <option value="Linkedin" className="rdsltopt">
                        Linkedin
                      </option>
                      <option value="Instagram" className="rdsltopt">
                        Instagram
                      </option>
                      <option value="Referral Link" className="rdsltopt">
                        Referral link
                      </option>
                      <option value="Friend" className="rdsltopt">
                        Friend
                      </option>
                    </select>
                    <div className="text-right">
                      <img src={drpdwnarr} className="drparr" />
                    </div>
                 
                <div className="rdsgnupfrmbtndv">
                  <button
                  type="submit"
                    onClick={validateForm}
                    className="rdsgnfrmbtn rdsgnup-animated"
                  >
                    {!isLoading ? "Sign Up" : "Processing..."}
                  </button>
                </div>
                <p className="rdsgnalready">
                <Link to="/counsellor/signin"> Already Registered? Sign In</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});
export default counsellorSignup;
