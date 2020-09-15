import * as React from "react";
import vector from "../../assets/Vector.png";
import vector1 from "../../assets/Vector1.png";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/CareerDriver.png";
import vector4 from "../../assets/Personality Types.png";
import vector5 from "../../assets/Vector5.png";
import vector6 from "../../assets/Vector6.png";
import vector7 from "../../assets/Vector7.png";
import { Link } from "react-router-dom";

const FreeOverviewCard = (props: any) => {
  return (
    <>
      <div className="kigennidisabled">
        <div className="kiconrow">
          <a href="/overview/#drivers">
            <div className="kitemwrapper CareerDrivers">
              <img src={vector3} alt="vector" />
              <div className="v1strength">Career Fitness Score</div>
              <div className="cardttx">
                This tells if you're on the right career track and and what
                really going on.
              </div>
            </div>
          </a>
          <a href="/overview/#personality">
            <div className="kitemwrapper Personality">
              <img src={vector4} alt="vector" />
              <div className="v1strength">Personality Types</div>
              <div className="cardttx">
                Discover the attributes that make you unique.
              </div>
            </div>
          </a>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector} alt="vector" />
            <div className="v1strength">Strength</div>
            <div className="cardttx">
              Get in-depth description of specific strengths you have.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector1} alt="vector" />
            <div className="v1strength">Weaknesses</div>
            <div className="cardttx">
              Our assessment identified specific habits you need curb in order
              to have a productive career and work life.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector2} alt="vector" />
            <div className="v1strength">Strong Career Competencies</div>
            <div className="cardttx">
              We show you the different workplace competencies you have
              exceptional ability for.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector2} alt="vector" />
            <div className="v1strength">Average Career Competencies</div>
            <div className="cardttx">
              We show you the different competencies you have average ability
              in, so you're aware of areas to improve on.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector7} alt="vector" />
            <div className="v1strength">Weak Career Competencies</div>
            <div className="cardttx">
              We show you the different workplace competencies you have poor
              ability in so you can improve.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector2} alt="vector" />
            <div className="v1strength">Career Drivers</div>
            <div className="cardttx">
              Knowing your primary career drivers helps you identify the type of
              jobs and companies to work for. Getting a job is good but working
              in a company that gets you is better.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector5} alt="vector" />
            <div className="v1strength">Career Business Expressions</div>
            <div className="cardttx">
              This tells if you're on the right career track and and what really
              going on.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector6} alt="vector" />
            <div className="v1strength">Work Style</div>
            <div className="cardttx">
              Your primary workstyle helps you understand how you work best and
              how to leverage your work style to avoid mental burn out.
            </div>
          </div>
          <div className="kitemwrapper" onClick={props.OpenModal()}>
            <img src={vector6} alt="vector" />
            <div className="v1strength">Job Function Fit</div>
            <div className="cardttx">
              We share the roles and the departments within an organisation to
              best deploy your talents and skills in.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FreeOverviewCard;
