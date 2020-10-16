import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";

const CouncellorRecommendationsToAll = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: [],
    counsellorData: [],
    isLoading: false,
  });
  const { errorMessage, user, counsellorData } = state;
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/your-recommendations`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/your-recommendations`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              user: [...res.data],
              counsellorData: [...res1.data].reverse(),
            });
          }
        })
      )
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
  console.log(user);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav councrec={true} />
        <Row>
          <SideBarCounsellorDashboard councrec={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Counsellors Recommendation" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  searcharea={true}
                  welcomeText="Get insight to the overview of all your concerns"
                />
                <Row>
                  <Col md={12} className="mssaag">
                    {user?.map((data, i) => (
                      <div className="useri1222 ui1222 ">
                        <div className="sjsso">
                          <img
                            src={userimg}
                            className="userimg"
                            alt="jayeolajones"
                          />
                        </div>
                        <div className="sjsso1">
                          <div>
                            <span className="username11">{data.user_name}</span>
                            <span className="useremail11">{data?.email}</span>
                          </div>
                          <div className="messagedetails">
                            {data.description}
                          </div>
                        </div>
                        <div className="tymeline sjsso2">{data.date}</div>
                      </div>
                    ))}
                    
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CouncellorRecommendationsToAll;
