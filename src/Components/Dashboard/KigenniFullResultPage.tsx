import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Navbar from "../Home/HomeComponents/navbar";
import Footer from "../Home/HomeComponents/footer";
import firstlogo from "../../assets/image 1.png";
import firstChart from "../../assets/Rectangle 37.png";
import secondlogo from "../../assets/image 2.png";
import vector from "../../assets/Vector.png";
import vector1 from "../../assets/Vector1.png";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import vector5 from "../../assets/Vector5.png";
import vector6 from "../../assets/Vector6.png";
import vector7 from "../../assets/Vector7.png";
import KigenniPartResult from './KigenniPartResult';
import KigenniRemainingResult from './KigenniPartResultContinue';


interface State {
  fullname: string;
  email: string;
  phonenumber: string;
  successMsg: boolean;
  errorMessage: string;
  isLoading: boolean;
}
const KigenniFullResultPage: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = React.useState<State>({
    fullname: "",
    email: "",
    phonenumber: "",
    errorMessage: "",
    successMsg: false,
    isLoading: false,
  });
  const {
    fullname,
    email,
    phonenumber,
    errorMessage,
    successMsg,
    isLoading,
  } = state;

  const sendFormData = (e) => {
    e.preventDefault();
    setFormState({ ...state, isLoading: true });
    const data = {};
    axios
      .post<any, AxiosResponse<any>>(`${API}/accounts/signup/`, data)
      .then((response) => {
        if (response.status === 200) {
          setFormState({
            ...state,
            successMsg: true,
            isLoading: false,
          });
          setInterval(props.history.push("/signin"), 5000);
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
          errorMessage: "Signup failed",
          isLoading: false,
        });
      });
  };

  const changeActionOnFormData = (e: any) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMsg: false,
    });
  };

  return (
    <>
      <Navbar />
      <Container fluid={true}>
        <Row className="kli6 bcbv">
          <KigenniRemainingResult/>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default KigenniFullResultPage;
