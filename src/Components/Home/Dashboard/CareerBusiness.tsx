import * as React from "react";
import Container from "react-bootstrap/Container";
import Footer from "../HomeComponents/footer";
import Col from "react-bootstrap/Col";
import "./Results/dashboard.css";
import { useState, useEffect } from "react";
import "../../Home/Home/animate.css";
import axios from "axios";
import { API } from "../../../config";
import Sidebar from "./Results/SideBar";
import { MainBody } from "./Results//MainBody";
import { dashboardContext } from "../../../createContext";
import Navbar from "../HomeComponents/navbar";

interface IAppProps {}
export interface DashboardState {
  sideBarIsOpen?: Boolean;
  token?: string;
  result?: string;
  title?: string;
}

const Careerbusiness: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, updateState] = useState<DashboardState>({
    sideBarIsOpen: false,
    token: "",
    result: "",
    title: "Personality Type",
  });
  const { sideBarIsOpen, result } = state;
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    axios
      .get(`${API}/freedashboard`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          updateState({
            ...state,
            result: response.data[0].career_fitness,
            token: token,
          });
        }
      })
      .catch((error) => {
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Container fluid={true}>
        <Col md={10} className="shiftcent">
          <div className="dashboardwrap">
            <dashboardContext.Provider value={{ ...state, updateState }}>
              <Sidebar career_fitness={true} />
              <MainBody className={!sideBarIsOpen?"arrow1 arrowflip":"arrow1"} result={result} />
            </dashboardContext.Provider>
          </div>
          <div></div>
        </Col>
        <Footer />
      </Container>
    </React.Fragment>
  );
};

export default Careerbusiness;
