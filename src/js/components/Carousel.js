import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

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

class Carousel extends Component {
  constructor(props){
    super(props)

  }
  defaultProps: {
    initialSlide: 0
  }

  addPage(){

  }
  next(){
  }

  prev(){
  }


  render(){
    const { pagesById, selectedId, selectedCom } = this.props;

    const pageData = utils.findPageById(pagesById, selectedId)

    const tpl="<div>test</div>"
    console.log(this.props);
    return (
      <div id="swiperContainer" className="swiper-container" style={style}>
        <div className="swiper-wrapper">
          {
            pagesById.map((page)=>(
              <div key={page.id} className={classnames('swiper-slide', {'selected': selectedId === page.id})}>
                {
                  page.items.map((item)=>{
                    switch (item.type) {
                      case 'text':
                        console.log(item);
                        return <Com_Text key={item.id} id={item.id} {...item.props} isSelected={selectedCom === item.id}></Com_Text>
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
    selectedId: state.pageList.selectedId,
    pagesById: state.pageList.pagesById,
    selectedCom: state.pageList.selectedCom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // addPage: bindActionCreators(actions.addPage, dispatch),
    // selectPage: bindActionCreators(actions.selectPage, dispatch)
  };
}

Carousel = connect(mapStateToProps, mapDispatchToProps)(Carousel)
export default Carousel
