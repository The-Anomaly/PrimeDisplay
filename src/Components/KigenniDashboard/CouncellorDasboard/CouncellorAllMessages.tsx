import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";

const CounsellorAllMessages = withRouter((props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: [],
    counsellorData: [],
    isLoading: false,
  });
  const { errorMessage, user, counsellorData } = state;
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/get-chats`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              counsellorData: [...res.data.results].reverse(),
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
  console.log(user);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav messages={true} />
        <Row>
          <SideBarCounsellorDashboard messages={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Messages" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  searcharea={true}
                  welcomeText="Summary of all messages to and from members assigned to you"
                />
                <Row>
                  <Col md={12} className="mssaag sasag">
                    {counsellorData?.map((data, i) => (
                      <>
                        <Link
                          to={`/counsellormessagehistory/israel.hilary7@yahoo.com`}
                        >
                          <div className="useri1222 ui1222 ssgs">
                            <div className="msg1">
                              <img
                                src={userimg}
                                className="userimg imguserrr"
                                alt="jayeolajones"
                              />
                            </div>
                            <div className="msg2">
                              <div>
                                <span className="username11">
                                  {data.user}
                                </span>
                                <span className="useremail11">
                                  {data?.email}
                                </span>
                              </div>
                              <div className="messagedetails nufont">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Id mi, mattis at ipsum
                                ullamcorper blandit pharetra. Est elit, morbi
                                elementum faucibus nec morbi eget aliquet
                                adipiscing. Sapien urna volutpat mattis cursus
                                non et mauris tellus laoreet. Metus potenti leo
                                nulla nulla pretium id.
                              </div>
                            </div>
                            <div className="tymeline msg3 nufont">
                              6 days Ago
                            </div>
                          </div>
                        </Link>
                      </>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
});
export default CounsellorAllMessages;
