import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import formemail from "../../../assets/formemail.png";
import { Link, withRouter } from "react-router-dom";
import { useEffect } from "react";

interface State {
  email: string;
  newpassword: string;
  errorMessage: string;
  confirmpassword: string;
  isLoading: boolean;
  kigenni: boolean;
  message: string;
}
const EmailVerification = withRouter((props: any) => {
  const [state, setFormState] = React.useState<State>({
    email: "",
    errorMessage: "",
    isLoading: false,
    kigenni: true,
    newpassword: "",
    confirmpassword: "",
    message: "",
  });
  const {
    newpassword,
    kigenni,
    errorMessage,
    isLoading,
    confirmpassword,
    message,
  } = state;
  const getUserInfo = (token: string): any => {
    axios
      .get(`${API}/currentuser`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response?.data));
        }
        setTimeout(() => {
          props.history.push("/clientchat");
        });
      })
      .catch((error) => {});
  };
  useEffect(() => {
    const token = props.match.params.token;
    const userid = props.match.params.userid;
    setFormState({ ...state, isLoading: true });
    axios
      .get<any, AxiosResponse<any>>(`${API}/activate/${userid}/${token}`)
      .then((response) => {
        if (response.status === 200) {
          setFormState({
            ...state,
            isLoading: false,
            message: response?.data[0]?.message,
          });
          getUserInfo(response?.data[0]?.token);
          if (response?.data[0]?.token) {
            localStorage.setItem(
              "userToken",
              JSON.stringify(response?.data[0]?.token)
            );
          }
          // props.history.push("/assessment/welcome");
        }
      })
      .catch((error) => {
        if (error?.response?.data?.error) {
          return setFormState({
            ...state,
            errorMessage: error.response.data.error,
            isLoading: false,
          });
        }
        if (error && error.response && error.response.data) {
          return setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        if (error && error.response && error.response.status === 400) {
          return setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "Verification failed",
          isLoading: false,
        });
      });
  }, []);
  const changeActionOnFormData = (e: any) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      message: "",
    });
  };
  return (
    <>
      {/* <Navbar/> */}
      <Container fluid={true}>
        <Row className="kli bcbv">
          <Col md={4} className="">
            <div className="kigenni1">clarity</div>
            <div className="kigenni3">
              {" "}
              Take the Clarity Assessment to find direction
            </div>
            <div>
              <Link to="/" className="clscc">
                Not registered ? Sign Up
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className=" mjcn">Email Verification</div>
            {errorMessage && (
              <Alert key={2} variant="danger">
                {errorMessage}
              </Alert>
            )}
            {message && (
              <Alert key={2} variant="info">
                {message}
              </Alert>
            )}
            <Form>
              <Button variant="primary" className="subbtn ncn" type="submit">
                {!isLoading ? "Verify" : "Verifying ..."}
              </Button>
            </Form>
          </Col>
        </Row>
        {/* <Footer/> */}
      </Container>
    </>
  );
});

export default EmailVerification;
