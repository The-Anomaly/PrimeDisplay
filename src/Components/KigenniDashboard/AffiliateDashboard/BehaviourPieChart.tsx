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
import Chart from "react-google-charts";

const moment = require("moment");


const BehaviourPieChart = (props: any) => {
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
      : props.history.push("/counsellor/signin");
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
          console.log(res.data.results[0]);
          console.log(res.data.results);
          if (res.status === 200) {
            console.log(res);
            setState({
              ...state,
              overview: res2.data,
              memberInfo: [...res.data.results],
              clarityLink: `https://clarity.yudimy.com/?referral=${res.data.aff_name}`,
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
  console.log(paid_members);
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          {/* <SideBarAffilliateDashboard /> */}
          <Col md={12}>
            
            <Chart
              width={"90%"}
              height={"500px"}
              
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Year", "Sales", "Expenses", "Profit"],
                ["2014", 1000, 400, 200],
                ["2015", 1170, 460, 250],
                ["2016", 660, 1120, 300],
                ["2017", 1030, 540, 350],
              ]}
              options={{
                // Material design options
                chart: {
                  title: "Competences",
                  subtitle: "Sales, Expenses, and Profit: 2014-2017",
                },
                colors: ['#b0120a', '#ffab91'],
                hAxis: {
                  title: 'Total Population',
                  minValue: 0,
                },
                vAxis: {
                  title: 'City',
                },
              }}
              // For tests
              rootProps={{ "data-testid": "2" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default BehaviourPieChart;
