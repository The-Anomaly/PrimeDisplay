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
import { Link } from "react-router-dom";
import Footer from "../Home/HomeComponents/footer";

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
  const payWithMonnify = (reference) => {
    const availableUser = sessionStorage.getItem("user");
    var user = availableUser
      ? JSON.parse(availableUser)
      : props.history.push("/signin");
    try {
      window.MonnifySDK.initialize({
        amount: 1000,
        currency: "NGN",
        reference,
        customerFullName: user[0]?.first_name + "  " + user[0]?.last_name,
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "",
        apiKey: "MK_PROD_NNSGXTY6LF",
        contractCode: "722431733218",
        paymentDescription: "YUDIMY SERVICES LTD",
        isTestMode: false,
        redirect: false,
        onComplete: function (response) {
          moveToFullResult();
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
              (window.location.pathname = "/dashboard/fullresult"),
              9000
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
    props.history.push("/dashboard/fullresult");
  };
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="kli6 bcbv">
          <Col md={8}>
            <div className="payheader">
              Get your Clarity Counselor's review on your competencies,
              strengths, weaknesses and career match.
            </div>
          </Col>
          <Col md={9}>
            <Row className="centerr">
              <Col xs={10} md={4} className="centerr1">
                <div className="prems"> Counselor's Review</div>
                <div className="premq">
                  You'll be getting the counselor's insights on:
                </div>
                <div className="comps2"><span>&#10004;</span> Your Strengths</div>
                <div className="comps2"><span>&#10004;</span> Your Weaknesses</div>
                <div className="comps2"><span>&#10004;</span> Your Strong Career Competencies </div>
                <div className="comps2">
                <span>&#10004;</span> Your Weak & Average Career Competencies
                </div>
                <div className="comps2"><span>&#10004;</span> Work Style</div>
                <div className="comps2"><span>&#10004;</span> The Best Roles To Apply for</div>
                <div className="lmi1">
                  <div className="amut">&#8358;1,000</div>
                  <div className="amut1">one time payment</div>
                </div>
                <div>
                  <span className="amurt">&#8358;10,000</span>{" "}
                  <span className="percentoff">90%</span>{" "}
                </div>
                <div
                  className="slcplan"
                  onClick={() => checkIfUserHasAccessToViewAll()}
                >
                  {!isLoading ? "Select Plan" : "processing..."}
                </div>
              </Col>
              <Col xs={10} md={4} className="centerr2">
                <div className="prems">Starter</div>
                <div className="premq1">
                  Get access to your first three sections of your assessment
                  results
                </div>
                <div className="comps2">
                  <span>&#10004; </span> Career Profile
                </div>
                <div className="comps2">
                  <span>&#10004; </span> Career Fitness Score
                </div>
                <div className="comps2">
                  <span>&#10004; </span> Career Personality Type
                </div>
                <div className="lmi2">
                  <div className="amut">FREE</div>
                </div>
                <div className="slcplan1">
                  <Link to="/free/dashboard">Select Plan</Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}
