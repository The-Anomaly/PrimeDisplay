import * as React from 'react';
import chatgirl from '../../../../assets/chatgirl.png';

interface ChatBotProps {
    name:string
}

const ChatBot: React.FunctionComponent<ChatBotProps> = (props) => {
  return (
      <>
        <div className="Incoming_Chat">
            <div className="inc_img">
                <img src={chatgirl} className="useerimage" alt="useerimage"/>
            </div>
            <div className="incoming_chat_first_section">
                {props.name}
            </div>
            <div className="chatym">
                {/* 4:29 pm */}
            </div>
        </div>
      </>
  );
};

export default ChatBot;
