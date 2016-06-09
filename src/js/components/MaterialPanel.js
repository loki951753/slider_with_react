import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import classnames from 'classnames';

import tpl from './tpl'

import './MaterialPanel.sass'

import * as actions from '../actions/WorkspaceActions.js'

class MaterialPanel extends Component{
  constructor(props){
    super(props)

    const { addText } = props
    this.addText = addText
  }
  _addText(){
    console.log('_addText');
    const textDefaultProps = {

    }
    this.addText(textDefaultProps)
  }
  render(){
    return (
      <div className="m-container">
        <div className="m-item m-text" onClick={()=>this._addText()}>text</div>
        <div className="m-item m-pic">pic</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    addText: bindActionCreators(actions.addText, dispatch)
  }
}

MaterialPanel = connect(mapStateToProps, mapDispatchToProps)(MaterialPanel)

export default MaterialPanel
