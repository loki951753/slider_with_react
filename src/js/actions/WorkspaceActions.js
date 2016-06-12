import * as types from '../constants/ActionTypes';

export function addText(props={}) {
  return {
    type: types.ADD_TEXT,
    props
  };
}

export function selectCom(id=0){
  return {
    type: types.SELECT_COM,
    id
  }
}
