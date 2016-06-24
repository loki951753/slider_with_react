import React, { Component, PropTypes } from 'react';

import flow from 'lodash/flow'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import { DropTarget } from 'react-dnd';

import classnames from 'classnames';

import * as actions from '../actions/PageListActions.js'
import * as comTypes from '../constants/ComTypes.js'

import utils from '../common/utils'

import Com_Text from './Com/Text'
import Com_Image from './Com/Image'

// require("imports?this=>window!../vendor/swiper.js")
// import '../vendor/swiper.css'
import './Carousel.sass'

const style = {
  'backgroundColor': '#fff'
}

let id = 0;

// const carouselTarget = {
//   drop(props, monitor, component){
//     console.log(component);
//     const item = monitor.getItem()
//     const delta = monitor.getDifferenceFromInitialOffset()
//     console.log(item);
//     console.log(delta);
//     const left = Math.round(item.left + delta.x)
//     const top = Math.round(item.top + delta.y)
//
//     props.moveCom(item.id, left, top);
//   }
// }
//
// function collect(connect) {
//   return {
//     connectDropTarget: connect.dropTarget()
//   };
// }

class Carousel extends Component {
  constructor(props){
    super(props)
    // const { moveCom } = props.moveCom
    // this.moveCom = moveCom
  }

  render(){
    const { pagesById, selectedPageId, selectedComId, carouselWidth, carouselHeight } = this.props;

    // const pageData = utils.findPageById(pagesById, selectedId)
    const pageData = pagesById.find(page=>page.get('id')===selectedPageId)

    return (
      <div id="swiperContainer" className="swiper-container" style={{...style, width:carouselWidth, height:carouselHeight}}>
        <div className="swiper-wrapper">
          {
            pagesById.map((page)=>(
              <div key={page.get('id')} className={classnames('swiper-slide', {'selected': selectedPageId === page.get('id')})}>
                {
                  page.get('items').map((item)=>{
                    switch (item.get('type')) {
                      case comTypes.TEXT:
                        return <Com_Text key={item.get('id')}
                                         id={item.get('id')}
                                         index={item.get('index')}
                                         style={item.get('style').toJS()}
                                         fontSize={item.get('fontSize')}
                                         fontSizeUnit={item.get('fontSizeUnit')}
                                         content={item.get('content')}
                                         x={item.get('position').get('0')}
                                         y={item.get('position').get('1')}
                                         width={item.get('dimension').get('0')}
                                         height={item.get('dimension').get('1')}
                                         isSelected={selectedComId === item.get('id')}
                               />
                        break;
                      case comTypes.IMAGE:
                        return <Com_Image
                                  key={item.get('id')}
                                  id={item.get('id')}
                                  index={item.get('index')}
                                  x={item.get('position').get('0')}
                                  y={item.get('position').get('1')}
                                  width={item.get('dimension').get('0')}
                                  height={item.get('dimension').get('1')}
                                  isSelected={selectedComId === item.get('id')}
                                  opacity={item.get('opacity')}
                                  radius={item.get('radius')}
                                  shadow={item.get('shadow')}
                                  rotate={item.get('rotate')}
                                  src={item.get('src')}
                          />
                        break;
                      default:
                        return null
                    }
                  })
                }
              </div>
            ))
          }
        </div>

        <div className="swiper-pagination"></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedPageId: state.pageList.get('selectedPageId'),
    pagesById: state.pageList.get('pagesById'),
    selectedComId: state.pageList.get('selectedComId'),

    carouselWidth: state.pageList.get('carouselWidth'),
    carouselHeight: state.pageList.get('carouselHeight')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // addPage: bindActionCreators(actions.addPage, dispatch),
    // selectPage: bindActionCreators(actions.selectPage, dispatch)
    // moveCom: bindActionCreators(actions.moveCom, dispatch)
  };
}

Carousel = connect(mapStateToProps, mapDispatchToProps)(Carousel)
// Carousel = DropTarget(ItemTypes.COM, carouselTarget, collect)(Carousel)
// Carousel = flow(
//   DropTarget(ItemTypes.COM, carouselTarget, collect),
//   connect(mapStateToProps, mapDispatchToProps)
// )(Carousel)
export default Carousel
