import * as React from "react";
import "../../Home/Home.css";
import "../assessment.css";
import Container from "react-bootstrap/Container";
import { Row, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Footer from "../../HomeComponents/newfooter";
import Navbar from "../../HomeComponents/newnavbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { AssessmentFirstSection } from "../AssessmentComponents/AssessmentFirstSection";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { API } from "../../../../config";
import { ToastContainer, toast } from "react-toastify";

// team

const Assessmentfourthphase = (props: any) => {
  const [state, setRateValue] = React.useState({
    rate1: "0",
    rate2: "0",
    rate3: "0",
    rate4: "0",
    rate5: "0",
    rate6: "0",
    rate7: "0",
    rate8: "0",
    rate9: "0",
    rate10: "0",
    rate11: "0",
    rate12: "0",
    rate13: "0",
    rate14: "0",
    rate15: "0",
    rate16: "0",
    rate17: "0",
    rate18: "0",
    rate19: "0",
    rate20: "0",
    rate21: "0",
    rate22: "0",
    rate23: "0",
    rate24: "0",
    token: "",
    isloading: false,
  });
  const {
    rate1,
    rate2,
    rate3,
    rate4,
    rate5,
    rate6,
    rate7,
    rate8,
    rate9,
    rate10,
    rate11,
    rate12,
    rate13,
    rate14,
    rate15,
    rate16,
    rate17,
    rate18,
    rate19,
    rate20,
    rate21,
    rate22,
    rate23,
    rate24,
    isloading,
    token,
  } = state;
  //cdm
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
  }, []);
  const onStarClick = (nextValue, prevValue, name) => {
    setRateValue({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  //subform
  const submitForm = (e: any) => {
    setRateValue({
      ...state,
      isloading: true,
    });
    e.preventDefault();
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const firstApiData = {
      q1: rate1,
      q2: rate2,
      q3: rate3,
      q4: rate4,
      q5: rate5,
      q6: rate6,
      q7: rate7,
      q8: rate8,
    };
    const secondApiData = {
      q1: rate9,
      q2: rate10,
      q3: rate11,
      q4: rate12,
    };
    const thirdApiData = {
      q1: rate17,
      q2: rate18,
      q3: rate19,
    };
    const fourthApiData = {
      q1: rate13,
      q2: rate14,
      q3: rate15,
      q4: rate16,
    };
    axios
      .all([
        axios.post(`${API}/careerinterestcreative`, firstApiData, {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.post(`${API}/careerinterestbuilding`, secondApiData, {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.post(`${API}/careerinteresthealth`, thirdApiData, {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.post(`${API}/careerinterestnature`, fourthApiData, {
          headers: { Authorization: `Token ${token}` },
        }),
      ])
      .then(
        axios.spread(
          (firstresponse, secondresponse, thirdresponse, fourthresp) => {
            if (
              firstresponse?.status == 200 &&
              secondresponse?.status == 200 &&
              thirdresponse?.status == 200 &&
              fourthresp?.status == 200
            ) {
              props.history.push("/assessmentphasetwo1");
              setRateValue({
                ...state,
                isloading: false,
              });
            }
          }
        )
      )
      .catch((error) => {
        setRateValue({
          ...state,
          isloading: false,
        });
        if (error && error.response && error.response.data) {
          notify(error.response.data[0].message);
        }
        if (error && error.response == undefined) {
          notify("Failed to process! try again later");
        }
      });
  };

  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={40}
            phase="Phase 2a"
            nextPhase="Phase 2b"
            time={10}
          />
          <Col md={11}></Col>
          <Col md={1}></Col>
        </Row>
        <Row className="firstrowcf2 cftcontent">
          <Col md={12}>
            <Row>
              <Col md={11}>
                <div className="firstquestion losos">
                  <div className="creative">Creative</div>
                  <div>
                    <div className="skip">
                      SKIP ANY ACTIVITIES YOU HAVE NO INTEREST IN & rank the
                      activities you like.
                    </div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        a. Music, Dance, Drama, Oratory & Comedy.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={rate1}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        b. Cartoon Creation, Games, Visuals.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate2"
                          starCount={5}
                          value={rate2}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        c. Radio/TV Presenting, Writing, Blogging.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate3"
                          starCount={5}
                          value={rate3}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        d. Baking, Cooking, Event Planning, Travelling.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate4"
                          starCount={5}
                          value={rate4}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        e. Make-Up Application, Hair, Nails and Skin Care.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate5"
                          starCount={5}
                          value={rate5}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        f. Fashion and Accessory Design, Celebrity Styling.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate6"
                          starCount={5}
                          value={rate6}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        g. Organizing & Beautifying Spaces.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate7"
                          starCount={5}
                          value={rate7}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        h. Creating Movies, Documentaries, Capturing Beautiful
                        Moments in Pictures.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate8"
                          starCount={5}
                          value={rate8}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Row>
              <Col md={11}>
                <div className="firstquestion losos">
                  <div className="creative">Building & Fixing</div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        i. Constructing or Designing Houses, Roads, Bridges.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate9"
                          starCount={5}
                          value={rate9}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        j. Organizing and Regulating the way a space is used.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate10"
                          starCount={5}
                          value={rate10}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        k. Make possible the selling/buying of land and property
                        between people.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate11"
                          starCount={5}
                          value={rate11}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        l. Make easy the movement of people, goods and things
                        from one point to another.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate12"
                          starCount={5}
                          value={rate12}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={11}>
                <div className="firstquestion losos">
                  <div className="creative">Nature & Resources</div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        m. Process, produce and distribute agricultural (crops
                        and animals) products to people.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate13"
                          starCount={5}
                          value={rate13}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        n. Protect and preserve our natural environment so
                        others can enjoy it.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate14"
                          starCount={5}
                          value={rate14}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        o. Understand how the earth works so you can protect the
                        environment and human health.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate15"
                          starCount={5}
                          value={rate15}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        p. Use the sun, wind, charcoal, water or fossil fuel to
                        generate power for electricity.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate16"
                          starCount={5}
                          value={rate16}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={11}>
                <div className="firstquestion losos">
                  <div className="creative">Health</div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        q. Identify and prevent a range of conditions and
                        illnesses from occurring.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate17"
                          starCount={5}
                          value={rate17}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        r. Work with people to maintain a healthy lifestyle.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate18"
                          starCount={5}
                          value={rate18}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        s. Diagnose and treat a variety of medical issues.
                      </div>
                      <div className="assessrating">
                        <StarRatingComponent
                          name="rate19"
                          starCount={5}
                          value={rate19}
                          onStarClick={onStarClick}
                          emptyStarColor={"#444"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <ToastContainer
                enableMultiContainer
                containerId={"B"}
                toastClassName="bg-danger text-white"
                hideProgressBar={true}
                position={toast.POSITION.TOP_CENTER}
              />
            </Row>
            <div className="nxtbtnarea">
              <button className="nxtbtn" onClick={submitForm}>
                Next
              </button>
              {isloading && <Spinner animation={"grow"} />}
            </div>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default Assessmentfourthphase;
