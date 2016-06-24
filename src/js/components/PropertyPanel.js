import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/WorkspaceActions.js'

import * as comTypes from '../constants/ComTypes.js'

import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './PropertyPanel.sass'

class PropertyPanel extends Component {
  constructor(props){
    super(props)

    this.afterWheel =false
    this.onWheel = this.onWheel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.handleTouchTap = this.handleTouchTap.bind(this)

    this.onRadiusSliderChange = this.onRadiusSliderChange.bind(this)

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
      case 'property-panel-change-fontSize':
        console.log('change font size');
        this.props.changeItemFontSize(comId, parseInt(value))
        break;
      case 'parentLeft':
        this.props.changeItemX(comId, 0)
        break;
      case 'parentTop':
        this.props.changeItemY(comId, 0)
        break;
      case 'textAlignLeft':
      case 'textAlignCenter':
      case 'textAlignRight':
      case 'textItalic':
      case 'textBold':
      case 'textUnderlined':
        this.props[selector](comId)
        break;
      case 'parentCenter':
      case 'parentRight':
      case 'parentCentre':
      case 'parentBottom':
        console.log('change to parent left');
        this.props.changeItemPosition(comId, selector)
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

  onOpacitySliderChange(e, value){
    this.props.changeItemOpacity(this.id, value)
  }

  onRadiusSliderChange(e, value){
    this.props.changeItemRadius(this.id, value)
  }

  onShadowSliderChange(e, value){
    this.props.changeItemShadow(this.id, value)
  }

  onRotateSliderChange(e, value){
    this.props.changeItemRotate(this.id, value)
  }

  handleClick(btnId){
    return (e)=>{
      this.changeItem(btnId, this.id)
    }
  }

  render(){
    const {selectedComId, selectedPageId, pagesById} = this.props
    this.id = selectedComId

    const selectedCom = pagesById.find(page=> page.get('id') === selectedPageId)
                                .get('items')
                                .find(item=> item.get('id') === selectedComId)
                                .toJS()

    const {opacity, radius, shadow, rotate} = selectedCom

    const iconStyle = {
      marginRight: 24
    }

    console.log("property switch to: " + selectedCom.type);
    switch (selectedCom.type) {
      case comTypes.TEXT:

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
                         style={{width:'20%',display:"inline-block"}}
                />
              <TextField id="property-panel-change-y"
                         value={selectedCom.position[1]}
                         floatingLabelText="Y"
                         type="number"
                         onWheel={this.onWheel}
                         onChange={this.onChange}
                         ref={(node=>this._inputY = node)}
                         className="property-panel-textfield"
                         style={{width:'20%',display:"inline-block"}}
                />
              <TextField id="property-panel-change-width"
                         value={selectedCom.dimension[0]}
                         floatingLabelText="width"
                         type="number"
                         onWheel={this.onWheel}
                         onChange={this.onChange}
                         ref={(node=>this._inputWidth = node)}
                         style={{width:'20%',display:"inline-block"}}
                         className="property-panel-textfield"
                />
              <TextField id="property-panel-change-height"
                         value={selectedCom.dimension[1]}
                         floatingLabelText="height"
                         type="number"
                         onWheel={this.onWheel}
                         onChange={this.onChange}
                         ref={(node=>this._inputHeight = node)}
                         style={{width:'20%',display:"inline-block"}}
                         className="property-panel-textfield"
                />

              <TextField id="property-panel-change-fontSize"
                         value={selectedCom.fontSize}
                         floatingLabelText="font size"
                         type="number"
                         onWheel={this.onWheel}
                         onChange={this.onChange}
                         className="property-panel-textfield"
                />

              <div className="icon-iconfont-container-group">
                <IconButton
                  id="parentLeft"
                  iconClassName="icon-iconfont-container-left"
                  tooltip="parent left"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('parentLeft')}
                  />

                <IconButton
                  id="parentCenter"
                  iconClassName="icon-iconfont-container-center"
                  tooltip="parent center"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('parentCenter')}
                  />
                <IconButton
                  id="parentRight"
                  iconClassName="icon-iconfont-container-right"
                  tooltip="parent right"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('parentRight')}
                  />
                <IconButton
                  id="parentTop"
                  iconClassName="icon-iconfont-container-top"
                  tooltip="parent top"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('parentTop')}
                  />
                <IconButton
                  id="parentCentre"
                  iconClassName="icon-iconfont-container-centre"
                  tooltip="parent centre"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('parentCentre')}
                  />
                <IconButton
                  id="parentBottom"
                  iconClassName="icon-iconfont-container-bottom"
                  tooltip="parent bottom"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('parentBottom')}
                  />
              </div>

              <div>
                <IconButton
                  id="textAlignLeft"
                  iconClassName="material-icons"
                  tooltip="text align left"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('textAlignLeft')}
                  >
                    format_align_left
                </IconButton>
                <IconButton
                  id="textAlignCenter"
                  iconClassName="material-icons"
                  tooltip="text align center"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('textAlignCenter')}
                  >
                    format_align_center
                </IconButton>
                <IconButton
                  id="textAlignRight"
                  iconClassName="material-icons"
                  tooltip="text align right"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('textAlignRight')}
                  >
                    format_align_right
                </IconButton>
                <IconButton
                  id="textItalic"
                  iconClassName="material-icons"
                  tooltip="italic"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('textItalic')}
                  >
                    format_italic
                </IconButton>
                <IconButton
                  id="textBold"
                  iconClassName="material-icons"
                  tooltip="bold"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('textBold')}
                  >
                    format_bold
                </IconButton>
                <IconButton
                  id="textUnderlined"
                  iconClassName="material-icons"
                  tooltip="underlined"
                  tooltipPosition="top-center"
                  onClick={this.handleClick('textUnderlined')}
                  >
                    format_underlined
                  </IconButton>
              </div>

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

              <RaisedButton label="Delete" secondary={true} onClick={()=>(this.props.deleteCom())} />

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
        break;

        case comTypes.IMAGE:
          return (
            <Tabs className="property-panel">
              <Tab label="property" value="property">
                <TextField id="property-panel-change-x"
                           value={selectedCom.position[0]}
                           floatingLabelText="X"
                           type="number"
                           onWheel={this.onWheel}
                           onChange={this.onChange}
                           ref={(node=>this._inputX = node)}
                           className="property-panel-textfield"
                           style={{width:'20%',display:"inline-block"}}
                  />
                <TextField id="property-panel-change-y"
                           value={selectedCom.position[1]}
                           floatingLabelText="Y"
                           type="number"
                           onWheel={this.onWheel}
                           onChange={this.onChange}
                           ref={(node=>this._inputY = node)}
                           className="property-panel-textfield"
                           style={{width:'20%',display:"inline-block"}}
                  />
                <TextField id="property-panel-change-width"
                           value={selectedCom.dimension[0]}
                           floatingLabelText="width"
                           type="number"
                           onWheel={this.onWheel}
                           onChange={this.onChange}
                           ref={(node=>this._inputWidth = node)}
                           style={{width:'20%',display:"inline-block"}}
                           className="property-panel-textfield"
                  />
                <TextField id="property-panel-change-height"
                           value={selectedCom.dimension[1]}
                           floatingLabelText="height"
                           type="number"
                           onWheel={this.onWheel}
                           onChange={this.onChange}
                           ref={(node=>this._inputHeight = node)}
                           style={{width:'20%',display:"inline-block"}}
                           className="property-panel-textfield"
                  />

                <div className="icon-iconfont-container-group">
                  <IconButton
                    id="parentLeft"
                    iconClassName="icon-iconfont-container-left"
                    tooltip="parent left"
                    tooltipPosition="top-center"
                    onClick={this.handleClick('parentLeft')}
                    />

                  <IconButton
                    id="parentCenter"
                    iconClassName="icon-iconfont-container-center"
                    tooltip="parent center"
                    tooltipPosition="top-center"
                    onClick={this.handleClick('parentCenter')}
                    />
                  <IconButton
                    id="parentRight"
                    iconClassName="icon-iconfont-container-right"
                    tooltip="parent right"
                    tooltipPosition="top-center"
                    onClick={this.handleClick('parentRight')}
                    />
                  <IconButton
                    id="parentTop"
                    iconClassName="icon-iconfont-container-top"
                    tooltip="parent top"
                    tooltipPosition="top-center"
                    onClick={this.handleClick('parentTop')}
                    />
                  <IconButton
                    id="parentCentre"
                    iconClassName="icon-iconfont-container-centre"
                    tooltip="parent centre"
                    tooltipPosition="top-center"
                    onClick={this.handleClick('parentCentre')}
                    />
                  <IconButton
                    id="parentBottom"
                    iconClassName="icon-iconfont-container-bottom"
                    tooltip="parent bottom"
                    tooltipPosition="top-center"
                    onClick={this.handleClick('parentBottom')}
                    />
                </div>

                <Slider id="property-panel-change-opacity"
                        defaultValue={0}
                        description={`opacity: ${opacity}%`}
                        style={{margin:20,marginTop:0,height:40}}
                        min={0}
                        max={100}
                        step={10}
                        name="opacity"
                        value={opacity}
                        onChange={this.onOpacitySliderChange.bind(this)}
                  />

                <Slider id="property-panel-change-radius"
                        defaultValue={0}
                        description={`radius: ${radius}%`}
                        style={{margin:20,marginTop:0,height:40}}
                        min={0}
                        max={100}
                        step={1}
                        name="raidus"
                        value={radius}
                        onChange={this.onRadiusSliderChange.bind(this)}
                  />

                <Slider id="property-panel-change-shadow"
                        defaultValue={0}
                        description={`shadow: ${shadow}px`}
                        style={{margin:20,marginTop:0,height:40}}
                        min={0}
                        max={100}
                        step={1}
                        name="shadow"
                        value={shadow}
                        onChange={this.onShadowSliderChange.bind(this)}
                  />

                <Slider id="property-panel-change-rotate"
                        defaultValue={0}
                        description={`rotate: ${rotate}deg`}
                        style={{margin:20,marginTop:0,height:40}}
                        min={0}
                        max={360}
                        step={5}
                        name="rotate"
                        value={rotate}
                        onChange={this.onRotateSliderChange.bind(this)}
                  />

                <div style={{marginBottom:10}}>
                  <RaisedButton label="add index" primary={true} onClick={()=>(this.props.addComIndex())} />
                  <RaisedButton label="minus index" primary={true} onClick={()=>(this.props.minusComIndex())} />
                </div>


                <RaisedButton label="Delete" secondary={true} onClick={()=>(this.props.deleteCom())} />

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
          break;

        case comTypes.BACKGROUND:
          return (
            <Tabs className="property-panel">
              <Tab label="background" value="property"></Tab>
            </Tabs>
          )
        default:

      }
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

    , changeItemPosition: bindActionCreators(actions.changeItemPosition, dispatch)

    , changeItemFontSize: bindActionCreators(actions.changeItemFontSize, dispatch)
    , textAlignLeft: bindActionCreators(actions.textAlignLeft, dispatch)
    , textAlignCenter: bindActionCreators(actions.textAlignCenter, dispatch)
    , textAlignRight: bindActionCreators(actions.textAlignRight, dispatch)
    , textBold: bindActionCreators(actions.textBold, dispatch)
    , textItalic: bindActionCreators(actions.textItalic, dispatch)
    , textUnderlined: bindActionCreators(actions.textUnderlined, dispatch)

    , changeItemOpacity: bindActionCreators(actions.changeItemOpacity, dispatch)
    , changeItemRotate: bindActionCreators(actions.changeItemRotate, dispatch)
    , changeItemRadius: bindActionCreators(actions.changeItemRadius, dispatch)
    , changeItemShadow: bindActionCreators(actions.changeItemShadow, dispatch)


    , deleteCom: bindActionCreators(actions.deleteCom, dispatch)
    , addComIndex: bindActionCreators(actions.addComIndex, dispatch)
    , minusComIndex: bindActionCreators(actions.minusComIndex, dispatch)
  };
}

PropertyPanel = connect(mapStateToProps, mapDispatchToProps)(PropertyPanel)
export default PropertyPanel
