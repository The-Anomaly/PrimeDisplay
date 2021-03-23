import * as React from "react";
import "../../Home/Home.css";
import "../assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../HomeComponents/newfooter";
import Navbar from "../../HomeComponents/newnavbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { AssessmentFirstSection } from "../AssessmentComponents/AssessmentFirstSection";
import nextis5 from "../../../assets/nextis5.png";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { API } from "../../../../config";
import { ToastContainer, toast } from "react-toastify";

// team

const NewAssessmentPhaseTwo_1 = (props: any) => {
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
    rate25: "0",
    rate26: "0",
    rate27: "0",
    token: "",
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
    rate25,
    rate26,
    rate27,
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
    };
    const secondApiData = {
      q1: rate16,
      q2: rate17,
      q3: rate18,
      q4: rate19,
      q5: rate20,
    };
    const thirdApiData = {
      q1: rate21,
      q2: rate22,
      q3: rate23,
      q4: rate24,
      q5: rate25,
      q6: rate26,
      q7: rate27,
    };
    const fourthApiData = {
      q1: rate6,
      q2: rate7,
      q3: rate8,
      q4: rate9,
      q5: rate10,
    };
    if (token) {
      axios
        .all([
          axios.post(`${API}/careerinterestbusiness`, firstApiData, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.post(`${API}/careerintereststem`, secondApiData, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.post(`${API}/careerinterestsports`, thirdApiData, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.post(`${API}/careerinteresthumanitarian`, fourthApiData, {
            headers: { Authorization: `Token ${token}` },
          }),
        ])
        .then(
          axios.spread(
            (firstresponse, secondresponse, thirdresponse, fourthres) => {
              if (
                firstresponse?.status == 200 &&
                secondresponse?.status == 200 &&
                thirdresponse?.status == 200 &&
                fourthres
              ) {
                props.history.push("/assessment/phasetwo/complete");
              }
            }
          )
        )
        .catch((error) => {
          if (error && error.response && error.response.data) {
            notify(error.response.data[0].message);
          }
          if (error && error.response == undefined) {
            notify("Failed to process! try again later");
          }
        });
    }
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={47}
            phase="Phase 2b"
            nextPhase="Phase 3"
            time={6}
          />
          <Col md={11}></Col>
          <Col md={1}></Col>
        </Row>
        <Row className="firstrowcf2 cftcontent">
          <Col md={12}>
            <Row>
              <Col md={11}>
                <div className="firstquestion losos">
                  <div className="creative">Business</div>
                  <div>
                    <div className="skip">
                      SKIP ANY ACTIVITIES YOU HAVE NO INTEREST IN & rank the
                      activities you like.
                    </div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        1. Overseeing business activities and people to achieve
                        a common goal.
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
                        2. Employ, train and manage people who work for an
                        organization.
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
                        3. Convince people to buy into an idea, service or
                        product.
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
                        4. Help people make smart decisions with money.
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
                        5. Provide additional help for the smooth running of a
                        business.
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
                </div>
              </Col>
              <Col md={12}>
                <Row>
                  <Col md={11}>
                    <div className="firstquestion losos">
                      <div className="creative">STEM</div>
                      <div>
                        <div className="skip"></div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            6. Understand how the world and the universe around
                            us works.
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
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            7. Use technology to make people’s lives and jobs
                            easier.
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
                            8. Figure out how things work and find practical use
                            for scientific discoveries.
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
                            9. Apply mathematical theories and techniques in
                            solving real life problems.
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
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            10. Study people’s behavior and why they do the
                            things they do.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate20"
                              starCount={5}
                              value={rate20}
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
                      <div className="creative">Sports</div>
                      <div>
                        <div className="skip"></div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            11. Share your opinion on a football match for
                            others to watch.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate21"
                              starCount={5}
                              value={rate21}
                              onStarClick={onStarClick}
                              emptyStarColor={"#444"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            12. Create a platform where people can bet on their
                            favorite players.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate22"
                              starCount={5}
                              value={rate22}
                              onStarClick={onStarClick}
                              emptyStarColor={"#444"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            13. Create opportunities for people to have fun
                            doing sports.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate23"
                              starCount={5}
                              value={rate23}
                              onStarClick={onStarClick}
                              emptyStarColor={"#444"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            14. Take care of the health and well-being of
                            athletes.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate24"
                              starCount={5}
                              value={rate24}
                              onStarClick={onStarClick}
                              emptyStarColor={"#444"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            15. Create innovative products and solutions that
                            make athletes quicker and stronger.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate25"
                              starCount={5}
                              value={rate25}
                              onStarClick={onStarClick}
                              emptyStarColor={"#444"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            16. Play different sports professionally.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate26"
                              starCount={5}
                              value={rate26}
                              onStarClick={onStarClick}
                              emptyStarColor={"#444"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="assessquestionwrap">
                          <div className="assessquestion">
                            17. Be involved in the business of sports and
                            recreation.
                          </div>
                          <div className="assessrating">
                            <StarRatingComponent
                              name="rate27"
                              starCount={5}
                              value={rate27}
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
              <ToastContainer
                enableMultiContainer
                containerId={"B"}
                toastClassName="bg-danger text-white"
                hideProgressBar={true}
                position={toast.POSITION.TOP_CENTER}
              />
            </Row>
            <Row>
              <Col md={11}>
                <div className="firstquestion losos">
                  <div className="creative">Humanitarian</div>
                  <div>
                    <div className="skip"></div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        18. Impart knowledge and guide people down the right
                        path.
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
                        19. Champion a cause that changes the lives of people
                        positively.
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
                        20. Represent the public interest of a group of people,
                        country or nation.
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
                  <div>
                    <div className="assessquestionwrap">
                      <div className="assessquestion">
                        21. Advocate for people’s rights using the law.
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
                        22. Provide physical, emotional and social support to
                        help people live their best lives.
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
                </div>
              </Col>
            </Row>
            <div className="nxtbtnarea">
              <button className="nxtbtn" onClick={submitForm}>
                Next
              </button>
            </div>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default NewAssessmentPhaseTwo_1;
