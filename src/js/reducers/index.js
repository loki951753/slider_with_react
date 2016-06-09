import { combineReducers } from 'redux';
import pageList from './pageList';
import workspace from './workspace'

const rootReducer = combineReducers({
  pageList,
  workspace
});

export default rootReducer;
