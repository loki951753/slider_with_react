import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import classnames from 'classnames';

import './MaterialPanel.sass'

import IconButton from 'material-ui/IconButton';
import {EditorTitle, EditorInsertPhoto} from 'material-ui/svg-icons'
import {grey300} from 'material-ui/styles/colors'

import * as actions from '../actions/WorkspaceActions.js'
import * as comTypes from '../constants/ComTypes.js'

class MaterialPanel extends Component{
  constructor(props){
    super(props)

    this.addCom = this.addCom.bind(this)
  }
  addCom(type){
    return ()=>this.props.addCom(type)
  }
  render(){
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
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
        width: 72,
        height: 72,
        padding: 16,
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
    return (
      <div className="m-container">
        <IconButton
          id="addTextCom"
          tooltip="add text"
          onClick={this.addCom(comTypes.TEXT)}
          iconStyle={styles.smallIcon}
          style={styles.small}
          >
            <EditorTitle color={"#fff"}/>
        </IconButton>
        <IconButton
          id="addImageCom"
          tooltip="add image"
          onClick={this.addCom(comTypes.IMAGE)}
          iconStyle={styles.smallIcon}
          style={styles.small}
          >
            <EditorInsertPhoto color={"#fff"}/>
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
  }
}

MaterialPanel = connect(mapStateToProps, mapDispatchToProps)(MaterialPanel)

export default MaterialPanel
