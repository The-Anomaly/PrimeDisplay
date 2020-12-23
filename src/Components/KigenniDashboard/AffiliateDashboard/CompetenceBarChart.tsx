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

const CompetenceBarChart = (props: any) => {
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

  const notify = (message: string) => toast(message, { containerId: "B" });
  console.log(paid_members);
  return (
    <>
      <Row>
        <Col>
          <Chart
            width={"100%"}
            height={"500px"}
            chartType="Bar"

            loader={<div>Loading Chart</div>}
            data={[
              ["SKILL", "VALUE"],
              ["ADMIN", 200],
              ["AGILE", 250],
              ["ANALYTICAL", 300],
              ["COUNSELLING", 350],
              ["CREATIVE", 350],
              ["ELOQUENCE", 350],
              ["LEADERSHIP AND MANAGEMENT", 350],
              ["PERSUATION", 350], 
              ["SCIENCE AND RESEARCH", 350],
              ["TECHNOLOGY APPRECIATION", 350],
              ["TECHNICAL & MECHANICAL", 350],
            ]}
            options={{
              // Material design options
              chart: {
                minSpacing: 20,
                annotations: {
                  textStyle: {
                    fontName: 'inherit',
                    fontSize: 12,
                    bold: true,
                    italic: true,
                    // The color of the text.
                    color: "rgba(115, 136, 169, 0.353283)",
                    // The color of the text outline.
                    auraColor: '#d799ae',
                    // The transparency of the text.
                    opacity: 0.8
                  }
                }
              },
              colors: ["rgba(115, 136, 169, 0.353283)","rgba(115, 136, 169, 0.353283)","#2E6AF0"],
              hAxis: {
                title: "Total Population",
                minValue: 0,
              },
              fontSize: 12,
              vAxis: {
                title: "City",
              },
            }}
            // For tests
            rootProps={{ "data-testid": "2" }}
          />
        </Col>
      </Row>
    </>
  );
};
export default CompetenceBarChart;
