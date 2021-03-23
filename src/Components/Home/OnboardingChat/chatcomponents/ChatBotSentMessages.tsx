import * as React from "react";

interface ChatBotProps {
  message: string;
}

const ChatBotSentMessages: React.FunctionComponent<ChatBotProps> = (
  props: any
) => {
  return (
    <>
      <div className="chatbotText sentbg">{props.message}</div>
    </>
  );
};

export default ChatBotSentMessages;
