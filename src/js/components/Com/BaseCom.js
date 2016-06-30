import React, { Component, PropTypes } from 'react'
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux'
import classnames from 'classnames';
import Immutable from 'immutable'

import * as actions from '../../actions/WorkspaceActions'

import DraggableCore from 'react-draggable';
import { Resizable } from 'react-resizable'

import './BaseCom.sass'

class BaseCom extends Component {
  constructor(props){
    super(props)
    console.log('new a basecom');
    const data = props.data.toJS()
    this.id = data.id

    this.state = {
      width: data.width,
      height: data.height,
      left: data.x,
      top: data.y
    }

    this.isResizing = false

    this.handleClick = this.handleClick.bind(this)

    this.onDragHandler = this.onDragHandler.bind(this)

    this.handleResizeStart = this.handleResizeStart.bind(this)
    this.handleResizeStop  = this.handleResizeStop.bind(this)
    this.handleOnResize    = this.handleOnResize.bind(this)
  }

  componentWillReceiveProps(props){
    const data = props.data.toJS()
    this.setState({width: data.width, height: data.height, left: data.x, top: data.y});
  }
  handleClick(e){
    console.log('click');
    e.stopPropagation()
    this.props.selectCom(this.id)
    return false
  }

  onDragHandler(handlerName){
    return (e,{node, deltaX,deltaY})=>{
      const newPosition = {top:0,left:0}

      switch(handlerName){
        case 'onDragStart':
          // console.log('drag start');
          const parentRect = node.offsetParent.getBoundingClientRect();
          const clientRect = node.getBoundingClientRect();
          newPosition.left = clientRect.left - parentRect.left;
          newPosition.top = clientRect.top - parentRect.top;
          this.setState({dragging: newPosition});
          break;
        case 'onDrag':
          // console.log('on drag');
          if (!this.state.dragging) throw new Error('onDrag called before onDragStart.');
          newPosition.left = this.state.dragging.left + deltaX;
          newPosition.top = this.state.dragging.top + deltaY;
          this.setState({dragging: newPosition});
          this.setState({top:this.state.top + newPosition.top, left:this.state.left + newPosition.left})
          break;
        case 'onDragStop':
          // console.log('drag stop');
          if (!this.state.dragging) throw new Error('onDragEnd called before onDragStart.');
          newPosition.left = this.state.dragging.left;
          newPosition.top = this.state.dragging.top;
          this.setState({dragging: null});
          this.props.stopDrag(this.id, this.state.left, this.state.top)
          break;
        default:

      }
    }
  }

  handleResizeStart(){
    console.log('resize start');
  }

  // shouldComponentUpdate(nextProps){
  //   console.log(!Immutable.is(this.props.data, nextProps.data));
  //   return !Immutable.is(this.props.data, nextProps.data)
  // }
  handleOnResize(event, {element, size}){
    this.setState({width: size.width, height: size.height});
  }

  handleResizeStop(){
    this.props.stopResize(this.id, this.state.width, this.state.height)
  }

  render(){
    console.log('render base com');

    const {isSelected, x, y, width, height, index, id} = this.props.data.toJS()

    return (
      <div
        className={classnames({"myDrag": true, 'com-selected':isSelected})}
        style={{
          left:this.state.left
          , top:this.state.top
          , position:'absolute'
          , zIndex: index
        }}
        data-id={id}
        onClick={this.handleClick}
        >
        <DraggableCore
          onStart={this.onDragHandler('onDragStart')}
          onDrag={this.onDragHandler('onDrag')}
          onStop={this.onDragHandler('onDragStop')}
          cancel=".react-resizable-handle"
          >
          <div>

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
        </DraggableCore>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCom: bindActionCreators(actions.selectCom, dispatch),
    stopDrag: bindActionCreators(actions.stopDrag, dispatch),
    stopResize: bindActionCreators(actions.stopResize, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BaseCom)
