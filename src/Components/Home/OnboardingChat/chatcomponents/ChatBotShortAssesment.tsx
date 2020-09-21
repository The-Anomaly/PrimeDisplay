import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../onboardingchat.css";

type ChatBotProps = {
  message?: [];
};

const ChatBotShortAssessment: React.FunctionComponent<ChatBotProps> = (
  props
) => {
  const [state, setCheckboxValue]: any = React.useState<any>({
    question1: "1",
  });
  const onchange = (e: any) => {
    setCheckboxValue({
      ...state,
      [e.target.name]: e.target.value.toString(),
    });
  };

  return (
    <>
      <Row className="firstrowcf2 cftcontent">
        <Col md={12}>
          <div className="chatbotText sentbg">
            Which of these best describes you ?
          </div>
          <div className="rsliderclaskl">
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                onChange={onchange}
                value={6}
                name="question1"
              />
              <span className="checkmark1">A</span>Entrepreneur (Startup phase)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                value={5}
                onChange={onchange}
                name="question1"
              />
              <span className="checkmark1">B</span>Entrepreneur (Growing business)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                onChange={onchange}
                value={4}
                name="question1"
              />
              <span className="checkmark1">C</span>Entrepreneur (Established)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                value={3}
                onChange={onchange}
                name="question1"
              />
              <span className="checkmark1">D</span>Working Professional (Entry level)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                onChange={onchange}
                value={2}
                name="question1"
              />
              <span className="checkmark1">E</span>Working Professional (Mid-level)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                value={1}
                onChange={onchange}
                name="question1"
              />
              <span className="checkmark1">F</span>Working Professional (Senior Level)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                value={0}
                onChange={onchange}
                name="question1"
              />
              <span className="checkmark1">G</span>Student (Postgraduate)
            </label>
            <label className="checkcontainer1 klsll">
              <input
                type="radio"
                value={0}
                onChange={onchange}
                name="question1"
              />
              <span className="checkmark1">H</span>Student (Undergraduate)
            </label>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ChatBotShortAssessment;
