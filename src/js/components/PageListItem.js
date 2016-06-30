import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable'

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
    return (
      <li
        className="page-list-item-wrapper"
        onClick={onClick}
      >
        <span>{index + 1}</span>
        <div
          className={
            classnames('page-list-item', {'selected': selected})
          }
          >
          {page.get('content')}
        </div>
      </li>
    )
  }
}

export default PageListItem
