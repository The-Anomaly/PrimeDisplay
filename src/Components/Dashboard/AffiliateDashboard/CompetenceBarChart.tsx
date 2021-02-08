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

const CompetenceBarChart = (props: any) => {
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
      : window.location.assign("/affiliates/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}${props.endpoint}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(res.data.competence);
          if (res.status === 200) {
            // console.log(res);
            if (res.data.competence) {
              setState({
                ...state,
                user: [...res.data.competence.data],
              });
              return;
            }
            if (res.status === 200 && res.data.work_function) {
              setState({
                ...state,
                user: [...res.data.work_function.data],
              });
              return;
            }

            if (res.data.career_motivator) {
              setState({
                ...state,
                user: [...res.data.career_motivator.data],
              });
              return;
            }
          }
        })
      )
      .catch((error) => {
        // console.log(error);
        if (error && error.response && error.response.data) {
        }
      });
  }, []);

  const data = [
    { text: "Man", value: 500 },
    { text: "Woman", value: 300 },
  ];
  const notify = (message: string) => toast(message, { containerId: "B" });
  // console.log(user);
  return (
    <>
      <Row>
        <Col>
          {/* <div>
            <div style={{ width: "100%" }}>
              <BarChart
                className="newbars"
                ylabel="Quantity"
                width={100}
                height={500}
                data={data}
              />
            </div>
          </div> */}
          {user && user.length > 0 ? (
            <Chart
              width={"100%"}
              height={"600px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Skills", "Score"],
                [user[0].name, user[0].value],
                [user[1].name, user[1].value],
                [user[2].name, user[2].value],
                [user[3].name, user[3].value],
                [user[4].name, user[4].value],
                [user[5].name, user[5].value],
                [user[6]?.name, user[6]?.value],
                [user[7]?.name, user[7]?.value],
                [user[8]?.name, user[8]?.value],
                [user[9]?.name, user[9]?.value],
                [user[10]?.name, user[10]?.value],
              ]}
              options={{
                // Material design options
                chart: {
                  width: 600,
                  height: 400,
                  minSpacing: 40,
                  annotations: {
                    textStyle: {
                      fontName: "inherit",
                      fontSize: 12,
                      bold: true,
                      italic: true,
                      // The color of the text.
                      color: "#2E6AF0",
                      // The color of the text outline.
                      auraColor: "#d799ae",
                      // The transparency of the text.
                      opacity: 0.8,
                    },
                  },
                },
                colors: ["#2E6AF0", "#2E6AF0", "#2E6AF0"],
                hAxis: {
                  title: "Score",
                  minValue: 0,
                },
                fontSize: 12,
                vAxis: {
                  title: "Skills",
                },
              }}
              // For tests
              rootProps={{ "data-testid": "1" }}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};
export default CompetenceBarChart;
