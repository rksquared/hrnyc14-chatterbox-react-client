import React, { Component } from 'react';
import Axios from 'axios';
import './styles/styles.css';

import RoomSelector from './components/roomSelector.js';
import ChatRoom from './components/chatRoom.js';
import ChatInput from './components/chatInput.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'rk',
      roomname: 'lobby',
      messages: [],
      newMessage: ''
    }
    this.handleChatInput = this.handleChatInput.bind(this);
    this.handleChatSubmission = this.handleChatSubmission.bind(this);
    this.fetchChats = this.fetchChats.bind(this);
    this.postChats = this.postChats.bind(this);

  }

  componentDidMount() {
    // if (!/(&|\?)username=/.test(window.location.search)) {
    //   let newSearch = window.location.search;
    //   if (newSearch !== '' & newSearch !== '?') {
    //     newSearch += '&';
    //   }
    //   newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
    //   window.location.search = newSearch;
    // }

    // this.setState({
    //   username: window.location.search.substr(10)
    // });
    this.fetchChats();
    
  }

  fetchChats() {
    Axios.get('http://127.0.0.1:3000/classes/messages/')
      .then((res) => {
        console.log(res.data.results);
        this.setState({
          messages: res.data.results
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  postChats(message) {
    Axios.post('http://127.0.0.1:3000/classes/messages/', message)
      .then((res) => {
        console.log(res);
        this.fetchChats();
      })
      .catch((error) => {
        console.error(error)
      });
  }

  handleChatInput(ev) {
    this.setState({
      newMessage: ev.target.value
    });
    console.log(this.state.newMessage);
  }

  handleChatSubmission() {
    //post with this.state.newMessage
    let message = {
      username: this.state.username,
      text: this.state.newMessage
    }
    this.postChats(message);
  }

  
  render() {
    
    console.log(this.state.username);

    return (
      <div>
        <div id="main">
          <h1>chatterbox</h1>
          <button onClick={this.fetchChats}>test get</button>

          <RoomSelector />

          <ChatInput 
            ctrlFormVal={this.state.newMessage} 
            handleInput={this.handleChatInput}
            handleSubmission={this.handleChatSubmission}
          />
        </div>

        <ChatRoom messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
