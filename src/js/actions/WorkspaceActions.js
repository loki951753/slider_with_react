import * as types from '../constants/ActionTypes';

export function addText(props={text:'123'}) {
  return {
    type: types.ADD_TEXT,
    props
  };
}
