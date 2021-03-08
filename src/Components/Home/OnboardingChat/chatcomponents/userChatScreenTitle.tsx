import * as React from 'react';
import chatgirl from '../../../../assets/chatgirl.png';

interface userChatProps {
    name:string
}

const UserChatScreenTitle: React.FunctionComponent<userChatProps> = (props) => {
  return (
      <>
        <div className="Incoming_Chat">
            <div className="inc_img">
            </div>
            <div className="chatym p111">
                {/* 4:29 pm */}
            </div>
            <div className="incoming_chat_first_section">
                {props.name}
            </div>
        </div>
      </>
  );
};

export default UserChatScreenTitle;

