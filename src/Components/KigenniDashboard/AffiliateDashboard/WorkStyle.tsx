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

const WorkStyle = (props: any) => {
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
          console.log(res);
          if (res.status === 200) {
            console.log(res);
            setState({
              ...state,
              user: [...res.data.work_style.data],
            });
          }
        })
      )
      .catch((error) => {
        console.log(error);
        if (error && error.response && error.response.data) {
        }
      });
  }, [props.endpoint]);

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
         {user.length > 0 && <PieChart
            data={[
              {
                title:user[0].name,
                value: user[0].value,
                color: "#F44E4E",
              },
              {
                title: user[1].name,
                value: user[1].value,
                color: "#1BB978",
              },
              {
                title: user[2].name,
                value: user[2].value,
                color: "#FFBC41",
              },
              {
                title:  user[3].name,
                value: user[3].value,
                color: "#3965FF",
              },
            ]}
            lineWidth={30}
          /> }
        </Col>
        <Col md={4}>
          <div className="corrred">
            <span className="grrenn"></span> Prioritizing
          </div>
          <div className="corrred">
            <span className="grrenn" style={{ background: "#F44E4E" }}></span>{" "}
            Visualizing
          </div>
          <div className="corrred">
            <span className="grrenn" style={{ background: "#FFBC41" }}></span>{" "}
            Coordinating
          </div>
          <div className="corrred">
            <span className="grrenn" style={{ background: "#3965FF" }}></span>{" "}
            Planning
          </div>
        </Col>
      </Row>
    </>
  );
};
export default WorkStyle;
