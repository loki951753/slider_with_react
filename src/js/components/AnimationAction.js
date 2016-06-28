import React, { Component, PropTypes } from 'react'

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'

class AnimationAction extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <List>
        <Subheader>Attention Seekers</Subheader>
          {
            ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble"].map(ele=>(
              <ListItem
                  key={ele}
                  primaryText={ele}
                  onTouchTap={this.props.handleTouchTap}
                />
            ))
          }
        <Subheader>Bouncing Entrances</Subheader>
          {
            ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp"].map(ele=>(
              <ListItem
                  key={ele}
                  primaryText={ele}
                  onTouchTap={this.props.handleTouchTap}
                />
            ))
          }
        <Subheader>Fading Entrances</Subheader>
          {
            ["fadeIn", "fadeInDown"].map(ele=>(
              <ListItem
                  key={ele}
                  primaryText={ele}
                  onTouchTap={this.props.handleTouchTap}
                />
            ))
          }
        <Subheader>Flippers</Subheader>
          {
            ["flip", "flipInX", "flipInY", "flipOutX", "flipOutY"].map(ele=>(
              <ListItem
                  key={ele}
                  primaryText={ele}
                  onTouchTap={this.props.handleTouchTap}
                />
            ))
          }
      </List>
    )
  }
}

export default AnimationAction
