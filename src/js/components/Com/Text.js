import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import * as actions from '../../actions/WorkspaceActions'

import BaseCom from './BaseCom'

class Text extends Component {
  constructor(props){
    super(props)
  }
  render(){
    console.log('render Text');
    return (
      <BaseCom
        id={this.props.id}
        index={this.props.index}

        isSelected={this.props.isSelected}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}

        selectCom={this.props.selectCom}
        stopDrag={this.props.stopDrag}
        stopResize={this.props.stopResize}
      >
        <div style={{...this.props.style, fontSize:`${this.props.fontSize}${this.props.fontSizeUnit}`}}>
          {
            this.props.content.toJS().map((contentItem,index)=>(<p key={index}>{contentItem}</p>))
          }
        </div>
      </BaseCom>
    )
  }
}

function mapStateToProps(state) {
  // const selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
  // const selectedItem = state.get('pagesById').get(selectedPageIndex).get('items').find(item=>item.get('id')===state.get('selectedComId'))
  //
  // const _selectedItem = selectedItem.toJS()
  // return {
  //
  //   x: _selectedItem.postion[0],
  //   y: _selectedItem.postion[1],
  //   width: _selectedItem.dimension[0],
  //   height: _selectedItem.dimension[1]
  // };
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

Text = connect(mapStateToProps, mapDispatchToProps)(Text)
export default Text
