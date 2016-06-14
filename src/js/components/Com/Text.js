import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import * as actions from '../../actions/WorkspaceActions.js'

import './BaseCom.sass'

//vendor
import classnames from 'classnames';

import ItemTypes from './ItemTypes'
import { DragSource } from 'react-dnd'

//dnd interface
const comSource = {
  beginDrag(props){
    const { id, left, top } = props;
    return { id, left, top}
  }
}

//dnd interface
const collect = function(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

//define some basic user interactive in class BaseCom
class BaseCom extends Component {
  constructor(props){
    super(props)

    const { selectCom, id} = props
    //variables
    // this.pagesById = pagesById
    this.id = id

    //functions
    this.selectCom = selectCom

    this.isSelected = props.isSelected
  }
  handleClick(){
    this.selectCom(this.id)
  }

  render(){
    const handleClick = this.handleClick.bind(this)
    const { connectDragSource } = this.props

    return connectDragSource(
      <div onClick={handleClick}
           style={{
             top: this.props.top,
             left: this.props.left
           }}
           className={classnames({'com-item':true,'com-selected': this.isSelected})}>
            {this.props.children}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    // selectedPageId: state.pageList.get('selectedPageId'),
    // selectedComId: state.pageList.get('selectedComId'),
    // pagesById: state.pageList.get('pagesById')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCom: bindActionCreators(actions.selectCom, dispatch)
  };
}

// BaseCom = connect(mapStateToProps, mapDispatchToProps)(BaseCom)
BaseCom = compose(
  DragSource(ItemTypes.COM, comSource, collect),
  connect(mapStateToProps, mapDispatchToProps)
)(BaseCom)

class Text extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <BaseCom id={this.props.id} isSelected={this.props.isSelected} left={this.props.left} top={this.props.top}>
        <div style={this.props.style}>
          {this.props.innerText}
        </div>
      </BaseCom>
    )
  }
}

export default Text
