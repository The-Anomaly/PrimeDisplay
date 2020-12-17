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
const moment = require("moment");


const ThirdPartyOverview = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    isLoading: ""
  });
  const {
    user,
    nextSessionMessage,
    errorMessage,
    isLoading,
  }: any = state;

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
          <SideBarAffilliateDashboard />
          <Col md={10} sm={12} className="prm newprm1">
            <Row>
              <Col md={12} className="firstqq firstAF genbg">
                <Row>
                  <Col md={8}>
                    <form className="dxxa">
                      <span className="sassa"><img src={searchImage} alt="search" className="searchImage" /></span>
                      <input type="search" placeholder="Search" className="dshbdsearchbar form-control" />
                    </form>
                  </Col>
                  <Col md={4}>
                    <div className="afcard">
                      <div className="currt"></div>
                      <div className="adadaa">
                        <div className="textcaas"><img src={tempavatar} alt="userimage" className="userimage122" /></div>
                        <div className="abjon"> Abayomi Johnson</div>
                        <div className="afflt">Affiliate</div>
                        <div className="sepr3"></div>
                        <div className="afflt afflt1">Total Earnings <img src={emojione} className="moneyIcon1" alt="moneyIcon" /> </div>
                        <div className="amnntt">
                          N80,000.00
                      </div>
                        <div className="reflink2">
                          Referal Link
                      </div>
                        <div className="sette">
                          <span className="clatxt">https://clarity.com?refer:112324/d/1kX_cq...</span>
                          <span className="clatxt2"><img src={copy} alt="copy" className="copy12" /></span>
                        </div>
                      </div>
                    </div>
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
