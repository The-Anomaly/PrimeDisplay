import * as React from "react";
import chatgirl from "../../../../assets/chatgirl.png";


interface sentChatProps {
  message: [];
}

const UserSentChat: React.FunctionComponent<sentChatProps> = (props) => {
  return (
    <>
      {props.message?.map((data, index) => {
        return (<div className="chatbotText userbg" key={index}>{data}</div>);
      })
    }
    </>
  );
};

export default UserSentChat;
