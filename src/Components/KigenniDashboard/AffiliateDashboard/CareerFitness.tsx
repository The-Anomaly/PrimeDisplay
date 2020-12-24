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
          console.log(res.data.competence);
          if (res.status === 200) {
            console.log(res);
            setState({
              ...state,
              user: [...res.data.competence.data],
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
      <Row>
        <Col md={4}>
          <PieChart
            data={[
              {
                title: "Rent to own ",
                value:15,
                color: "#F7D154",
              },
              {
                title: "Bought ",
                value: 20,
                color: "#EC4C47",
              },
              {
                title: `Rent`,
                value:0,
                color: "#2B7DC0",
              },
              {
                title: `Rent`,
                value:0,
                color: "#2B7DC0",
              },
              {
                title: "Not Available",
                value: 0,
                color: "#47B881",
              },
            ]}
            lineWidth={30}
          />
        </Col>
      </Row>
    </>
  );
};
export default CareerFitnessPiechart;
