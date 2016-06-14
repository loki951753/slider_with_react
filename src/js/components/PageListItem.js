import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import './PageListItem.sass'

const Page = ({ index, onClick, page, selectedId})=>{
  return (
    <li
      className="page-list-item-wrapper"
      onClick={onClick}
    >
      <span>{index + 1}</span>
      <div
        className={
          classnames('page-list-item', {'selected': selectedId === page.get('id')})
        }
        >
        {page.get('content')}
      </div>
    </li>
  )
}

export default Page
