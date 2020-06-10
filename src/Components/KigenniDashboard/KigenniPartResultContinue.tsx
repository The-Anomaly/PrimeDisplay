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
import vector1 from "../../assets/whiteicon1.png";
import vector2 from "../../assets/whiteicon2.png";
import notice from "../../assets/notice.png";
import { CirclePie } from "salad-ui.chart";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import pinkimg from "../../assets/shielduser.png";

interface State {
  fullname: string;
  email: string;
  phonenumber: string;
  successMsg: boolean;
  errorMessage: string;
  isLoading: boolean;
  width: number;
}
const KigenniRemainingResult: React.FunctionComponent = (props: any) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const [state, setFormState] = React.useState<State>({
    fullname: "",
    email: "",
    phonenumber: "",
    errorMessage: "",
    successMsg: false,
    isLoading: false,
    width: 100,
  });
  const {
    fullname,
    email,
    phonenumber,
    errorMessage,
    successMsg,
    isLoading,
    width,
  } = state;

  const sendFormData = (e) => {
    e.preventDefault();
    setFormState({ ...state, isLoading: true });
    const data = {};
    axios
      .post<any, AxiosResponse<any>>(`${API}/accounts/signup/`, data)
      .then((response) => {
        console.log(response);
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
        console.log(error.response);
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
  const data = [
    { text: "Man", value: 500 },
    { text: "Woman", value: 300 },
  ];
  // useEffect(()=>{
  //   useState({
  //     ...state,
  //     width:80
  //   });
  // },[]);
  return (
    <>
      <Col md={10} className="">
        <div className="kdashheader">
          Jaiyeola Jones{" "}
          <span className="kdashheaderlight"> Clarity Report</span>
        </div>
        <div className="kdash1">
          It seems you're presently not on the right career track.{" "}
          <span className="kdash1light"> see details below</span>
        </div>
        <div className="kdasharea">
          <div>
            <img src={firstlogo} className="kfirstlogo" alt="firstlogo" />
          </div>
          <div className="kprofilewrap">
            <div className="kprofile">Profile</div>
            <div className="kprofile2">Entrepreneur</div>
            <div className="kprofile3">Growing Business</div>
          </div>
        </div>
        <hr />
        <div className="resultsec2">
          <div className="resultsec22">
            <CirclePie
              width={190}
              height={190}
              strokeWidth={5}
              labelColor={"#fff"}
              labelFontSize={"38px"}
              strokeColor={"#fff"}
              railColor={"#17375c77"}
              fillColor={"#001833"}
              percent={30}
              padding={0}
            />
            {/* <img src={firstChart} className="firstChart" alt="firstChart" /> */}
          </div>
          <div className="csfitscore">
            <div className="csfitscore1">Your Career Fitness Score</div>
            <div className="csbody">
              It seems you're presently not on the right career track. You are
              presently unsure of yourself and you’ve felt a lack of
              self-understanding for a longtime. You’re like a blank canvas and
              may be experiencing some level of low self-esteem, always watching
              your step, being self and image conscious. But more painful is,
              right now you have very little clue what you want to do with your
              life. Your interests and talents are highly multifaceted that you
              wonder what to focus on, how to merge things and not lose your
              essence.
            </div>
          </div>
        </div>
        <hr />
        <div className="resultsec3">
          <div className="reskwrap">
            <div className="csfitscore1 reskheader">
              Your Career Personality type
            </div>
            <div className="">
              Intellectual Researcher and your unique mission is exploring the
              world through knowledge and translate that insight from knowledge
              to innovative solutions
            </div>
          </div>
          <div>
            <img src={secondlogo} className="secondlogo" alt="secondlogo" />
          </div>
        </div>
        <div className="resultsec3">
          <div className="resultt">
            Your mind is full of imagination and excitement. You are extremely
            intellectual and sound; you are a conceptual problem solver and
            often show flashes of creative brilliance. Outwardly quiet,
            reserved, and detached, you are inwardly absorbed in analyzing
            problems. You enjoy subjects or topics that stimulate your
            intellect. You prefer to find and use logical principles to
            understand what you’re being taught and like conversations that are
            purposeful. May often argue to the point of hair-splitting just for
            fun. You may get bored if stuck on one thing for too long. Learning
            about something new and diving into it head on is fun for you. You
            enjoy many different subjects, it might be reading, writing,
            different sports, listening to music, going to concerts or playing
            video games and would rather explore different subjects than be
            stuck to one.
          </div>
        </div>
        <div>
          <div className="kz1">
            <div className="contkflex">
              <div className="kz2">
                <img src={vector1} className="kl3" alt="vector2" />
                <div>Your Strengths</div>
              </div>
              <div className="kz12">
                <ul className="grapwrap">
                  <li className="grapssin">
                    Grasping abstract concepts and puzzles without difficulty
                  </li>
                  <li className="grapssin">
                    High concentration ability; a natural ability to focus and
                    get "into the zone" when working on a problem. You can
                    absorb your mind completely with an issue, and work it
                    through with amazing speed and accuracy.
                  </li>
                  <li className="grapssin">
                    Imaginative and original, always excited about new ideas and
                    intellectual discussion.
                  </li>
                  <li className="grapssin">A good sense of humor.</li>
                  <li className="grapssin">
                    Honest and straightforward, its black and white not shades
                    of grey.
                  </li>
                  <li className="grapssin">
                    Incredibly passionate and enthusiastic about subjects or
                    projects that they’re interested in and will skip meals and
                    lose sleep to complete a task which sparks your passion.
                  </li>
                </ul>
              </div>
            </div>
            <div className="contkflex">
              <div className="kz2a">
                <img src={vector2} className="kl3" alt="vector2" />
                <div>Your Weaknesses</div>
              </div>
              <div className="kz12">
                <ul className="grapwrap">
                  <li className="grapssin">
                    Not considering others feelings and can offend others people
                    to the core.
                  </li>
                  <li className="grapssin">
                    Indecisiveness, because you are open to different ideas and
                    different ways of thinking it becomes crippling to commit to
                    a decision.
                  </li>
                  <li className="grapssin">
                    Not very collaborative, going against conformity and the
                    social norms to be unconventional and unique which within
                    certain groups and situations this can cause frictions.
                  </li>
                  <li className="grapssin">
                    Deriving a high from working that puts your health at risk.
                  </li>
                  <li className="grapssin">
                    Making bets on premature ideas, you get excited about and
                    share ideas that are not fully formed, or lack evidence to
                    back them up relying on just your intuition.
                  </li>
                  <li className="grapssin">
                    Tend to isolate yourself from people.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="competence">Your Strong Competences</div>
        </div>
        <div>
          <Chart
            width={"100%"}
            height={"500px"}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ["Skills", "Score"],
              ["Persuasion", 1000],
              ["Agile Work Ethic", 1000],
              ["Technical Mastery", 300],
              ["Counselling", 350],
              ["Admin", 350],
              ["Eloquence", 950],
              ["Technology Appreciation", 750],
              ["Technical Mechanical", 650],
            ]}
            options={{
              backgroundColor: "red",
              chart: {
                title: "",
              },
              colors: ["#001833"],
            }}
            rootProps={{ "data-testid": "2" }}
          />
        </div>
        <div className="otherinfo">
          <span className="ikls">Persuasion:</span> an exceptional ability to
          listen to people and talk them into agreeing with your thoughts or
          ideas. <br />
          <span className="ikls">Agile work ethic:</span> exceptional at doing
          things quick and efficiently to get the best the results.
          <br />
          <span className="ikls">Technical Mastery & Flexibility:</span>{" "}
          exceptional at figuring out how things work in any given domain and
          doing it very well.
        </div>
        <hr />
        {/* Average Competence Starts Here */}
        <div>
          <div className="competence">Average Competences</div>
        </div>
        <div>
          <Chart
            width={"100%"}
            height={"500px"}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ["Skills", "Score"],
              ["Persuasion", 600],
              ["Agile Work Ethic", 500],
              ["Technical Mastery", 300],
              ["Counselling", 350],
              ["Admin", 350],
              ["Eloquence", 950],
              ["Technology Appreciation", 750],
              ["Technical Mechanical", 650],
            ]}
            options={{
              backgroundColor: "red",
              chart: {
                title: "",
              },
              colors: ["#001833"],
            }}
            rootProps={{ "data-testid": "2" }}
          />
        </div>
        <div className="otherinfo">
          <span className="ikls">Administration:</span> an exceptional ability
          to listen to people and talk them into agreeing with your thoughts or
          ideas. <br />
          <span className="ikls">Analytical:</span> average ability for thinking
          conceptually, learning fast, observing and make connections between
          concepts or asking probing questions.
          <br />
          <span className="ikls">Creativity:</span> growing ability for seeing
          or implementing beauty and innovation in different forms of
          expression.
        </div>
        <hr />
        <br />
        <div>
          <div className="competence">
            Most Suitable Career-Business Expression
          </div>
          <div className="resultsec2">
            <div className="resultsec22">
              <CirclePie
                width={190}
                height={190}
                strokeWidth={5}
                labelColor={"#fff"}
                labelFontSize={"38px"}
                strokeColor={"#fff"}
                railColor={"#17375c77"}
                fillColor={"#001833"}
                percent={70}
                padding={0}
              />
              {/* <img src={firstChart} className="firstChart" alt="firstChart" /> */}
            </div>
            <div className="csfitscore">
              <div className="csfitscore1">Creative Industry</div>
              <div className="csbody">
                <span className="competence1"> Performing Arts</span>:
                Performing Art is an art form in which artists use their body or
                voice to convey artistic expression. Performing arts tends to
                include a wide range of specialisms, including dance,
                choreography, comedy, music, drama e.t.c <br />
                <span className="competence1"> Animation & Graphics</span>: is
                the expression of visual images or design in still pictures or
                moving in rapid succession created to inform, illustrate, or
                entertain. It includes specialization areas in in UI/UX Design,
                Graphic design, Animation, Game design and development.
                <br />
              </div>
            </div>
          </div>
          {/* Pie Chart Section */}
          <div className="resultsec2">
            <div className="resultsec22">
              <CirclePie
                width={190}
                height={190}
                strokeWidth={5}
                labelColor={"#fff"}
                labelFontSize={"38px"}
                strokeColor={"#fff"}
                railColor={"#17375c77"}
                fillColor={"#001833"}
                percent={60}
                padding={0}
              />
            </div>
            <div className="csfitscore">
              <div className="csfitscore1">Humanitarian Industry</div>
              <div className="csbody">
                <span className="competence1"> Education and Training</span>:
                Impart knowledge and guide people down the right path. Careers/
                businesses to explore Corporate Training & Team building,
                Education Administration & Management, Education Regulation:
                Examining, Inspection & Policy, Education Resources: Libraries,
                I.T & Maintenance, Educational Psychology, Guidance &
                Counselling, Teaching Abroad Teaching: Adult Education, Evening
                Classes & Private Tutoring, Teaching Assistant, Teaching:
                Community, Social & Public Services, Teaching: Further &
                Vocational Education, Teaching: Higher Education, University
                Lecturing & Academic Research, Teaching: Pre-school & Early
                Years Teaching: Primary, Teaching: Secondary & Sixth form,
                Teaching : Special Needs Education, Educational Support Services
                & Supply.
                <br />
                <span className="competence1"> NGO’s & Charity</span>: is
                Champion a cause that changes the lives of people positively.
                Career/ Business areas to explore include but not limited to
                Administration, Campaigning, Communication & Marketing,
                Community Development & Mobilization, Fundraising Advocacy,
                International Aids & Development Policy, research &
                Implementation, Project Management & Coordination, Volunteering
                <br />
              </div>
            </div>
          </div>
          <div className="nlodd">
            <div className="resultsec13">
              <div className="reskwrap13">
                <div className="csfitscore1 reskheader">
                  Your Career Personality type
                </div>
                <div className="">
                  Intellectual Researcher and your unique mission is exploring
                  the world through knowledge and translate that insight from
                  knowledge to innovative solutions
                </div>
              </div>
              <div>
                <img
                  src={pinkimg}
                  className="secondlogo img-fluid"
                  alt="secondlogo"
                />
              </div>
            </div>
          </div>
          {/* white background section */}
          <div className="stbly">
            <div className="stbly1">Stability: "I like to know the future"</div>
            <div>
              You are energized by feeling secure. Surprises are not fun for
              you. You want to know the future as much as is humanly possible.
              Routine, order, predictability, and stability are key factors for
              a stress-free life for you. Sometimes, you'll even give up a more
              fulfilling job to increase a feeling of stability. This motivator
              comes more naturally as the environment dictates. Having children,
              getting older, having a want to secure past successes, and the
              likes can increase the want for stability. Fortunately, your
              confidence and stress-management capabilities can go up with this
              type of planning.
            </div>
          </div>
          {/* dark blue background section */}
          <div className="tipswrapper">
            <div>
              <div className="stbly1">Tips to Harnessing This Motivator:</div>
              <div>
                1. Only seek work, finances, and other deals with a long-term
                commitment{" "}
              </div>{" "}
              <div>
                2. Seek a position with a "job for life" philosophy. Contract
                work is not for you{" "}
              </div>
              <div>
                3. Research and obtain achievable professional qualifications.
                Make one small step toward further status credibility{" "}
              </div>{" "}
              <div>
                {" "}
                4. Consider cutting back on your riskier projects and do work
                that meets basic human needs first and foremost{" "}
              </div>{" "}
              <div>
                5. Only work with well-established organizations. You need
                confidence in a solid base
              </div>
            </div>
            <div className="notice">
              <img src={notice} alt="notice" />
            </div>
          </div>
          {/* white background section */}
          <div className="stbly">
            <div className="stbly1">Status: "I have social standing"</div>
            <div>
              You are energized and excited with gaining more prestige within
              your circles. You might even consider taking a lower paid position
              in order to gain more social positioning in a wider community. You
              really do enjoy being an important figure in the community. You’d
              do what it takes to not be perceived as socially inferior. You may
              have to seek roles and positions that already hold social prestige
              in order to be motivated. Seeking higher titles and roles must be
              seen as a worthwhile reward for efforts in order to energize you.
              Empty titles or roles will not do it for you if the rest of the
              community feels the same way.
            </div>
          </div>
          {/* dark blue background section */}
          <div className="tipswrapper">
            <div>
              <div className="stbly1">Tips to Harnessing This Motivator:</div>
              <div>
                1. Only seek work, finances, and other deals with a long-term
                commitment{" "}
              </div>{" "}
              <div>
                2. Seek a position with a "job for life" philosophy. Contract
                work is not for you{" "}
              </div>
              <div>
                3. Research and obtain achievable professional qualifications.
                Make one small step toward further status credibility{" "}
              </div>{" "}
              <div>
                {" "}
                4. Consider cutting back on your riskier projects and do work
                that meets basic human needs first and foremost{" "}
              </div>{" "}
              <div>
                5. Only work with well-established organizations. You need
                confidence in a solid base
              </div>
            </div>
            <div className="notice">
              <img src={notice} alt="notice" />
            </div>
          </div>
          {/* Your work style */}
          <div className="competence">Your Work Style</div>
          <div>
            <div className="kz1">
              <div className="contkflex">
                <div className="kz2">
                  <img src={vector1} className="kl3" alt="vector2" />
                  <div>Prioritizing</div>
                </div>
                <div className="kz12">
                  <ul className="grapwrap">
                    <li className="grapssin">
                      You are analytical, realistic and logical thinker who
                      likes to know how long a task will take beforehand, so you
                      can plan your work days more efficiently. Your rigidly
                      prioritize your task focusing on executing them in order
                      of importance.
                    </li>
                    <li className="grapssin">
                      High concentration ability; a natural ability to focus and
                      get "into the zone" when working on a problem. You can
                      absorb your mind completely with an issue, and work it
                      through with amazing speed and accuracy.
                    </li>
                    <li className="grapssin">
                      Imaginative and original, always excited about new ideas
                      and intellectual discussion.
                    </li>
                    <li className="grapssin">A good sense of humor.</li>
                    <li className="grapssin">
                      Honest and straightforward, its black and white not shades
                      of grey.
                    </li>
                    <li className="grapssin">
                      Incredibly passionate and enthusiastic about subjects or
                      projects that they’re interested in and will skip meals
                      and lose sleep to complete a task which sparks your
                      passion.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contkflex">
                <div className="kz2a">
                  <img src={vector2} className="kl3" alt="vector2" />
                  <div>Planning</div>
                </div>
                <div className="kz12">
                  <ul className="grapwrap">
                    <li className="grapssin">
                      Not considering others feelings and can offend others
                      people to the core.
                    </li>
                    <li className="grapssin">
                      Indecisiveness, because you are open to different ideas
                      and different ways of thinking it becomes crippling to
                      commit to a decision.
                    </li>
                    <li className="grapssin">
                      Not very collaborative, going against conformity and the
                      social norms to be unconventional and unique which within
                      certain groups and situations this can cause frictions.
                    </li>
                    <li className="grapssin">
                      Deriving a high from working that puts your health at
                      risk.
                    </li>
                    <li className="grapssin">
                      Making bets on premature ideas, you get excited about and
                      share ideas that are not fully formed, or lack evidence to
                      back them up relying on just your intuition.
                    </li>
                    <li className="grapssin">
                      Tend to isolate yourself from people.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* Your Job Function Fit style barchart */}
          <div className="competence">Your Job Function Fit</div>
          <div>
            <Chart
              width={"100%"}
              height={"500px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Skills", "Score"],
                ["Persuasion", 600],
                ["Agile Work Ethic", 500],
                ["Technical Mastery", 300],
                ["Counselling", 350],
                ["Admin", 350],
                ["Eloquence", 950],
                ["Technology Appreciation", 750],
                ["Technical Mechanical", 650],
              ]}
              options={{
                backgroundColor: "red",
                chart: {
                  title: "",
                },
                colors: ["#001833"],
              }}
              rootProps={{ "data-testid": "2" }}
            />
          </div>
          <hr />
          <div className="otherinfo">
            <span className="ikls">
              Description of your top job function fit (aspects of an
              organization you can thrive in)
            </span>{" "}
            <br />
            <span className="ikls">
              Management (Entrepreneurship or C-level suite)
            </span>
            <div>
              {" "}
              You enjoy setting the strategy and seeing it executed. You would
              thrive in roles where you have the ultimate decision-making
              authority from operations; determining the direction taken by a
              work team, a business unit, or an entire company; and controlling
              resources to actualize a business vision.
            </div>
            <br />
            <span className="ikls">Sales & Marketing </span>{" "}
            <div>
              {" "}
              You enjoy persuading others, to buy a product, service, proposal
              or cause. You would thrive in roles that enable you make
              persuasive presentations to interested parties to buy something,
              support an initiative, or contribute resources to a project.{" "}
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default KigenniRemainingResult;
