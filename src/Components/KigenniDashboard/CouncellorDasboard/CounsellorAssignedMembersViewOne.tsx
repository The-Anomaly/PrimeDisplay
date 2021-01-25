import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import prevpage from "../../../assets/prevpage.svg";
import nextpage from "../../../assets/nextpage.svg";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Axios, { AxiosResponse } from "axios";
import noData from "../../../assets/no recommendations.png";
import { API } from "../../../config";
import CounsellorBookedSessionsComponent from "./CouncellorBookedSessionsComponent";
import brfcase from "../../../assets/brfcase.png";
import { Form } from "react-bootstrap";
import completedTask from "../../../assets/completed-task.png";
import TodoListComponent from "../TodoListComponent";
import { Link } from "react-router-dom";

const CounsellorAssignedMembersViewOne = (props: any) => {
  const [state, setState] = useState<any>({
    user: [],
    counsellorData: [],
    errorMessage: "",
    counsellorViewProfile: {},
    nextLink: "",
    what_i_do: "",
    isOpen: false,
    prevLink: "",
    count: "",
    success: "",
    total_pages: "",
    isLoading: false,
    currently_seeking: "",
    dob: "",
    industry_interest: "",
    present_pills: "",
    opportunities: "",
    userProfile: [],
  });
  React.useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/assigned-members`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/assigned-member/profile/${props.match.params.id}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/assigned-member/career-preferences?email=${props.match.params.id}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res, res1, res2) => {
          // console.log(res1);
          // console.log(res2);
          if (res.status === 200) {
            setState({
              ...state,
              user: [...res.data.results],
              counsellorData: [...res.data.results].reverse(),
              userProfile: [],
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
              isLoading: false,
              counsellorViewProfile: res2.data,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  }, []);
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const loadNewData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          if (res.status === 200) {
            setState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const loadPrevData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };
  const openModal = () => {
    setState({
      ...state,
      isOpen: true,
    });
  };
  const {
    nextLink,
    isLoading,
    counsellorData,
    prevLink,
    isOpen,
    present_pills,
    opportunities,
    dob,
    count,
    currently_seeking,
    counsellorViewProfile,
    total_pages,
    industry_interest,
  } = state;
  // console.log(counsellorData);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav assignedmemb={true} />
        <Row>
          <SideBarCounsellorDashboard assignedmemb={true} />
          <Col md={10} sm={12} className="prm newprm">
            <CounsellorDashboardNav title="Assigned Members List" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  welcomeText={`This is a report of detailed information ${counsellorData.name}`}
                />
                <Row className="signedfjss">
                  <Col md={12}>
                    <div className="pink23">
                      <div className="case23">
                        <img src={brfcase} className="brfcase" alt="brfcase" />
                        <span className="weww">Career Information</span>
                      </div>
                      <div>
                        <div className="msix">
                          <div
                            className="counview mbtn kalx"
                            onClick={openModal}
                          >
                            View more details
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pink23">
                      <div className="case23">
                        <img
                          src={completedTask}
                          className="brfcase"
                          alt="brfcase"
                        />
                        <span className="weww">Task</span>{" "}
                        <span className="finda">
                          Find the list of all the taks assigned to this client
                        </span>
                      </div>
                      <div>
                        <div className="msix"></div>
                      </div>
                    </div>
                    <div className="todo1a">
                      <TodoListComponent />
                    </div>
                    {counsellorData.length === 0 && !isLoading && (
                      <>
                        <div className="text-center">
                          <img src={noData} className="noData" alt="noData" />
                        </div>
                        <div className="empt">
                          You do not have any assigned task
                        </div>
                      </>
                    )}
                  </Col>
                  <Col md={12} className="topp2">
                    <div className="topp21"></div>
                    <div className="sdxm">Sessions</div>
                    <CounsellorBookedSessionsComponent />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          show={state.isOpen}
          size={"lg"}
          className="bookingszmodal"
          centered={true}
          onHide={closeModal}
        >
          <div className="textright">
            <span className="times4" onClick={closeModal}>
              &times;
            </span>
          </div>
          <div className="careerpref">Career Preferences</div>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="userfield1">
                  <h6 className="gha">What i presently do</h6>
                  <Form.Control
                    type="text"
                    className="userfield"
                    id="what_i_do"
                    value={counsellorViewProfile?.present_job}
                    name="what_i_do"
                    placeholder=""
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="userfield1">
                  <h6 className="gha">What industry i presently work in </h6>
                  <Form.Control
                    type="text"
                    className="userfield"
                    id="industry_interest"
                    value={counsellorViewProfile?.industry_interest}
                    placeholder=""
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="userfield1">
                  <h6 className="gha">
                    What industry i am currently seeking opportunities
                  </h6>
                  <Form.Control
                    type="text"
                    className="userfield"
                    value={currently_seeking}
                    id="currently_seeking"
                    placeholder=""
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="userfield1">
                  <h6 className="gha">Present work status </h6>
                  <Form.Control
                    type="text"
                    className="userfield"
                    id="present_pills"
                    value={counsellorViewProfile?.work_status}
                    placeholder=""
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="userfield1">
                  <h6 className="gha">Opportunities i am open to</h6>
                  <Form.Control
                    type="text"
                    className="userfield"
                    id="opportunities"
                    value={counsellorViewProfile?.opportunities}
                    placeholder=""
                  />
                </Form.Group>
              </Col>
              {/* <Col md={6}>
                <Form.Group className="userfield1">
                  <h6 className="gha">Date of birth </h6>
                  <Form.Control
                    type="text"
                    className="userfield"
                    id="dob"
                    value={dob}
                    placeholder=""
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <Row className="sdsaa">
              <Col md={6}>
                <Link
                  to={`/counsellor/result/${props.match.params.id}`}
                  target="_blank"
                >
                  <div className="fooass">View Assessment Result</div>
                </Link>
              </Col>
              <Col md={6}>
                <Link
                  to={`/users_profile/${props.match.params.id}`}
                  target="_blank"
                >
                  <div className="fooass counview1">
                    View Professional Profile
                  </div>
                </Link>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Container>
    </>
  );
};
export default CounsellorAssignedMembersViewOne;
