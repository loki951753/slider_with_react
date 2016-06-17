import './SliderMaker.sass'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageList from '../components/PageList';
import Workspace from '../components/Workspace';
import PropertyPanel from '../components/PropertyPanel';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: blue500,
  },
});
class SliderMaker extends Component {
  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="sliderMaker">
          <PageList></PageList>
          <Workspace></Workspace>
          <PropertyPanel></PropertyPanel>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SliderMaker
