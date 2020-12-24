import * as React from "react";
import "../kegennidashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../CouncellorDasboard/councellor.css";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBarAffilliateDashboard from "./SideBarAffiliateDashboard";
import "./affiliate.css";
import BarChart from "react-bar-chart";
import Chart from "react-google-charts";
import { PieChart } from "react-minimal-pie-chart";

const CareerFitnessPiechart = (props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: [],
    width: "",
  });

  const { user, nextSessionMessage, width, memberInfo }: any = state;
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
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}${props.endpoint}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res.data);
          if (res.status === 200) {
            console.log(res);
            setState({
              ...state,
              user: [...res.data.career_fitness.data],
            });
          }
        })
      )
      .catch((error) => {
        console.log(error);
        if (error && error.response && error.response.data) {
        }
      });
  }, []);

  const data = [
    { text: "Man", value: 500 },
    { text: "Woman", value: 300 },
  ];
  const notify = (message: string) => toast(message, { containerId: "B" });
  console.log(user.length);
  return (
    <>
      <Row className="cllcc">
        <Col md={4}>
          <PieChart
            data={[
              {
                title: "AWARENESS ",
                value: user[0]?.AWARENESS,
                color: "#F44E4E",
              },
              {
                title: "CREATIVITY ",
                value: user[1]?.CREATING,
                color: "#1BB978",
              },
              {
                title: `EXPLORING`,
                value: user[2]?.EXPLORING,
                color: "#FFBC41",
              },
              {
                title: `MAINTENANCE`,
                value: user[3]?.MAINTENANCE,
                color: "#3965FF",
              },
            ]}
            lineWidth={30}
          />
        </Col>
        <Col md={4}>
          <div className="corrred">
            <span className="grrenn"></span> AWARENESS
          </div>
          <div className="corrred">
            <span className="grrenn" style={{ background: "#F44E4E" }}></span>{" "}
            CREATIVITY
          </div>
          <div className="corrred">
            <span className="grrenn" style={{ background: "#FFBC41" }}></span>{" "}
            EXPLORING
          </div>
          <div className="corrred">
            <span className="grrenn" style={{ background: "#3965FF" }}></span>{" "}
            MAINTENANCE
          </div>
        </Col>
      </Row>
    </>
  );
};
export default CareerFitnessPiechart;
