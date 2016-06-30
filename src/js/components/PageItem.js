import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable'

import classnames from 'classnames';

import * as comTypes from '../constants/ComTypes.js'
import Com_Text from './Com/Text'
import Com_Image from './Com/Image'

class PageItem extends Component {
  constructor(props){
    super(props)
  }
  shouldComponentUpdate(nextProps){
    return !(Immutable.is(this.props.pageData, nextProps.pageData)
              && (this.props.isSelected === nextProps.isSelected))
  }
  render(){
    const {pageData, isSelected} = this.props
    return (
      <div className={classnames('swiper-slide', {'selected': isSelected})}>
          {
            pageData.get('items').map(item=>{
              const isComSelected = pageData.get('selectedComId') === item.get('id')
              switch (item.get('type')) {
                case comTypes.TEXT:
                  return <Com_Text key={item.get('id')} data={item} isSelected={isComSelected} />
                  // return <Com_Text
                  //           key={item.get('id')}
                  //           id={item.get('id')}
                  //           index={item.get('index')}
                  //           style={item.get('style').toJS()}
                  //           fontSize={item.get('fontSize')}
                  //           fontSizeUnit={item.get('fontSizeUnit')}
                  //           content={item.get('content')}
                  //           x={item.get('position').get('0')}
                  //           y={item.get('position').get('1')}
                  //           width={item.get('dimension').get('0')}
                  //           height={item.get('dimension').get('1')}
                  //           isSelected={selectedComId === item.get('id')}

                  break;
                case comTypes.IMAGE:
                  return <Com_Image key={item.get('id')} data={item} isSelected={isComSelected} />
                  // return <Com_Image
                  //           key={item.get('id')}
                  //           id={item.get('id')}
                  //           index={item.get('index')}
                  //           x={item.get('position').get('0')}
                  //           y={item.get('position').get('1')}
                  //           width={item.get('dimension').get('0')}
                  //           height={item.get('dimension').get('1')}
                  //           isSelected={selectedComId === item.get('id')}
                  //           opacity={item.get('opacity')}
                  //           radius={item.get('radius')}
                  //           shadow={item.get('shadow')}
                  //           rotate={item.get('rotate')}
                  //           src={item.get('src')}
                  //   />
                  break;
                default:
                  return null
            }
          })}
      </div>
    )
  }
}

export default PageItem
