import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import PageListItem from './PageListItem.js'
import './PageList.sass'

import * as actions from '../actions/PageListActions.js'

class PageList extends Component {
  constructor(props, context){
    super(props);
    console.log(this.props);

    this.onClick = this.onClick.bind(this);
    this.addPage = this.addPage.bind(this);
  }
  onClick(id){
    this.props.selectPage(id)
  }
  addPage(){
    this.props.addPage()
  }
  render(){
    const { pagesById, selectedId } = this.props
    return (
      <div className="page-list">
        <ul>
          {
            pagesById.map((page, index)=>(
              <PageListItem
                key={page.id}
                index={index}
                page={page}
                selectedId={selectedId}
                onClick={()=>(this.onClick(page.id))}
              />
            ))
          }
        </ul>
        <div className="add-page">
          <a href="javascript:void(0)" title="添加新页" onClick={this.addPage}><span>+</span></a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pagesById: state.pageList.pagesById,
    selectedId: state.pageList.selectedId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPage: bindActionCreators(actions.addPage, dispatch),
    selectPage: bindActionCreators(actions.selectPage, dispatch)
  };
}

PageList = connect(mapStateToProps, mapDispatchToProps)(PageList)
export default PageList
