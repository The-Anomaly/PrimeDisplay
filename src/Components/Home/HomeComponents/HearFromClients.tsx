import * as React from "react";
import { Carousel, Row } from "react-bootstrap";
import "../Home/Home.css";
import rect from "../../../assets/Landingrectangle.png";
import client1 from "../../../assets/client1.png";
import client2 from "../../../assets/client2.png";
import client3 from "../../../assets/client3.png";
import client4 from "../../../assets/client4.png";
import client5 from "../../../assets/client5.png";
import client6 from "../../../assets/client6.png";

const HearFromClients = () => {
  const [index, setIndex] = React.useState(0);

  const handleChange =(selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // function animateValue(id, start, end, duration) {
  //   let obj = document.getElementById(id);
  //   console.log(obj)
  //   let range = end - start;
    
  //   let minTimer = 50;
  //   let stepTime = Math.abs(Math.floor(duration/range));
    
  //   stepTime = Math.max(stepTime, minTimer);
    
  //   let startTime = new Date().getTime();
  //   let endTime = startTime + duration;
  //   let timer;
    
  //   function run() {
  //     let now = new Date().getTime();
  //     let remaining = Math.max((endTime - now) / duration, 0);
  //     let value = Math.round(end - (remaining * range));
  //     obj.innerHTML = value.toString();
  //     if (value === end) {
  //       clearInterval(timer);
  //     }
  //   }
  //   timer = setInterval(run, stepTime);
  //   run();
  // }
  
  // animateValue("numcount", 100, 3100, 2000);

  return (
    <>
      <Row md={12} className="homemap">
        <div className="secondtitle homemaptitle">
          Hear from Happy{" "}
          <span className="secondtitle1">
            Clients <img src={rect} className="secondimg homemapimg" />
          </span>
        </div>
        <div className="homemapclient mapdesktop">
          <div className="homemapsec">
            <div className="homemapsubsec">
              <img src={client1} className="clientimg" alt="happy client" />
              <div className="clienttext">
                First and foremost let me say a very big thank you because after
                my sessions with Omozino I've gotten Clarity in so many things .
                My business has experienced growth, it's been amazing; I mean I
                doubled my sales in June & July. Thank you so much.
                <div className="mapname">Gbemisola Williams</div>
              </div>
            </div>
            <div className="homemapsubsec">
              <img src={client2} className="clientimg" alt="happy client" />
              <div className="clienttext">
                I have been searching for my calling for a while, after working
                in several roles I felt like I wasn't just up to par with what I
                imagine for my life. Going through the process and working with
                my assigned coach Omozino. I was able to see the patterns,
                connect the dots and I'm very excited. I feel liberated.
                <div className="mapname">Oluwasegunfunmi Folaranmi</div>
              </div>
            </div>
          </div>
          <div className="homemapsec">
            <div className="homemapsubsec">
              <img src={client3} className="clientimg" alt="happy client" />
              <div className="clienttext">
                The Clarity assessment bailed and saved me from making a
                devastating career choice that lacked fulfillment. Right now, I
                have redirected focus to release my energy into a career that
                matches my personality as I believe nothing is a fulfilling as
                working with so much passion in an environment that you can make
                the most impact.
                <div className="mapname">Racheal Ifietekhai</div>
              </div>
            </div>
            <div className="homemapsubsec">
              <img src={client4} className="clientimg" alt="happy client" />
              <div className="clienttext">
                I was very unclear on how to approach my career; I wasn’t even
                sure what path to take. Going through the career Clarity and
                assessment solution everything changed, I knew exactly how to
                approach my career, define my job- search strategy and before my
                NYSC passing out I got a job. Clarity gave me the confidence I
                needed.
                <div className="mapname">Fiyinfoluwa Olatubosun</div>
              </div>
            </div>
          </div>
          <div className="homemapsec">
            <div className="homemapsubsec">
              <img src={client5} className="clientimg" alt="happy client" />
              <div className="clienttext">
                The entire experience was beyond my expectations, from the
                Clarity assessment to my first session till now. I've gotten
                more value than what I paid.
                <div className="mapname">Oreva Akpoveso</div>
              </div>
            </div>
            <div className="homemapsubsec">
              <img src={client6} className="clientimg" alt="happy client" />
              <div className="clienttext">
                The entire experience was not just eye-opening but refreshing
                for me.
                <div className="mapname">Oluwanifesimi Folaranmi</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mapmobile">
          <Carousel activeIndex={index} onSelect={handleChange}>
            <Carousel.Item>
            <div className="homemapsubsec">
              <img src={client1} className="clientimg" alt="happy client" />
              <div className="clienttext">
                First and foremost let me say a very big thank you because after
                my sessions with Omozino I've gotten Clarity in so many things .
                My business has experienced growth, it's been amazing; I mean I
                doubled my sales in June & July. Thank you so much. 
                <div className="mapname">Gbemisola Williams</div>
              </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="homemapsubsec">
              <img src={client2} className="clientimg" alt="happy client" />
              <div className="clienttext">
                I have been searching for my calling for a while, after working
                in several roles I felt like I wasn't just up to par with what I
                imagine for my life. Going through the process and working with
                my assigned coach Omozino. I was able to see the patterns,
                connect the dots and I'm very excited. I feel liberated.
                <div className="mapname">Oluwasegunfunmi Folaranmi</div>
              </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="homemapsubsec">
              <img src={client3} className="clientimg" alt="happy client" />
              <div className="clienttext">
                The Clarity assessment bailed and saved me from making a
                devastating career choice that lacked fulfillment. Right now, I
                have redirected focus to release my energy into a career that
                matches my personality as I believe nothing is a fulfilling as
                working with so much passion in an environment that you can make
                the most impact.
                <div className="mapname">Racheal Ifietekhai</div>
              </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="homemapsubsec">
              <img src={client4} className="clientimg" alt="happy client" />
              <div className="clienttext">
                I was very unclear on how to approach my career; I wasn’t even
                sure what path to take. Going through the career Clarity and
                assessment solution everything changed, I knew exactly how to
                approach my career, define my job- search strategy and before my
                NYSC passing out I got a job. Clarity gave me the confidence I
                needed.
                <div className="mapname">Fiyinfoluwa Olatubosun</div>
              </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="homemapsubsec">
              <img src={client5} className="clientimg" alt="happy client" />
              <div className="clienttext">
                The entire experience was beyond my expectations, from the
                Clarity assessment to my first session till now. I've gotten
                more value than what I paid.
                <div className="mapname">Oreva Akpoveso</div>
              </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="homemapsubsec">
              <img src={client6} className="clientimg" alt="happy client" />
              <div className="clienttext">
                The entire experience was not just eye-opening but refreshing
                for me.
                <div className="mapname">Oluwanifesimi Folaranmi</div>
              </div>
            </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <hr className="homemapline"/>
        <div className="homemapbtmtxt">Over <span id="numcount">3100</span> persons have taken the Assessment</div>
      </Row>
    </>
  );
};

export default HearFromClients;
