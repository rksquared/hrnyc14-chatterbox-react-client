import React, { Component } from 'react';
import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'anonymous',
      roomname: 'lobby',
      lastMessageId: 0,
      friends: {},
      messages: [],
    }
  }

  componentDidMount() {
    if (!/(&|\?)username=/.test(window.location.search)) {
      let newSearch = window.location.search;
      if (newSearch !== '' & newSearch !== '?') {
        newSearch += '&';
      }
      newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
      window.location.search = newSearch;
    }

    this.setState({
      username: window.location.search.substr(10)
    });
    
  }

  
  render() {
    
    console.log(this.state)

    return (
      <div>
        <div id="main">
          <h1>chatterbox</h1>
          <div className="spinner"><img src="images/spiffygif_46x46.gif" /></div>
          <div id="rooms">
            Room: 
              <select id="roomSelect"></select>
          </div>
          <form action="#" id="send" method="post">
            <input type="text" name="message" id="message" />
            <input type="submit" name="submit" className="submit" />
          </form>
        </div>
        <div id="chats"></div>
      </div>
    );
  }
}

export default App;
