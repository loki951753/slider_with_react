import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/WorkspaceActions.js'
import * as comTypes from '../constants/ComTypes';

import { ActionCreators as UndoActionCreators } from 'redux-undo'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import classnames from 'classnames'

import './ControlPanel.sass'

class ControlPanel extends Component {
  constructor(props){
    super(props)
    this.onHandlePreview = this.onHandlePreview.bind(this)
  }
  componentWillReceiveProps(props){
    const {pagesById, selectedPageId} = this.props
    const items = pagesById.find(page=> page.get('id') === selectedPageId)
                                .get('items').toJS()
    this.items = items
  }
  onHandlePreview(e){
    console.log('preview current page');
    e.stopPropagation()

    const root = document.querySelector(".swiper-slide.selected")
    let animationEnd = 'webkitAnimationEnd'

    for (let item of this.items) {
      if ((item.type === comTypes.BACKGROUND) || (item.animation.length === 0)) {
        continue
      }
      let el = root.querySelector(`[data-id='${item.id}']`)
      let animationEndHandler = function(){
        el.style.webkitAnimation = ''
        el.removeEventListener(animationEnd, animationEndHandler)
      }
      el.addEventListener(animationEnd, animationEndHandler)
      el.style.webkitAnimation = item.animation
    }

  }
  render(){
    return (
      <div className="control-panel">
        <button
          className={classnames("control-panel-item", "preview")}
          onClick={this.onHandlePreview}
          >
          预览
        </button>
        <button
          className={classnames("control-panel-item", "redo")}
          onClick={this.props.onRedo}
          disabled={!this.props.canRedo}
          >
          redo
        </button>
        <button
          className={classnames("control-panel-item", "undo")}
          onClick={this.props.onUndo}
          disabled={!this.props.canUndo}
          >
          undo
        </button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    canUndo: state.pageList.past.length > 0
    , canRedo: state.pageList.future.length > 0

    , pagesById: state.pageList.present.get('pagesById')
    , selectedPageId: state.pageList.present.get('selectedPageId')
  }
}

function mapDispatchToProps(dispatch){
  return {
    onUndo: (e)=>{e.stopPropagation();dispatch(UndoActionCreators.undo())},
    onRedo: (e)=>{e.stopPropagation();dispatch(UndoActionCreators.redo())}
  }
}

ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
export default ControlPanel
