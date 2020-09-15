import * as React from "react";
import vector from "../../assets/strength.png";
import vector1 from "../../assets/weakness.png";
import vector2 from "../../assets/StrongCareer.png";
import vector2a from "../../assets/AverageCareer.png";
import vector3 from "../../assets/CareerDriver.png";
import vector4 from "../../assets/Personality Types.png";
import vector5 from "../../assets/CareerBusinessEx.png";
import vector6 from "../../assets/Workstyle.png";
import vector7 from "../../assets/weakcareercompetence.png";
import vector8 from "../../assets/Jobfunction.png";
import { Link } from "react-router-dom";

const PaidOverviewCard = () => {
  return (
    <>
      <div className="kigennidisabled">
        <div className="kiconrow">
          <Link to="/fullinsight/#strength">
            <div className="kitemwrapper bgstrength">
              <img src={vector} alt="vector" />
              <div className="v1strength">Strength</div>
              <div className="cardttx">
                Get in-depth description of specific strengths you have.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#weakness">
            <div className="kitemwrapper bgweakness">
              <img src={vector1} alt="vector" />
              <div className="v1strength">Weaknesses</div>
              <div className="cardttx">
                Our assessment identified specific habits you need curb in order
                to have a productive career and work life.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#stongcomp">
            <div className="kitemwrapper StrongCareer">
              <img src={vector2} alt="vector" />
              <div className="v1strength">Strong Career Competencies</div>
              <div className="cardttx">
                We show you the different workplace competencies you have
                exceptional ability for.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#avgcomp">
            <div className="kitemwrapper AverageCareer">
              <img src={vector2a} alt="vector" />
              <div className="v1strength">Average Career Competencies</div>
              <div className="cardttx">
                We show you the different competencies you have average ability
                in, so you're aware of areas to improve on.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#weak">
            <div className="kitemwrapper weakCareer">
              <img src={vector7} alt="vector" />
              <div className="v1strength">Weak Career Competencies</div>
              <div className="cardttx">
                We show you the different workplace competencies you have poor
                ability in so you can improve.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#careerdrivers">
            <div className="kitemwrapper CareerDrivers">
              <img src={vector3} alt="vector" />
              <div className="v1strength">Career Drivers</div>
              <div className="cardttx">
                Knowing your primary career drivers helps you identify the type
                of jobs and companies to work for. Getting a job is good but
                working in a company that gets you is better.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#personality">
            <div className="kitemwrapper Personality">
              <img src={vector4} alt="vector" />
              <div className="v1strength">Personality Types</div>
              <div className="cardttx">
                {/* Discover the attributes that make you unique. */}
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#expression">
            <div className="kitemwrapper BusinessEX">
              <img src={vector5} alt="vector" />
              <div className="v1strength">Career Business Expressions</div>
              <div className="cardttx">
                This tells if you're on the right career track and and what
                really going on.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#style">
            <div className="kitemwrapper WorkStyle">
              <img src={vector6} alt="vector" />
              <div className="v1strength">Work Style</div>
              <div className="cardttx">
                Your primary workstyle helps you understand how you work best
                and how to leverage your work style to avoid mental burn out.
              </div>
            </div>
          </Link>
          <Link to="/fullinsight/#jobfunction">
            <div className="kitemwrapper JobFunction">
              <img src={vector8} alt="vector" />
              <div className="v1strength">Job Function Fit</div>
              <div className="cardttx">
                We share the roles and the departments within an organisation to
                best deploy your talents and skills in.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default PaidOverviewCard;
