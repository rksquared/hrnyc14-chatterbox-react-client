import React from 'react'

const chatRoom = ({messages}) => {

  console.log('messages in chatroom', messages);
  if (!messages) {
    messages = ['NO MESSAGES!'];
  };

  return (
    <div id="chats">
      {messages.map((msg, idx) => 
        <div className="chat">
          <span className="username" style={{fontWeight:'800'}}>{msg.username}: </span> 
          {msg.text}
        </div>
      )}
    </div>
  );
};

export default chatRoom; 
