import './SliderMaker.sass'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageList from '../components/PageList';
import Workspace from '../components/Workspace';
import PropertyPanel from '../components/PropertyPanel';

class SliderMaker extends Component {
  render(){
    return (
      <div className="sliderMaker">
        <PageList></PageList>
        <Workspace></Workspace>
        <PropertyPanel></PropertyPanel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageList: state.pageList
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(FriendsActions, dispatch)
//   };
// }

export default connect(mapStateToProps)(SliderMaker)
