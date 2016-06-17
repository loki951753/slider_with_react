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
export function stopDrag(id, x, y) {
  return {
    type: types.STOP_DRAG,
    id,
    x,
    y
  };
}

export function stopResize(id, width, height) {
  console.log(`id:${id}, width:${width}, height:${height}`);
  return {
    type: types.STOP_RESIZE,
    id,
    width,
    height
  };
}
