import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import avatar from "../../../assets/avatar.svg";
import Axios from "axios";
import { API } from "../../../config";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

export interface IAppProps {
  Logout?: Function | any;
}

export const NavIsLoggedIn = withRouter((props: IAppProps | any) => {
  const [state, setState] = useState({
    showPreloader: false,
    isloading: false,
    IsUser: false,
    userhasdashboard: false,
  });
  useEffect(() => {
    const availableToken: any = localStorage.getItem("userToken");
    const token: string = availableToken ? JSON.parse(availableToken) : "";
    if (token) {
      setState({
        ...state,
        IsUser: true,
        showPreloader: true,
      });
    }
    if (!token) {
      setState({
        ...state,
        IsUser: false,
        showPreloader: false,
      });
    }
  }, []);
  const getCurrentAssessmentPosition = (): void => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token: string = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get(`${API}/progress`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        setState({
          ...state,
          isloading: false,
        });
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
          return props.history.push(`/overview`);
        }
      })
      .catch((error) => {
        setState({
          ...state,
          isloading: false,
        });
        //console.log(error);
      });
  };
  return (
    <React.Fragment>
      <div className="title1 shiftlefff newshft">
        <button className="title_t signupbtn newlogin" onClick={props.Logout}>
          Logout
        </button>
      </div>

      {/* <div className="title1">
        <button onClick={props.Logout} className="title_ll">
          Log out
        </button> 
      </div>*/}
      {/* <div className="title1">
        <button onClick={getCurrentAssessmentPosition} className="title_ll">
          Dashboard
        </button>
      </div> */}
      {/* <div className="title1">
        <span
          className="useravatarwraper"
          onClick={getCurrentAssessmentPosition}
        >
          <img src={avatar} className="useravatar" alt="avatar" />
        </span>
      </div> */}
      {state.isloading && (
        <div id="content">
          <Spinner variant={"info"} animation="grow" />
        </div>
      )}
    </React.Fragment>
  );
});
