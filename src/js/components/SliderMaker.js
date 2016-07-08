import './SliderMaker.sass'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import PageList from '../containers/PageList';
import Workspace from '../components/Workspace';
import PropertyPanel from '../components/PropertyPanel';

import parsekey from 'parse-key'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

import * as actions from '../actions/WorkspaceActions.js'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: blue500,
  },
});
class SliderMaker extends Component {

  constructor(props){
    super(props)

    this.state = {
      autoHideDuration: 1000,
      message: '',
      open:false
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  matchesKey(key, event){
    if(!key){
      return false
    }

    const charCode = event.keyCode || evnet.which
    const char = String.fromCharCode(charCode)

    return key.name.toUpperCase() === char.toUpperCase()
            && key.alt === event.altKey
            && key.ctrl === event.ctrlKey
            && key.meta === event.metaKey
            && key.shift === event.shiftKey
  }
  handleKeyDown(e){
    console.log(e.keyCode);
    // if ((
    //   !e.ctrlKey && !e.metaKey && !e.altKey
    // ) && (
    //   e.target.tagName === 'INPUT' ||
    //   e.target.tagName === 'SELECT' ||
    //   e.target.tagName === 'TEXTAREA' ||
    //   e.target.isContentEditable
    // )) {
    //   return;
    // }
    if (e.target.tagName === 'INPUT'
        || e.target.tagName === 'SELECT'
        || e.target.tagName === 'TEXTAREA'
        || e.target.isContentEditable
        || (!e.ctrlKey && !e.metaKey && !e.altKey)
      ) {
      return
    }

    if (e.keyCode === 46) {
      e.preventDefault()
      console.log('delete');
      this.props.del()
      this.setState({
        open:true,
        message: '已删除'
      })
      return
    }
    // ctrl-c 复制组件或页面
    // ctrl-v 粘贴组件或页面
    // ctrl-z 撤销
    // ctrl-y 重做
    const copy = parsekey('ctrl-c')
    const paste = parsekey('ctrl-v')
    const undo = parsekey('ctrl-z')
    const redo = parsekey('ctrl-y')

    if (this.matchesKey(copy, e)) {
      e.preventDefault()
      console.log('ctrl-c');
      this.props.copy()
      this.setState({
        open:true,
        message: '已复制'
      })
    }else if (this.matchesKey(paste, e)) {
      e.preventDefault()
      console.log('ctrl-v');
      this.props.paste()
    }else if (this.matchesKey(undo, e)) {
      e.preventDefault()
      console.log('ctrl-z');
      this.props.onUndo()
    }else if (this.matchesKey(redo, e)) {
      e.preventDefault()
      console.log('ctrl-y');
      this.props.onRedo()
    }

  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="sliderMaker">
          <PageList></PageList>
          <Workspace></Workspace>
          <PropertyPanel></PropertyPanel>
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={this.state.autoHideDuration}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    copy: bindActionCreators(actions.copy, dispatch),
    paste: bindActionCreators(actions.paste, dispatch),
    onUndo: ()=>{dispatch(UndoActionCreators.undo())},
    onRedo: ()=>{dispatch(UndoActionCreators.redo())},
    del: bindActionCreators(actions.del, dispatch)
  };
}

SliderMaker = connect(mapStateToProps, mapDispatchToProps)(SliderMaker)
export default SliderMaker
