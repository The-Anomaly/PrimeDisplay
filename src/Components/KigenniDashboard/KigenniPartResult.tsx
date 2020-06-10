import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Navbar from "../Home/HomeComponents/navbar";
import Footer from "../Home/HomeComponents/footer";
import firstlogo from "../../assets/image 1.png";
import firstChart from "../../assets/Rectangle 37.png";
import secondlogo from "../../assets/image 2.png";
import vector from "../../assets/Vector.png";
import vector1 from "../../assets/Vector1.png";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import vector5 from "../../assets/Vector5.png";
import vector6 from "../../assets/Vector6.png";
import vector7 from "../../assets/Vector7.png";


interface State {
  fullname: string;
  email: string;
  phonenumber: string;
  successMsg: boolean;
  errorMessage: string;
  isLoading: boolean;
}
const KigenniPartResult: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    fullname: "",
    email: "",
    phonenumber: "",
    errorMessage: "",
    successMsg: false,
    isLoading: false,
  });
  const {
    fullname,
    email,
    phonenumber,
    errorMessage,
    successMsg,
    isLoading,
  } = state;

  const sendFormData = (e) => {
    e.preventDefault();
    setFormState({ ...state, isLoading: true });
    const data = {};
    axios
      .post<any, AxiosResponse<any>>(`${API}/accounts/signup/`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setFormState({
            ...state,
            successMsg: true,
            isLoading: false,
          });
          setInterval(props.history.push("/signin"), 5000);
        }
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
          errorMessage: "Signup failed",
          isLoading: false,
        });
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

  return (
    <>
          <Col md={10} className="">
            <div className="kdashheader">
              Jaiyeola Jones{" "}
              <span className="kdashheaderlight"> Clarity Report</span>
            </div>
            <div className="kdash1">
              It seems you're presently not on the right career track.{" "}
              <span className="kdash1light"> see details below</span>
            </div>
            <div className="kdasharea">
              <div>
                <img src={firstlogo} className="kfirstlogo" alt="firstlogo" />
              </div>
              <div className="kprofilewrap">
                <div className="kprofile">Profile</div>
                <div className="kprofile2">Entrepreneur</div>
                <div className="kprofile3">Growing Business</div>
              </div>
            </div>
            <hr />
            <div className="resultsec2">
              <div className="resultsec22">
                <img src={firstChart} className="firstChart" alt="firstChart" />
              </div>
              <div className="csfitscore">
                <div className="csfitscore1">Your Career Fitness Score</div>
                <div className="csbody">
                  It seems you're presently not on the right career track. You
                  are presently unsure of yourself and you’ve felt a lack of
                  self-understanding for a longtime. You’re like a blank canvas
                  and may be experiencing some level of low self-esteem, always
                  watching your step, being self and image conscious. But more
                  painful is, right now you have very little clue what you want
                  to do with your life. Your interests and talents are highly
                  multifaceted that you wonder what to focus on, how to merge
                  things and not lose your essence.
                </div>
              </div>
            </div>
            <hr />
            <div className="resultsec3">
              <div className="reskwrap">
                <div className="csfitscore1 reskheader">
                  Your Career Personality type
                </div>
                <div className="">
                  Intellectual Researcher and your unique mission is exploring
                  the world through knowledge and translate that insight from
                  knowledge to innovative solutions
                </div>
              </div>
              <div>
                <img src={secondlogo} className="secondlogo img-fluid" alt="secondlogo" />
              </div>
            </div>
            <div className="resultsec3">
              <div className="resultt">
                Your mind is full of imagination and excitement. You are
                extremely intellectual and sound; you are a conceptual problem
                solver and often show flashes of creative brilliance. Outwardly
                quiet, reserved, and detached, you are inwardly absorbed in
                analyzing problems. You enjoy subjects or topics that stimulate
                your intellect. You prefer to find and use logical principles to
                understand what you’re being taught and like conversations that
                are purposeful. May often argue to the point of hair-splitting
                just for fun. You may get bored if stuck on one thing for too
                long. Learning about something new and diving into it head on is
                fun for you. You enjoy many different subjects, it might be
                reading, writing, different sports, listening to music, going to
                concerts or playing video games and would rather explore
                different subjects than be stuck to one.
              </div>
            </div>
          </Col>
    </>
  );
};

export default KigenniPartResult;
