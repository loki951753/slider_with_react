import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable'

import * as staticValues from '../constants/StaticValues'

import * as comTypes from '../constants/ComTypes.js'
import Com_Text from './Com/Text'
import Com_Image from './Com/Image'

import classnames from 'classnames';
import './PageListItem.sass'

class PageListItem extends Component {
  constructor(props){
    super(props)
  }
  shouldComponentUpdate(nextProps){
    return !((this.props.selected === nextProps.selected)
              && (this.props.index === nextProps.index)
              && Immutable.is(this.props.page, nextProps.page))
  }
  render(){
    console.log("render page item");
    const { onClick, page, index, selected } = this.props
    this.isSelected = selected

    const ratio = 180 / staticValues.CAROUSEL_WIDTH
    return (
      <li
        className="page-list-item-wrapper"
        onClick={()=>{
          if (this.isSelected) {
            return
          }
          onClick()
          }
        }
      >
        <span>{index + 1}</span>
        <div
          className={
            classnames('page-list-item', {'selected': selected})
          }
          style={{
            width: 180,
            height: staticValues.CAROUSEL_HEIGHT * ratio,
            position: 'relative'
          }}
          >
          <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 999
            }}></div>
          <div className="page-list-item-thumb" style={{
                width: staticValues.CAROUSEL_WIDTH,
                height: staticValues.CAROUSEL_HEIGHT,
                transform: `scale(${ratio}, ${ratio})`,
                transformOrigin: "0 0"
              }}
            >
            {
              page.get('items').map(item=>{
                switch (item.get('type')) {
                  case comTypes.TEXT:
                    return <Com_Text key={item.get('id')} data={item} />
                    break;
                  case comTypes.IMAGE:
                    return <Com_Image key={item.get('id')} data={item} />
                    break;
                  default:
                    return null
                }
              })
            }
          </div>
        </div>
      </li>
    )
  }
}

export default PageListItem
