import React, { Component, PropTypes } from 'react'

class Text extends Component {
  constructor(props){
    super(props)
    console.log(33333333);
    console.log(this.props);

  }
  render(){
    console.log(2222222);
    console.log(this.props);
    return (<div>{this.props.innerText}</div>)
  }
}

export default Text
