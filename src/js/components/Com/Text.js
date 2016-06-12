import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import classnames from 'classnames';

import * as actions from '../../actions/WorkspaceActions.js'

import './BaseCom.sass'
//define some basic user interactive in class BaseCom
class BaseCom extends Component {
  constructor(props){
    super(props)

    const {selectedId, pagesById, selectCom, id} = props
    //variables
    this.selectedId = selectedId
    this.pagesById = pagesById
    this.id = id

    //functions
    this.selectCom = selectCom

    this.isSelected = props.isSelected
  }
  handleClick(){
    this.selectCom(this.id)
  }
  // getStyle(){
  //   if (this.isSelected) {
  //     return {
  //       ...this.props.style,
  //       outline: 'solid'
  //     }
  //   }else {
  //     return this.props.style
  //   }
  // }
  render(){
    const handleClick = this.handleClick.bind(this)
    return (
      <div onClick={handleClick} style={this.props.style} className={classnames({'com-selected': this.props.isSelected})}>{this.props.children}</div>
    )
  }
}
function mapStateToProps(state) {
  return {
    selectedId: state.pageList.selectedId,
    pagesById: state.pageList.pagesById,
    selectedCom: state.SelectedCom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCom: bindActionCreators(actions.selectCom, dispatch)
  };
}

BaseCom = connect(mapStateToProps, mapDispatchToProps)(BaseCom)


class Text extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <BaseCom id={this.props.id} isSelected={this.props.isSelected}>
        <div style={this.props.style}>
          {this.props.innerText}
        </div>
      </BaseCom>
    )
  }
}

export default Text
