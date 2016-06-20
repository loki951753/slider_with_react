import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/WorkspaceActions.js'

import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Slider from 'material-ui/Slider';

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './PropertyPanel.sass'

class PropertyPanel extends Component {
  constructor(props){
    super(props)

    this.afterWheel =false
    this.onWheel = this.onWheel.bind(this)
    this.onChange = this.onChange.bind(this)

    this.handleTouchTap = this.handleTouchTap.bind(this)

    this.state = {
      speedSlider: 1,
      latencySlider: 0.6
    }
  }

  changeItem(selector, comId, value){
    switch (selector) {
      case 'property-panel-change-x':
        this.props.changeItemX(comId, parseInt(value))
        break;
      case 'property-panel-change-y':
        this.props.changeItemY(comId, parseInt(value))
        break;
      case 'property-panel-change-width':
        this.props.changeItemWidth(comId, parseInt(value))
        break;
      case 'property-panel-change-height':
        this.props.changeItemHeight(comId, parseInt(value))
        break;
      case 'property-panel-change-content':
        this.props.changeItemContent(comId, value.split('\n'))
        break;
      case 'property-panel-change-speed':
        console.log('change speed');
        console.log(value);
        break;
      default:

    }
  }

  handleTouchTap(e){
    console.log(111);
    let el = document.querySelector(".swiper-slide.selected .com-selected")
    let animationEnd = 'webkitAnimationEnd MSAnimationEnd animationend'

    let animation = `${e.target.innerText.replace(/\n/, '')} ${this.state.speedSlider}s ease ${this.state.latencySlider}s both`
    console.log(animation);
    const comId = this.id
    const changeItemAnimation = this.props.changeItemAnimation

    let animationEndHandler = function(){
      el.style.animation = ''
      el.removeEventListener(animationEnd, animationEndHandler)
      changeItemAnimation(comId, animation)
    }

    el.addEventListener('webkitAnimationEnd', animationEndHandler)

    el.style.webkitAnimation = animation
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

    this.changeItem(e.target.id, this.id, value)
  }

  onSpeedSliderChange(e, value){
    this.setState({'speedSlider':value})
  }
  onLatencySliderChange(e, value){
    this.setState({'latencySlider':value})
  }

  render(){
    const {selectedComId, selectedPageId, pagesById} = this.props
    this.id = selectedComId

    const selectedCom = pagesById.find(page=> page.get('id') === selectedPageId)
                                .get('items')
                                .find(item=> item.get('id') === selectedComId)
                                .toJS()
    return (
      <Tabs className="property-panel"
        >
        <Tab label="property" value="property">
          <TextField id="property-panel-change-x"
                     value={selectedCom.position[0]}
                     floatingLabelText="X"
                     type="number"
                     onWheel={this.onWheel}
                     onChange={this.onChange}
                     ref={(node=>this._inputX = node)}
                     className="property-panel-textfield"
            />
          <TextField id="property-panel-change-y"
                     value={selectedCom.position[1]}
                     floatingLabelText="Y"
                     type="number"
                     onWheel={this.onWheel}
                     onChange={this.onChange}
                     ref={(node=>this._inputY = node)}
                     className="property-panel-textfield"
            />
          <TextField id="property-panel-change-width"
                     value={selectedCom.dimension[0]}
                     floatingLabelText="width"
                     type="number"
                     onWheel={this.onWheel}
                     onChange={this.onChange}
                     ref={(node=>this._inputWidth = node)}
                     className="property-panel-textfield"
            />
          <TextField id="property-panel-change-height"
                     value={selectedCom.dimension[1]}
                     floatingLabelText="height"
                     type="number"
                     onWheel={this.onWheel}
                     onChange={this.onChange}
                     ref={(node=>this._inputHeight = node)}
                     className="property-panel-textfield"
            />
          <TextField id="property-panel-change-content"
                     hintText="文本内容"
                     floatingLabelText="文本内容"
                     multiLine={true}
                     rows={selectedCom.content.length}
                     ref={(node=>this._inputContent = node)}
                     value={selectedCom.content.join("\n")}
                     className="property-panel-textfield"
                     onChange={this.onChange}
            />
        </Tab>
        <Tab label="action" value="action">
          <Slider id="property-panel-change-speed"
                  defaultValue={1}
                  description={`speed: ${this.state.speedSlider}s`}
                  style={{margin:20,marginTop:0}}
                  min={0}
                  max={10}
                  step={0.5}
                  name="speed"
                  value={this.state.speedSlider}
                  onChange={this.onSpeedSliderChange.bind(this)}
            />

          <Slider id="property-panel-change-latency"
                  defaultValue={0.6}
                  description={`latency:${this.state.latencySlider}s`}
                  style={{margin:20,marginTop:0}}
                  min={0}
                  max={10}
                  step={0.5}
                  name="latency"
                  value={this.state.latencySlider}
                  onChange={this.onLatencySliderChange.bind(this)}
            />

          <List>
            <Subheader>Attention Seekers</Subheader>
              {
                ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble"].map(ele=>(
                  <ListItem
                      key={ele}
                      primaryText={ele}
                      onTouchTap={this.handleTouchTap}
                    />
                ))
              }
          </List>
        </Tab>
      </Tabs>
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
    changeItemX: bindActionCreators(actions.changeItemX, dispatch)
    , changeItemY: bindActionCreators(actions.changeItemY, dispatch)
    , changeItemWidth: bindActionCreators(actions.changeItemWidth, dispatch)
    , changeItemHeight: bindActionCreators(actions.changeItemHeight, dispatch)
    , changeItemContent: bindActionCreators(actions.changeItemContent, dispatch)
    , changeItemAnimation: bindActionCreators(actions.changeItemAnimation, dispatch)
  };
}

PropertyPanel = connect(mapStateToProps, mapDispatchToProps)(PropertyPanel)
export default PropertyPanel
