import React, { Component, PropTypes } from 'react';
import MaterialPanel from './MaterialPanel.js'
import Carousel from './Carousel.js';

import './Workspace.sass'

const Workspace = ()=> (
  <div className="workspace">
    <MaterialPanel></MaterialPanel>
    <Carousel></Carousel>
  </div>
)

export default Workspace
