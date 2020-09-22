import * as React from "react";
import Navbar from "../Home/HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import axios from "axios";
import { AxiosResponse } from "axios";
import { API } from "../../config";
import { toast } from "react-toastify";
import Footer from "../Home/HomeComponents/footer";
import checkcircle from "../../assets/checkcircle.png";

interface State {
  successMsg: boolean;
  errorMessage: string;
  user: any;
  userInfos: any;
  isLoading: boolean;
}

declare global {
  interface Window {
    MonnifySDK: any;
  }
}

export default function PaymentSummary(props: any) {
  const [state, setFormState] = React.useState<State>({
    errorMessage: "",
    user: "",
    userInfos: [],
    successMsg: false,
    isLoading: false,
  });
  const { errorMessage, successMsg, userInfos, isLoading } = state;
  React.useEffect(() => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {};
    axios
      .get<any, AxiosResponse<any>>(`${API}/freedashboard`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setFormState({
            ...state,
            successMsg: true,
            isLoading: false,
          });
          // setInterval(props.history.push("/signin"), 5000);
        }
      })
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
  }, []);
  const payWithMonnify = (reference, selectedplan: string, cost) => {
    const availableUser = sessionStorage.getItem("user");
    var user = availableUser
      ? JSON.parse(availableUser)
      : props.history.push("/signin");
    try {
      window.MonnifySDK.initialize({
        amount: cost,
        currency: "NGN",
        reference,
        customerFullName: user[0]?.first_name + "  " + user[0]?.last_name,
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "",
        apiKey: "MK_PROD_NNSGXTY6LF",
        contractCode: "722431733218",
        paymentDescription: selectedplan,
        isTestMode: false,
        redirect: false,
        onComplete: function (response) {
          if (response.paymentStatus === "OVERPAID") {
            notify(
              "You current payment has exceeded the amount. The excess amount will be refunded within 24 hours"
            );
            return setInterval(
              (window.location.pathname = "/thirdparty/overpaid"),
              3000
            );
          }
          if (response.paymentStatus === "PAID") {
            return setInterval(
              (window.location.pathname = "/thirdpary/fullresult"),
              1000
            );
          }
          if (response.paymentStatus == "PENDING") {
            notify("Payment Pending");
            return setInterval(
              (window.location.pathname = "/thirdparty/pending"),
              9000
            );
          }
        },  
        onClose: function (data) {
          return setInterval(
            (window.location.pathname = "/thirdpary/dashboard"),
            9000
          );
        },
      });
    } catch (error) {
    }
  };

  const requestForPayref = (selectedplan, cost) => {
    setFormState({
      ...state,
      isLoading: true,
    });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    axios
      .get(`${API}/monnifypaymentreference`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setFormState({
          ...state,
          user: response?.data[0]?.payment_reference,
          isLoading: false,
        });
        setTimeout(() => {
          payWithMonnify(
            response?.data[0]?.payment_reference,
            selectedplan,
            cost
          );
        }, 1000);
      })
      .catch((error) => {
        setFormState({
          ...state,
          isLoading: false,
        });
      });
  };
  const notify = (message: string) => {
    toast(message, { containerId: "B" });
    setTimeout(() => {
      props.history.push("");
    }, 3000);
  };
  const checkIfUserHasAccessToViewAll = (
    selectedplan: string,
    cost: number
  ) => {
    requestForPayref(selectedplan, cost);
  };
  const moveToFullResult = () => {
    props.history.push("/thirdpary/fullresult");
  };
  return (
    <div>
      <Container fluid={true}>
        <Row className="kli6 bcbv">
          <Col md={8}>
            <div className="payheader">
              Choose the plan that’s right for you
            </div>
          </Col>
          <Col md={12}>
            <Row className="centerr">
              <Col xs={10} md={3} className="centerr1">
                <div className="planinsight">Insight Plan</div>
                <div className="oneoff">(One-off Plan)</div>
                <div className="percentoff">
                  Now <b>&nbsp; 65%&nbsp;</b> OFF!
                </div>{" "}
                <div className="duration"></div>
                <div className="prems">
                  {" "}
                  An all-round competence audit report on
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  The Most suitable career and business industry match
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  The best job roles to work in
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Strong career competencies{" "}
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Average Career competencies
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Weak Career competencies
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Work style
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Top Career drivers’ & how to harness it
                </div>
                <div className="lmi1">
                  <div className="amut">&#8358;3,500</div>
                  <div className="amut1">one time payment</div>
                </div>
                <div>
                  {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                </div>
                <div
                  className="slcplan"
                  onClick={() =>
                    checkIfUserHasAccessToViewAll("Insight Plan", 3500)
                  }
                >
                  {!isLoading ? "Select Plan" : "processing..."}
                </div>
              </Col>
              <Col xs={10} md={3} className="centerpurple">
                <div className="planinsight">Growth Plan</div>
                <div className="oneoff">(Quaterly)</div>
                <div className="percentoffpurple">
                  Now <b>&nbsp; 50%&nbsp;</b> OFF!
                </div>{" "}
                <div className="duration"></div>
                <div className="prems">
                  {" "}
                  A comprehensive personality and competence audit report and 4
                  personal career readiness sessions with a career counsellor to
                  better understand to your
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  The Most suitable career and business industry match
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  The best job roles to work in
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Strong career competencies{" "}
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Average Career competencies
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Weak Career competencies
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Work style
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Top Career drivers’ & how to harness it
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  <div className="seadc">
                    40 minutes personal session with a career counsellor to
                    define clear career road map, job search or business
                    strategy
                  </div>
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Unlimited access to Counselling support to ask career related
                  questions and get expert advice on demand (from CV to
                  interview preparation, LinkedIn positioning, etc for your
                  career-industry track.
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Get curated job recommendations and opportunities most
                  suitable for you
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Top Career drivers’ & how to harness it
                </div>
                <div className="lmi1">
                  <div className="amut">&#8358;50,000</div>
                  <div className="amut1">Quaterly Payment</div>
                </div>
                <div>
                  {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                </div>
                <div
                  className="slcplan"
                  onClick={() =>
                    checkIfUserHasAccessToViewAll("Growth Plan", 50000)
                  }
                >
                  {!isLoading ? "Select Plan" : "processing..."}
                </div>
              </Col>
              <Col xs={10} md={3} className="centerblue">
                <div className="planinsight">Direction Plan</div>
                <div className="oneoff">(One-off Plan)</div>
                <div className="percentoffblue">
                  Now <b>&nbsp; 60%&nbsp;</b> OFF!
                </div>{" "}
                <div className="duration"></div>
                <div className="prems">
                  {" "}
                  An all-round personality and competence audit report
                  <div>+ </div>
                  40 minutes private counselling session.
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  The Most suitable career and business industry match
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  The best job roles to work in
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Strong career competencies{" "}
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Average Career competencies
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Weak Career competencies
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Work style
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Top Career drivers’ & how to harness it
                </div>
                <div className="lmi1">
                  <div className="amut">&#8358;10,500</div>
                  <div className="amut1">one time payment</div>
                </div>
                <div>
                  {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                </div>
                <div
                  className="slcplan"
                  onClick={() =>
                    checkIfUserHasAccessToViewAll("Direction Plan", 10500)
                  }
                >
                  {!isLoading ? "Select Plan" : "processing..."}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
