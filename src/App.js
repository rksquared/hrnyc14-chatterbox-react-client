import React, { Component } from 'react';
import './styles/styles.css';

import RoomSelector from './components/roomSelector.js';
import AnimatedLoader from './components/animatedLoader.js';
import ChatRoom from './components/chatRoom.js';
import ChatInput from './components/chatInput.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'anonymous',
      roomname: 'lobby',
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
    
    console.log(this.state.username);

    return (
      <div>
        <div id="main">
          <h1>chatterbox</h1>

          <AnimatedLoader />

          <RoomSelector />

          <ChatInput />
        </div>

        <ChatRoom />

      </div>
    );
  }
}

export default App;
