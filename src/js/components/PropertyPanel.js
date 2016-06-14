import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/PageListActions.js'

import './PropertyPanel.sass'

class PropertyPanel extends Component {
  constructor(props){
    super(props)
  }

  render(){
    //we can put this code in another lifecycle
    //when the selectedComId and selectedpageid not change, we should not update
    //the component
    const {selectedComId, selectedPageId, pagesById} = this.props

    const selectedCom = pagesById.find(page=> page.get('id') === selectedPageId)
    .get('items')
    .find(item=> item.get('id') === selectedComId)

    // let selectedCom
    // pagesById.some((page)=>{
    //   if (page.id === selectedPageId) {
    //     page.items.some((item)=>{
    //       if (item.id === selectedComId) {
    //         selectedCom = item
    //         return true
    //       }else {
    //         return false
    //       }
    //     })
    //
    //     return true
    //   }else {
    //     return false
    //   }
    // })

    return (
      <div className="property-panel">
        {selectedCom.get('type')}
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

  };
}

PropertyPanel = connect(mapStateToProps, mapDispatchToProps)(PropertyPanel)
export default PropertyPanel
