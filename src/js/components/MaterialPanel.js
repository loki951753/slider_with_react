import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import classnames from 'classnames';

import './MaterialPanel.sass'

import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import {EditorTitle, EditorInsertPhoto, NotificationSdCard} from 'material-ui/svg-icons'
import {grey300} from 'material-ui/styles/colors'

import * as actions from '../actions/WorkspaceActions.js'
import * as comTypes from '../constants/ComTypes.js'

class MaterialPanel extends Component{
  constructor(props){
    super(props)

    const styles = {
      smallIcon: {
        width: 30,
        height: 30,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 30,
        height: 30,
        padding: 14,
        paddingLeft: 20,
        paddingRight: 40
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
    };
    this.styles = styles

    this.addCom = this.addCom.bind(this)
    this.save = this.save.bind(this)

  }
  addCom(type){
    return (e)=>{
      e.stopPropagation()
      this.props.addCom(type)
    }
  }
  save(e){
    e.stopPropagation()
    return this.props.save()
  }
  render(){
    console.log("render material panel");

    return (
      <div className="m-container">
        <IconButton
          id="addTextCom"
          tooltip="add text"
          onClick={this.addCom(comTypes.TEXT)}
          iconStyle={this.styles.smallIcon}
          style={this.styles.small}
          >
            <EditorTitle color={"#fff"}/>
        </IconButton>
        <IconButton
          id="addImageCom"
          tooltip="add image"
          onClick={this.addCom(comTypes.IMAGE)}
          iconStyle={this.styles.smallIcon}
          style={this.styles.small}
          >
            <EditorInsertPhoto color={"#fff"}/>
        </IconButton>

        <IconButton
          id="save"
          tooltip="save work"
          onClick={this.save}
          iconStyle={this.styles.smallIcon}
          style={{...this.styles.small, float:'right'}}
          >
            <NotificationSdCard color={"#fff"}/>
        </IconButton>
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
    addCom: bindActionCreators(actions.addCom, dispatch)
    , save: ()=>dispatch(actions.save())
  }
}

MaterialPanel = connect(mapStateToProps, mapDispatchToProps)(MaterialPanel)

export default MaterialPanel
