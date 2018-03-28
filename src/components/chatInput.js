import React, { Component } from 'react';
import AnimatedLoader from './animatedLoader.js'

export default class ChatInput extends Component{
constructor(props) {
  super(props)
  this.state = {
     toggled: false
  }
}

  toggleLoader = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };

  render() {
    return (
      <div style={{width: '100%'}}>
        <div>
          <form onSubmit={this.props.handleSubmission}>
            <input 
              type="text" 
              value={this.props.ctrlFormVal} 
              onChange={this.props.handleInput} 
              onKeyDown={this.toggleLoader} 
              onKeyUp={this.toggleLoader}/>
            <input type="submit" name="submit" className="submit" />
          </form>
        </div>
        {this.state.toggled ? (<AnimatedLoader />) : ''}
      </div>
    )
  }
}