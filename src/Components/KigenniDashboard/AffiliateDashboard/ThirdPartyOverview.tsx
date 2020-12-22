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

const moment = require("moment");

const ThirdPartyOverview = (props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: "",
    isLoading: "",
    clarityLink: "98282211298",
    hascopiedLink: false,
  });
  const {
    user,
    nextSessionMessage,
    errorMessage,
    isLoading,
    clarityLink,
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
  // React.useEffect(() => {
  //   const availableToken = localStorage.getItem("userToken");
  //   const token = availableToken
  //     ? JSON.parse(availableToken)
  //     : props.history.push("/counsellor/signin");
  //   const data = {};
  //   Axios.all([
  //     Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/overview`, {
  //       headers: { Authorization: `Token ${token}` },
  //     }),
  //   ])
  //     .then(
  //       Axios.spread((res) => {
  //         console.log(res);
  //         if (res.status === 200) {

  //         }
  //       })
  //     )
  //     .catch((error) => {
  //       if (error && error.response && error.response.data) {

  //       }
  //     });
  // }, []);

  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarAffilliateDashboard ov={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <Row>
              <Col md={12} className="firstqq firstAF genbg">
                <Row>
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
                      <span className="weellc"> Welcome Abayomi Johnson</span>
                    </div>
                    <div className="facce">
                      Volutpat purus orci ipsum quis faucibus sed elit elit
                      gravida. Sodales facilisis sed nulla lobortis in convallis
                      pellentesque urna faucibus.
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
                          <span className="totolta">70</span>
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
                          <span className="totolta poill">50</span>
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
                          <span className="totolta greenstar1">22</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="afcard">
                      <div className="currt"></div>
                      <div className="adadaa">
                        <div className="textcaas">
                          <img
                            src={tempavatar}
                            alt="userimage"
                            className="userimage122"
                          />
                        </div>
                        <div className="abjon"> Abayomi Johnson</div>
                        <div className="afflt">Affiliate</div>
                        <div className="sepr3"></div>
                        <div className="afflt afflt1">
                          Total Earnings{" "}
                          <img
                            src={emojione}
                            className="moneyIcon1"
                            alt="moneyIcon"
                          />{" "}
                        </div>
                        <div className="amnntt">N80,000.00</div>
                        <div className="reflink2">Referal Link</div>
                        <div className="sette">
                          <span className="clatxt">
                            https://clarity.com?refer:112324/d/1kX_cq...
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
                  <Col md={12}>
                    <Tabs
                      defaultActiveKey="TotalClients"
                      id="uncontrolled-tab-exa2"
                    >
                      <Tab
                        eventKey="TotalClients"
                        className="ttebe"
                        title="Total Clients"
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
                                List of all Clients registered with your
                                Affiliate link
                              </span>
                            </div>
                            <tr>
                              <td>Mark</td>
                              <td>2/3/2020</td>
                              <td>
                                <img
                                  src={more_vertical}
                                  alt="more_vertical"
                                  className="more_vertical"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Jacob</td>
                              <td>2/3/2020</td>
                              <td>
                                <img
                                  src={more_vertical}
                                  alt="more_vertical"
                                  className="more_vertical"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab
                        eventKey="OnFreePlan"
                        className="ttebe"
                        title="On Free Plan"
                      >
                        <div>Should be active</div>
                      </Tab>
                      <Tab
                        eventKey="contact"
                        className="ttebe"
                        title="On Paid Subscription"
                      >
                        <div>Should be active</div>
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
