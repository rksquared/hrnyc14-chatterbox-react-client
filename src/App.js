import React, { Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import './styles/styles.css';

import RoomSelector from './components/roomSelector.js';
import ChatRoom from './components/chatRoom.js';
import ChatInput from './components/chatInput.js';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      username: '',
      roomname: 'lobby',
      messages: [],
      newMessage: ''
    }
    this.handleChatInput = this.handleChatInput.bind(this);
    this.handleChatSubmission = this.handleChatSubmission.bind(this);
    this.fetchChats = this.fetchChats.bind(this);
    this.postChats = this.postChats.bind(this);
  
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
      
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
    if (this.state.username === '') {
      this.setState({
        modalIsOpen: true
      });

    }

    this.fetchChats();
    
  }

  //modal


  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleUserNameInput(ev) {
    this.setState({
     username: ev.target.value
    });
    console.log('username', this.state.username);
  }

  //end modal

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

  handleChatSubmission(ev) {
    //post with this.state.newMessage
    let message = {
      username: this.state.username,
      text: this.state.newMessage
    }
    ev.preventDefault();
    this.postChats(message);
  }

  
  render() {
    
    console.log(this.state.username);

    return (
      <div>
        <div>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Hi There</h2>
            <div>Sign In to Chatterbox!</div>
            <form onSubmit={(ev) => {
              ev.preventDefault();
              this.closeModal()}}
            >
              <input 
                type="text"
                value={this.state.username}
                onChange={this.handleUserNameInput}
              />
              <input 
                type="submit" 
                name="submit" 
                className="submit" 
              />
            </form>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
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
