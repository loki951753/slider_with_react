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
  return {
    type: types.STOP_RESIZE,
    id,
    width,
    height
  };
}

export function changeItemX(id, x){
  return {
    type: types.CHANGE_ITEM_X,
    id,
    x
  }
}

export function changeItemY(id, y){
  return {
    type: types.CHANGE_ITEM_Y,
    id,
    y
  }
}

export function changeItemWidth(id, width){
  return {
    type: types.CHANGE_ITEM_WIDTH,
    id,
    width
  }
}

export function changeItemHeight(id, height){
  return {
    type: types.CHANGE_ITEM_HEIGHT,
    id,
    height
  }
}

export function changeItemContent(id, content){
  return {
    type: types.CHANGE_ITEM_CONTENT,
    id,
    content
  }
}

export function changeItemAnimation(id, animation){
  return {
    type: types.CHANGE_ITEM_ANIMATION,
    id,
    animation
  }
}
