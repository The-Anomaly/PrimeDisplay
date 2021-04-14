import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/avatar.svg";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import prevpage from "../../../assets/prevpage.svg";
import nextpage from "../../../assets/nextpage.svg";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import { Modal, Spinner } from "react-bootstrap";
import noplan from "../../../assets/noplan.png";
import "./councellor.css";
import search from "../../../assets/search.png";
import close from "../../../assets/close.png";

const CouncellorRecommendationsToAll = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: [],
    counsellorData: [],
    isLoading: false,
    isloading: false,
    prevLink: "",
    nextLink: "",
    count: "",
    total_pages: "",
    back: false,
  });
  const {
    errorMessage,
    user,
    isloading,
    prevLink,
    nextLink,
    count,
    total_pages,
    back,
  } = state;
  const [newstate, setState] = React.useState<any>({
    searchKey: "",
    modal: false,
    modalData: {},
  });
  const { searchKey, modal, modalData } = newstate;
  const openRecommendationModal = (data) => {
    console.log(data);
    setState({
      ...newstate,
      modal: true,
      modalData: data,
    })
  };
  const closeRecommendationModal = () => {
    setState({
      ...newstate,
      modal: false,
    })
  };
  React.useEffect(() => {
    setFormState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/your-recommendations`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              user: [...res.data.results],
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
              isloading: false,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
            isloading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  }, []);
  const loadNewData = () => {
    setFormState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          // console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              successMsg: true,
              isLoading: false,
              user: [...res1.data.results],
              count: res1.data.page,
              nextLink: res1.data.next,
              prevLink: res1.data.previous,
              total_pages: res1.data.total_pages,
            });
          }
        })
      )
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
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const loadPrevData = () => {
    setFormState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          // console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              successMsg: true,
              isLoading: false,
              user: [...res1.data.results],
              count: res1.data.page,
              nextLink: res1.data.next,
              prevLink: res1.data.previous,
              total_pages: res1.data.total_pages,
            });
          }
        })
      )
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
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const onchange = (e) => {
    setState({
      ...newstate,
      searchKey: e.target.value,
    });
  };
  const searchRecommendations = () => {
    console.log(searchKey);
    setFormState({
      ...state,
      isloading: true,
      user: [],
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/your-recommendations/?q=${searchKey}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            return setFormState({
              ...state,
              user: [...res.data.results],
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
              isloading: false,
              back: true,
            });
          }
        })
      )
      .catch((error) => {
        if (error?.response?.status == 400) {
          setState({
            ...state,
            errorMessage: error.response.data.message,
            counsellorData: [],
            back: false,
          });
        }
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            counsellorData: [],
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const goBack = () => {
    return window.location.reload();
  }
  // console.log(user);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav councrec={true} />
        <Row>
          <SideBarCounsellorDashboard councrec={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <CounsellorDashboardNav title="Counsellors Recommendation" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <div className="flxv1">
                  <DashboardCounsellorIntroHeader welcomeText="Get insight to the overview of all your concerns" />
                  {user.length > 0 && (<div className="ffrr1">
                    <img
                      src={search}
                      className="searchi search-img-btn"
                      alt="search"
                      onClick={() => searchRecommendations()}
                    />
                    <input
                      placeholder="Search by client name"
                      type="text"
                      onChange={onchange}
                      value={searchKey}
                      name="searchKey"
                      onKeyPress={(e) => {
                        if (e.key == "Enter") {
                          searchRecommendations();
                        }
                      }}
                      id="searchKey"
                      className="searchinput form-control"
                    />
                  </div>)}
                </div>
               {back && ( <button onClick={goBack} className="back-btn">&#8592;  Back</button>)}
                <Row>
                  <Col md={12} className="mssaag">
                    {isloading && (
                      <div className="text-center">
                        <Spinner animation="grow" variant="info" />
                      </div>
                    )}
                    {user?.map((data, i) => (
                      <div className="useri1222 ui1222 newui2222" onClick={() => openRecommendationModal(data)}>
                        <div className="sjsso avatar-avatar">
                          <img
                            src={userimg}
                            className="userimg"
                            alt="user avatar"
                          />
                        </div>
                        <div className="sjsso1 space-left">
                          <div>
                            <span className="username11 name-name">
                              {data.user_name}
                            </span>
                            <span className="useremail11">{data?.email}</span>
                          </div>
                          <div className="messagedetails">
                            {data.description}
                          </div>
                        </div>
                        <div className="tymeline sjsso2 date-date">
                          {data.date}
                        </div>
                      </div>
                    ))}
                    {user.length === 0 && !isloading && (
                      <div className="norec newnorec">
                        <img
                          src={noplan}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont">
                          You have not made any recommendations
                        </div>
                      </div>
                    )}
                    <div className="next_page">
                      {user.length && (
                        <div>
                          Displaying <span className="page_num">{count}</span>{" "}
                          out of <span className="page_num">{total_pages}</span>
                        </div>
                      )}
                      <div>
                        {prevLink && (
                          <img
                            onClick={loadPrevData}
                            className="page_change"
                            src={prevpage}
                            alt="previous page"
                          />
                        )}

                        {nextLink && (
                          <img
                            onClick={loadNewData}
                            className="page_change"
                            src={nextpage}
                            alt="next page"
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={modal} onHide={closeRecommendationModal} className="recommendation-modal" centered>
        <img className="recomm-btn" src={close} onClick={closeRecommendationModal} alt={close} />
        <Modal.Header className="recomm-ttl">
          Recommendations for {modalData.user_name}, {" "} {modalData.date}
        </Modal.Header>
        <Modal.Body className="recomm-txt">
          {modalData.description}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CouncellorRecommendationsToAll;
