import * as React from "react";
import "./landing.css";
import NavBar from "../General/navbar";
import logo from "../../assets/logo2.svg";
import student from "../../assets/student.png";
import projector from "../../assets/projector.png";
import tab from "../../assets/tab.png";
import tools from "../../assets/tools.png";
import brand1 from "../../assets/brand1.png";
import play from "../../assets/play.png";
import vid from "../../assets/vid.png";
import pen from "../../assets/pen.png";
import camera from "../../assets/camera.png";
import arrow from "../../assets/arrow.png";
import mark from "../../assets/mark.png";
// import Contact from "../General/contact";
import Footer from "../General/footer";
import { Link, useHistory } from "react-router-dom";
import mka from "../../assets/mkalogo.png";
import { lazy, Suspense } from "react";

const Contact = lazy(() => import("../General/contact"));

const renderLoader = () => <p>Loading</p>;

const Landing = () => {
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  };
  return (
    <>
      <NavBar home={true} />
      <main className="">
        <div className="p-hero p-padd">
          <div className="p-hero-txt1">Prime Display</div>
          <div className="p-hero-hd-sec">
            <h1 className="p-hero-ttl">Interactive e-Learning Solutions</h1>
            <img className="p-hero-ttl-img" src={logo} alt="prime logo" />
          </div>
          <p className="p-hero-txt2">
            Prime Display Solutions Limited is wholly an indigenous ICT company,
            a leading provider of excellent hardware solutions and services,
            contributing in no small way towards the ICT revolution taking place
            in Nigeria and Africa by extension. Our focus is specifically on
            hardware provision towards building a competitive and productive
            e-learning pathway for schools, colleges and cooperate
            organisations.
            {/* We deliver the best possible reliable ICT solutions
            through uncompromising culture of quality service and customer
            satisfaction. */}
          </p>
          <img className="p-student" src={student} alt="student" />
          <button className="p-hero-btn" onClick={contact}>
            Contact Us
          </button>
        </div>
        <div className="p-padd p-sec2">
          <div className="p-sec2-item">
            <div className="p-sec2-icon p-sec2-icon-1">
              <img src={projector} alt="projector icon" />
            </div>
            <p className="p-sec2-ttl">Projectors</p>
            <p className="p-sec2-txt">
              Due to the relationship we share with our partners, we are able to
              bring to you the latest high quality and user friendly projectors
              at a very competitive price.
              <br />
              <Link to="/buy" className="p-link-prod">
                See our products
              </Link>
            </p>
          </div>
          <div className="p-sec2-item">
            <div className="p-sec2-icon p-sec2-icon-2">
              <img src={tab} alt="accesssories icon" />
            </div>
            <p className="p-sec2-ttl">Accessories</p>
            <p className="p-sec2-txt">
              We provide the components with which our products function such as
              projector mount, adaptor (for DC devices), remote, power cable,
              HDMI, VGA, video cable, teaching software etc.
              <br />
              <Link to="/buy" className="p-link-prod">
                See our products
              </Link>
            </p>
          </div>
          <div className="p-sec2-item no-marg">
            <div className="p-sec2-icon p-sec2-icon-3">
              <img src={tools} alt="maintenance icon" />
            </div>
            <p className="p-sec2-ttl">Maintenance</p>
            <p className="p-sec2-txt">
              We have a culture based on preventive maintenance. We ensure that
              clients gadgets don't break down, hence, we embark on regular
              systems servicing to ensure smooth operation.
            </p>
          </div>
        </div>
        <div className="p-marg p-sec3">
          <div className="p-sec3-1">
            <h3 className="p-sec3-ttl">
              Better Engagement simply results to Better Comprehension
            </h3>
            <p className="p-sec3-txt">
              According to a study, 87% of the students found classroom more
              engaging with the addition of more response technologies in a
              large hall. Interactive learning is best for building excellent
              comprehensive students.
            </p>
          </div>
          <div className="p-sec3-2">
            <div className="p-sec3-2-1"></div>
            <img className="p-sec3-img" src={brand1} alt="" />
          </div>
        </div>
        {/* <div className="p-marg p-sec4">
          <h3 className="p-sec4-ttl">Prime Display Solutions</h3>
          <p className="p-sec4-txt">
            Our interactive display solutions transform regular classrooms into
            a world of endless possibilities
          </p>
          <div className="p-sec4-img-sec">
            <img src={vid} alt="" />
            <img className="p-sec4-img-sec-2" src={play} alt="play" />
          </div>
          <img className="p-sec4-left" src={camera} />
          <img className="p-sec4-right" src={pen} />
        </div>
         */}
        <div className="p-padd p-sec5">
          <div className="p-sec5-1">
            <h5 className="p-sec5-1-ttl">What our Clients say About Us</h5>
          </div>
          <div className="p-sec5-client">
            <div className="p-sec5-client-avatar">
              <img src={mka} alt="client avatar" />
            </div>
            <div className="p-sec5-txt-sec">
              <img src={mark} alt="opening quote" />
              <p className="p-sec5-client-txt">
                The interactive white boards and projectors really works well
                and have been very helpful. It has helped my teachers immensely
                as teaching has been made easy with its availability. My
                students’ attentiveness and comprehension has improved
                exponentially as well.
              </p>
              <img className="p-sec5-txt-end" src={mark} alt="closing quote" />
            </div>
            <p className="p-sec5-client-name">MANNA KIDDIES ACADEMY</p>
            {/* <p className="p-sec5-client-location">University of Lagos</p> */}
          </div>
          {/* <div className="p-sec5-arrow-sec">
            <div className="p-sec5-arrow p-sec5-arrow-left">
              <img src={arrow} alt="left arrow" />
            </div>
            <div className="p-sec5-arrow">
              <img src={arrow} alt="right arrow" />
            </div>
          </div> */}
        </div>
      </main>
      {/* <Contact /> */}
      <Suspense fallback={renderLoader()}>
        <Contact />
      </Suspense>
      <Footer />
    </>
  );
};

export default Landing;
