import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import * as actions from '../../actions/WorkspaceActions'

import BaseCom from './BaseCom'

class Image extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const baseStyle = {
      height: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPostion: 'top center'
    }
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
        <div style={{
            ...baseStyle
            , backgroundImage:`url(${this.props.src})`
            , borderRadius:`${this.props.radius}%`
            , boxShadow: `black 0px 0px ${this.props.shadow}px`
            , opacity: (100 - this.props.opacity)/100.0
            , transform: `rotate(${this.props.rotate}deg)`

          }}>
        </div>
      </BaseCom>
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

Image = connect(mapStateToProps, mapDispatchToProps)(Image)
export default Image
