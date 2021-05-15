import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import avatar from "../../../assets/avatar.svg";
import Axios from "axios";
import { API } from "../../../config";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import logoutImage from "../../../assets/logout.png";
import { Modal } from "react-bootstrap";


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
  const [logoutState, setLogoutState] = React.useState({ logoutModal: false });
  const closeLogoutModal = () => {
    setLogoutState({
      ...logoutState,
      logoutModal: false,
    });
  };
  const openLogoutModal = () => {
    setLogoutState({
      ...logoutState,
      logoutModal: true,
    });
  };
  const { logoutModal } = logoutState;
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/signin");
  };
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
            response.data[0].next === "phase_two_nature") ||
          response.data[0].next === "phase_two_health" ||
          response.data[0].next === "phase_two_building" ||
          response.data[0].next === "phase_two_creative"
        ) {
          return props.history.push(`/assessmentphasetwo`);
        }
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_two_sports") ||
          response.data[0].next === "phase_two_business" ||
          response.data[0].next === "phase_two_stem" ||
          response.data[0].next === "phase_two_humanitarian"
        ) {
          return props.history.push(`/assessmentphasetwo1`);
        }
        if (response.status === 200 && response.data[0].next === "phase_one") {
          return props.history.push(`/assessment/welcome`);
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
  const goToDashboard = () => {
    return props.history.push(`/overview`);
  }
  return (
    <>
    <React.Fragment>
      <div className="title1 shiftlefff newshft">
      <button className="title_t signupbtn newlogin nav-nopadd" onClick={goToDashboard}>
          Dashboard
        </button>
        <button className="title_t signupbtn newlogin" onClick={openLogoutModal}>
          Logout
        </button>
      </div>
      {state.isloading && (
        <div id="content">
          <Spinner variant={"info"} animation="grow" />
        </div>
      )}
    </React.Fragment>
     <Modal
     show={logoutModal}
     className="warning22e"
     centered={true}
     onHide={closeLogoutModal}
   >
     <Modal.Body>
       <div className="text-center">
         {" "}
         <img src={logoutImage} className="popUUp" alt="failedNotice" />{" "}
       </div>
       <div className="areusure1">
         Are you sure you want to <b> LogOut?</b>
       </div>
       <div className="text-center planupgrade">
         <div
           className="retaketest upss1 planupgradebtn mddd"
           onClick={closeLogoutModal}
         >
           Go Back
         </div>
         <div
           className="retaketest upss1 planupgradebtn mddd2"
           onClick={logOut}
         >
           Log out
         </div>
       </div>
     </Modal.Body>
   </Modal>
   </>
  );
});
