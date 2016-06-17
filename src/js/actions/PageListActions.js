import * as types from '../constants/ActionTypes';

export function addPage(content="default") {
  return {
    type: types.ADD_PAGE,
    content
  };
}

export function selectPage(id){
  return {
    type: types.SELECT_PAGE,
    id
  }
}
