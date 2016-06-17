import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/WorkspaceActions.js'

import TextField from 'material-ui/TextField'

import './PropertyPanel.sass'

class PropertyPanel extends Component {
  constructor(props){
    super(props)

    this.afterWheel =false
    this.onWheel = this.onWheel.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  changeItem(selector, comId, value){
    switch (selector) {
      case 'property-panel-change-x':
        this.props.changeItemX(comId, value)
        break;
      case 'property-panel-change-y':
        this.props.changeItemY(comId, value)
        break;
      case 'property-panel-change-width':
        this.props.changeItemWidth(comId, value)
        break;
      case 'property-panel-change-height':
        this.props.changeItemHeight(comId, value)
        break;
      default:

    }
  }

  onWheel(e){
    const speed = Math.abs(e.deltaY) < 60 ? 1:10
    if (e.deltaY>0) {
      e.target.value = parseInt(e.target.value) + speed
    }else{
      e.target.value = parseInt(e.target.value) - speed
    }

    //watch out a hack here, just a smell
    this.afterWheel = true

    this.changeItem(e.target.id, this.id, parseInt(e.target.value))
  }

  onChange(e, value){
    if (this.afterWheel) {
      this.afterWheel = false
      return
    }

    this.changeItem(e.target.id, this.id, parseInt(value))
  }
  render(){
    //we can put this code in another lifecycle
    //when the selectedComId and selectedpageid not change, we should not update
    //the component
    const {selectedComId, selectedPageId, pagesById} = this.props
    this.id = selectedComId

    const selectedCom = pagesById.find(page=> page.get('id') === selectedPageId)
                                .get('items')
                                .find(item=> item.get('id') === selectedComId)
                                .toJS()
    return (
      <div className="property-panel">
        <TextField id="property-panel-change-x"
                   value={selectedCom.position[0]}
                   floatingLabelText="X"
                   type="number"
                   onWheel={this.onWheel}
                   onChange={this.onChange}
                   ref={(node=>this._inputX = node)}
          ></TextField>
        <TextField id="property-panel-change-y"
                   value={selectedCom.position[1]}
                   floatingLabelText="Y"
                   type="number"
                   onWheel={this.onWheel}
                   onChange={this.onChange}
                   ref={(node=>this._inputY = node)}
          ></TextField>
        <TextField id="property-panel-change-width"
                   value={selectedCom.dimension[0]}
                   floatingLabelText="width"
                   type="number"
                   onWheel={this.onWheel}
                   onChange={this.onChange}
                   ref={(node=>this._inputY = node)}
          ></TextField>
        <TextField id="property-panel-change-height"
                   value={selectedCom.dimension[1]}
                   floatingLabelText="height"
                   type="number"
                   onWheel={this.onWheel}
                   onChange={this.onChange}
                   ref={(node=>this._inputY = node)}
          ></TextField>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedPageId: state.pageList.get('selectedPageId'),
    pagesById: state.pageList.get('pagesById'),
    selectedComId: state.pageList.get('selectedComId')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeItemX: bindActionCreators(actions.changeItemX, dispatch),
    changeItemY: bindActionCreators(actions.changeItemY, dispatch),
    changeItemWidth: bindActionCreators(actions.changeItemWidth, dispatch),
    changeItemHeight: bindActionCreators(actions.changeItemHeight, dispatch)
  };
}

PropertyPanel = connect(mapStateToProps, mapDispatchToProps)(PropertyPanel)
export default PropertyPanel
