import './SliderMaker.sass'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

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

export default DragDropContext(HTML5Backend)(SliderMaker)
