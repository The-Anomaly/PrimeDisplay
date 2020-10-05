import * as React from "react";

interface ChatBotProps {
  message: [];
}

const ChatBotSentMessages: React.FunctionComponent<ChatBotProps> = (props) => {
  return (
    <>
      {props?.message?.map((data, index) => {
        return <div className="chatbotText sentbg" key={index}>{data}</div>;
      })}
    </>
  );
};

export default ChatBotSentMessages;
