import React, { Component, PropTypes } from 'react';

import flow from 'lodash/flow'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import { DropTarget } from 'react-dnd';
import ItemTypes from './Com/ItemTypes'

import classnames from 'classnames';

import * as actions from '../actions/PageListActions.js'
import utils from '../common/utils'

import Com_Text from './Com/Text'

// require("imports?this=>window!../vendor/swiper.js")
// import '../vendor/swiper.css'
import './Carousel.sass'

const style = {
  'width': 320,
  'height': 480,
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
    const { pagesById, selectedPageId, selectedComId } = this.props;

    // const pageData = utils.findPageById(pagesById, selectedId)
    const pageData = pagesById.find(page=>page.get('id')===selectedPageId)

    return (
      <div id="swiperContainer" className="swiper-container" style={style}>
        <div className="swiper-wrapper">
          {
            pagesById.map((page)=>(
              <div key={page.get('id')} className={classnames('swiper-slide', {'selected': selectedPageId === page.get('id')})}>
                {
                  page.get('items').map((item)=>{
                    switch (item.get('type')) {
                      case 'text':
                        return <Com_Text key={item.get('id')}
                                         id={item.get('id')}
                                         style={item.get('style').toJS()}
                                         content={item.get('content')}
                                         x={item.get('position').get('0')}
                                         y={item.get('position').get('1')}
                                         width={item.get('dimension').get('0')}
                                         height={item.get('dimension').get('1')}
                                         isSelected={selectedComId === item.get('id')}
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
    selectedComId: state.pageList.get('selectedComId')
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
