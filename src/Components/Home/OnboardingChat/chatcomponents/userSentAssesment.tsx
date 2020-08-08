import * as React from "react";
import chatgirl from "../../../../assets/chatgirl.png";


interface sentChatProps {
  message?: [];
}

const UserSentAssessment: React.FunctionComponent<sentChatProps> = (props) => {
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
      <div className="rsliderclas122">
        <label className="checkcontainer1 klsll">
          <input type="radio" onChange={onchange} value={6} name="question1" />
          <span className="checkmark1">A</span>Yes, please proceed
        </label>
        <label className="checkcontainer1 klsll">
          <input type="radio" value={5} onChange={onchange} name="question1" />
          <span className="checkmark1">B</span>No, some other time
        </label>
      </div>
    </>
  );
};

export default UserSentAssessment;
