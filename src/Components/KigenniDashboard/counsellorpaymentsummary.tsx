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
import checkcircle from "../../assets/checkcircle.png";
import { Link } from "react-router-dom";

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

export default function CouncellorPaymentSummary(props: any) {
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
  const payWithMonnify = (reference) => {
    const availableUser = sessionStorage.getItem("user");
    var user = availableUser
      ? JSON.parse(availableUser)
      : props.history.push("/signin");
    try {
      window.MonnifySDK.initialize({
        amount: 5000,
        currency: "NGN",
        reference,
        customerFullName: user[0]?.first_name + "  " + user[0]?.last_name,
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "",
        apiKey: "MK_PROD_NNSGXTY6LF",
        contractCode: "722431733218",
        paymentDescription: "Book Session",
        isTestMode: false,
        onComplete: function (response) {
          if (response.paymentStatus == "OVERPAID") {
            notify(
              "You current payment has exceeded the amount. The excess amount will be refunded within 24 hours"
            );
            return setInterval(
              (window.location.pathname = "/thirdparty/overpaid"),
              3000
            );
          }
          if (response.paymentStatus === "PAID") {
            // console.log(response)
            return setInterval(
              (window.location.pathname = "/thirdpary/fullresult"),
              9000
            );
          }
          if (response.paymentStatus == "PENDING") {
            notify("Payment Pending");
            return setInterval((window.location.pathname = "/"), 9000);
          }
        },
        onClose: function (data) {
          console.log(data);
        },
      });
    } catch (error) {
      console.log("Failed to initailize payment" + error);
    }
  };

  const requestForPayref = () => {
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
        console.log(response);
        setFormState({
          ...state,
          user: response?.data[0]?.payment_reference,
          isLoading: false,
        });
        setTimeout(() => {
          payWithMonnify(response?.data[0]?.payment_reference);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
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
  const checkIfUserHasAccessToViewAll = () => {
    requestForPayref();
  };
  const moveToFullResult = () => {
    props.history.push("/thirdpary/fullresult");
  };
  return (
    <div>
      <Container fluid={true}>
        <Row className="kli6 bcbv">
          <Col md={12}>
            <div className="payheader">
              Choose the plan that’s right for you
            </div>
            <Row className="centerr">
              <Col xs={10} md={5} className="centerr1 chag11">
                <div className="planinsight">Book Session</div>
                <div className="oneoff">(One-off Plan)</div>
                <div className="percentoff chage">
                  Now <b>&nbsp; 50% &nbsp;</b> OFF!
                </div>{" "}
                <div className="duration"></div>
                <div className="prems">
                  {" "}
                  Book a counselling session with a Counsellor
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Chat with a counsellor for 35mins
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Identify road blocks that can limit you from landing your
                  dream job.{" "}
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Get personalized recommendations on things to do for acing
                  interviews, defining your path and succeeding.
                </div>
                <div className="comps2">
                  <span>
                    <img
                      src={checkcircle}
                      className="checkcircle"
                      alt="checkcircle"
                    />
                  </span>{" "}
                  Get a actionable career strategy.{" "}
                </div>
                <div className="lmi1">
                  <div className="amut">&#8358;5,000</div>
                  <div className="amut1">one time payment</div>
                </div>
                <div>
                  {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                </div>
                <div
                  className="slcplan"
                  onClick={() => checkIfUserHasAccessToViewAll()}
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
