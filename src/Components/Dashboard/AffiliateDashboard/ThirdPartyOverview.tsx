import * as React from "react";
import "../kegennidashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../CouncellorDasboard/councellor.css";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import noData from "../../../assets/no recommendations.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import preloader from "../../../assets/preloader2.gif";
import SideBarAffilliateDashboard from "./SideBarAffiliateDashboard";
import searchImage from "../../../assets/search11.png";
import "./affiliate.css";
import tempavatar from "../../../assets/tempavatar.png";
import emojione from "../../../assets/emojione.png";
import copy from "../../../assets/copy.png";
import waving from "../../../assets/waving.png";
import totalclients from "../../../assets/tttr.png";
import redbadge from "../../../assets/redbadge.png";
import greenstar from "../../../assets/greenstar.png";
import more_vertical from "../../../assets/more_vertical.png";
import { Tab, Table, Tabs } from "react-bootstrap";
import avatar from "../../../assets/avatar.svg";
import SmallScreenNavbarAffiliates from "../CouncellorDasboard/SmallScreenNavbarAffiliates";
const moment = require("moment");

const ThirdPartyOverview = (props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: "",
    isLoading: "",
    clarityLink: "https://clarity.yudimy.com/?referral",
    hascopiedLink: false,
    memberInfo: [],
    next: "",
    previous: "",
    free_members: [],
    paid_members: [],
    total_pages: "",
    page: "",
    overview: {},
  });
  const {
    user,
    nextSessionMessage,
    paid_members,
    free_members,
    isLoading,
    hascopiedLink,
    clarityLink,
    overview,
    memberInfo,
  }: any = state;
  const changeCopiedState = () => {
    setState({
      ...state,
      hascopiedLink: true,
    });
    setTimeout(() => {
      setState({
        ...state,
        hascopiedLink: false,
      });
    }, 3000);
  };
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/affiliates/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/affiliate/members/`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/affiliate/free-members/`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/affiliate/info/`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/affiliate/paid-members/`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1, res2, res3, res4) => {
          // console.log(res.data.results[0]);
          // console.log(res.data.results);
          if (res.status === 200) {
            // console.log(res);
            setState({
              ...state,
              overview: res2.data,
              memberInfo: [...res.data.results],
              clarityLink: `https://clarity.yudimy.com/signup?referral=${res2.data.aff_name}`,
              paid_members: [...res3.data.results],
              free_members: [...res1.data.results],
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
        }
      });
  }, []);

  const formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  // console.log(paid_members);
  return (
    <>
      <Container fluid={true} className="contann122">
        <SmallScreenNavbarAffiliates />
        <Row>
          <SideBarAffilliateDashboard ov={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <Row>
              <Col md={12} className="firstqq firstAF genbg">
                <Row className="revcolo1">
                  <Col md={7}>
                    <form className="dxxa">
                      <span className="sassa">
                        <img
                          src={searchImage}
                          alt="search"
                          className="searchImage"
                        />
                      </span>
                      <input
                        type="search"
                        placeholder="Search"
                        className="dshbdsearchbar form-control BAsearchbar"
                      />
                    </form>
                    <div className="username23">
                      <img src={waving} className="waving" alt="waving" />{" "}
                      <span className="weellc">
                        {" "}
                        Welcome {overview?.info?.name}
                      </span>
                    </div>
                    <div className="facce">
                      Your dashboard gives you full insight to every client who
                      signed using your unique link
                    </div>
                    <div className="ttotlaclnt">
                      <div className="boxxqq12">
                        <div className="totoltb">Total Clients</div>
                        <div className="totoltc">
                          <img
                            src={totalclients}
                            className="total_Clients"
                            alt="total_Clients"
                          />
                          <span className="totolta">
                            {overview?.all_members}
                          </span>
                        </div>
                      </div>
                      <div className="boxxqq12">
                        <div className="totoltb">On Free Plan</div>
                        <div className="totoltc">
                          <img
                            src={redbadge}
                            className="total_Clients"
                            alt="total_Clients"
                          />
                          <span className="totolta poill">
                            {overview?.total_free}
                          </span>
                        </div>
                      </div>
                      <div className="boxxqq12">
                        <div className="totoltb">Paid Subscribers</div>
                        <div className="totoltc">
                          <img
                            src={greenstar}
                            className="total_Clients"
                            alt="total_Clients"
                          />
                          <span className="totolta greenstar1">
                            {overview?.total_paid}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="afcard">
                      <div className="currt"></div>
                      <div className="adadaa">
                        <div className="textcaas">
                          {/* {overview?.photo && ( */}
                          <img
                            src={
                              overview && overview.photo
                                ? overview.photo
                                : avatar
                            }
                            alt="userimage"
                            className="userimage122"
                          />
                          {/* )} */}
                        </div>
                        <div className="abjon"> {overview?.info?.name}</div>
                        <div className="afflt">
                          Affiliate-{overview?.aff_name}
                        </div>
                        <div className="sepr3"></div>
                        <div className="afflt afflt1">
                          Total Earnings{" "}
                          <img
                            src={emojione}
                            className="moneyIcon1"
                            alt="moneyIcon"
                          />{" "}
                        </div>
                        <div className="amnntt">N{overview?.bonus}</div>
                        <div className="reflink2">Referral Link</div>
                        <div className="sette">
                          <span className="clatxt">
                            <a href={clarityLink} target="blank">
                              https://clarity.com?refer:112324/d/1kX_cq...
                            </a>
                          </span>
                          <span className="clatxt2">
                            <img
                              src={copy}
                              alt="copy"
                              onClick={() => {
                                navigator.clipboard.writeText(clarityLink);
                                changeCopiedState();
                              }}
                              className="copy12"
                            />
                            {hascopiedLink ? "Copied!" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="textxlef">
                      {" "}
                      <span>View full list</span>
                    </div>
                  </Col>
                </Row> */}
                <Row>
                  <Col md={12} className="spec22 spec222e">
                    <Tabs
                      defaultActiveKey="TotalClients"
                      id="uncontrolled-tab-exa2"
                      className="ttebe"
                    >
                      <Tab eventKey="TotalClients" title="Total Clients">
                        <Table>
                          <thead>
                            <tr className="table-striped">
                              <th className="widd12">Name</th>
                              <th className="widd12">Date Registered</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <div className="lisst">
                              <span className="lisst">
                                List of all Clients registered with your
                                Affiliate link
                              </span>
                            </div>
                            {memberInfo.map((data, index) => (
                              <tr key={index}>
                                <td>{data?.member?.name}</td>
                                <td>{formatTime(data?.member?.date_joined)}</td>
                                <td>
                                  <img
                                    src={more_vertical}
                                    alt="more_vertical"
                                    className="more_vertical"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab
                        eventKey="OnFreePlan"
                        className="ttebe ttb22"
                        title="On Free Plan"
                      >
                        <Table>
                          <thead>
                            <tr className="table-striped">
                              <th className="widd12">Name</th>
                              <th className="widd12">Date Registered</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <div className="lisst">
                              <span className="lisst">
                                Members on free plan
                              </span>
                            </div>
                            {free_members.map((data, index) => (
                              <tr key={index}>
                                <td>{data?.member?.name}</td>
                                <td>{formatTime(data?.member?.date_joined)}</td>
                                <td>
                                  <img
                                    src={more_vertical}
                                    alt="more_vertical"
                                    className="more_vertical"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab
                        eventKey="contact"
                        className="ttebe ttb21"
                        title="On Paid Subscription"
                      >
                        <Table>
                          <thead>
                            <tr className="table-striped">
                              <th className="widd12">Name</th>
                              <th className="widd12">Date Registered</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <div className="lisst">
                              <span className="lisst">
                                Members on paid plan
                              </span>
                            </div>
                            {paid_members.map((data, index) => (
                              <tr key={index}>
                                <td>{data?.member?.name}</td>
                                <td>{formatTime(data?.member?.date_joined)}</td>
                                <td>
                                  <img
                                    src={more_vertical}
                                    alt="more_vertical"
                                    className="more_vertical"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ThirdPartyOverview;
