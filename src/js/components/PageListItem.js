import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import './PageListItem.sass'

const Page = ({ onClick, page, selectedId})=>{
  return (
    <li
      className="page-list-item-wrapper"
      onClick={onClick}
    >
      <span>{page.id + 1}</span>
      <div
        className={
          classnames('page-list-item', {'selected': selectedId === page.id})
        }
        >
        {page.content}
      </div>
    </li>
  )
}

export default Page
