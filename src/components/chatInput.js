import React, { Component } from 'react';
import AnimatedLoader from './animatedLoader.js';
import * as _ from 'lodash';

export default class ChatInput extends Component{
constructor(props) {
  super(props)
  this.state = {
     toggled: false
  }
  // this.toggleLoader = _.
}

  toggleLoader = () => {
    this.setState({
      toggled: !this.state.toggled
    }, () => {
      if (this.state.toggled) {
        _.debounce(() => { this.toggleLoader() }, 400)();
      }
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
              onKeyPress={this.toggleLoader} 
            />
            <input type="submit" name="submit" className="submit" />
          </form>
        </div>
        {this.state.toggled ? (<AnimatedLoader />) : ''}
      </div>
    )
  }
}