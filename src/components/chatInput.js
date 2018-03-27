import React from 'react';

const chatInput = (props) => {
  return (
    <div>
      <form action="#" id="send" method="post">
        <input type="text" name="message" id="message" />
        <input type="submit" name="submit" className="submit" />
      </form>
    </div>
  )
}

export default chatInput; 
