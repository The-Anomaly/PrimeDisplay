import * as React from "react";
import chatgirl from "../../../../assets/chatgirl.png";


interface sentChatProps {
  message: string;
}

const UserSentChat: React.FunctionComponent<sentChatProps> = (props) => {
  return (
    <>
      <div className="chatbotText userbg" >{props.message}</div>
    </>
  );
};

export default UserSentChat;
