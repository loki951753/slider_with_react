import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';

import * as actions from '../../actions/WorkspaceActions'

import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable'

import './BaseCom.sass'

class BaseCom extends Component {
  constructor(props){
    super(props)

    const { selectCom, id } = props

    this.id = id
    this.selectCom = selectCom

    this.state = {
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y
    }

    this.isResizing = false

    this.handleClick = this.handleClick.bind(this)

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragStop  = this.handleDragStop.bind(this)
    this.handleOnDrag  = this.handleOnDrag.bind(this)

    this.handleResizeStart = this.handleResizeStart.bind(this)
    this.handleResizeStop  = this.handleResizeStop.bind(this)
    this.handleOnResize    = this.handleOnResize.bind(this)

    const { stopDrag, stopResize } = this.props
    this.stopDrag = stopDrag
    this.stopResize = stopResize
  }

  componentWillReceiveProps(props){
    this.setState({width: props.width, height: props.height});
  }
  handleClick(){
    console.log('click');
    this.selectCom(this.id)
  }

  handleDragStart(){
    if (this.isResizing) {
      return false
    }

    if (!this.props.isSelected) {
      this.handleClick()
      return false
    }
  }

  handleOnDrag(){
    if (this.isResizing) {
      return false
    }
  }

  handleDragStop(e,ui){
    if (this.isResizing) {
      this.isResizing = false
      return false
    } else {
      this.stopDrag(this.id, ui.x, ui.y)
      return true
    }
  }

  handleResizeStart(){
    console.log('resize start');
    this.isResizing = true
  }

  handleOnResize(event, {element, size}){
    this.setState({width: size.width, height: size.height});
  }

  handleResizeStop(){
    this.stopResize(this.id, this.state.width, this.state.height)
  }

  render(){
    return (
      <Draggable onClick={this.handleClick}
                 onStart={this.handleDragStart}
                 onDrag={this.handleOnDrag}
                 onStop={this.handleDragStop}
                 position={{x:this.props.x, y:this.props.y}}
                 >
        <div className={classnames({"myDrag": true, 'com-selected':this.props.isSelected})}
             style={{
               position:'absolute'
             }}
             >
          <Resizable width={this.state.width}
                    height={this.state.height}
                    onResizeStart={this.handleResizeStart}
                    onResize={this.handleOnResize}
                    onResizeStop={this.handleResizeStop}
                    >
              <div style={{width: this.state.width, height: this.state.height}}>

                { this.props.children }

              </div>
          </Resizable>
          <div className={classnames({"operate":true})}>
            <div className="t"></div>
            <div className="b"></div>
            <div className="l"></div>
            <div className="r"></div>
          </div>
        </div>
      </Draggable>
    )
  }
}

export default BaseCom
