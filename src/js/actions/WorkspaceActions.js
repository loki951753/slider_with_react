import * as types from '../constants/ActionTypes';
import $ from 'jquery'


export function addCom(comType){
  return {
    type: types.ADD_COM,
    comType
  }
}

export function selectCom(id=0){
  return {
    type: types.SELECT_COM,
    id
  }
}
export function stopDrag(id, x, y) {
  console.log("stop:",x,y);
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

export function textAlignLeft(id){
  return {
    type: types.TEXT_ALIGN_LEFT,
    id
  }
}

export function textAlignCenter(id){
  return {
    type: types.TEXT_ALIGN_CENTER,
    id
  }
}

export function textAlignRight(id){
  return {
    type: types.TEXT_ALIGN_RIGHT,
    id
  }
}

export function textItalic(id){
  return {
    type: types.TEXT_ITALIC,
    id
  }
}

export function textBold(id){
  return {
    type: types.TEXT_BOLD,
    id
  }
}

export function textUnderlined(id){
  return {
    type: types.TEXT_UNDERLINED,
    id
  }
}

export function changeItemPosition(id, method){
  return {
    type: types.CHANGE_ITEM_POSITION,
    id,
    method
  }
}

export function changeItemFontSize(id, fontSize){
  return {
    type: types.CHANGE_ITEM_FONTSIZE,
    id,
    fontSize
  }
}

export function changeItemRotate(id, rotate){
  return {
    type: types.CHANGE_ITEM_ROTATE,
    id,
    rotate
  }
}

export function changeItemShadow(id, shadow){
  return {
    type: types.CHANGE_ITEM_SHADOW,
    id,
    shadow
  }
}

export function changeItemOpacity(id, opacity){
  return {
    type: types.CHANGE_ITEM_OPACITY,
    id,
    opacity
  }
}
export function changeItemRadius(id, radius){
  return {
    type: types.CHANGE_ITEM_RADIUS,
    id,
    radius
  }
}

export function deleteCom(){
  return {
    type: types.DELETE_COM
  }
}

export function addComIndex(){
  return {
    type: types.ADD_COM_INDEX
  }
}

export function minusComIndex(){
  return {
    type: types.MINUS_COM_INDEX
  }
}

export function clickOtherArea(){
  return {
    type: types.SELECT_BACKGROUND
  }
}

export function selectBackground(){
  return {
    type: types.SELECT_BACKGROUND
  }
}

export function changeSlideEffect(effect){
  return {
    type: types.CHANGE_SLIDE_EFFECT,
    effect
  }
}

export function save(){
  const urlArray = window.location.href.split('/')
  const id = urlArray[urlArray.length-2]

  return dispatch => {
    console.log('get you');
    $.ajax({
      method: "POST",
      url: `/api_v1/page/${id}`,
      dataType: "json"
    }).done((data)=>{
      console.log(`get data from server:${data}`);
      dispatch({
        type: 'anoy'

      })
    })
  }
}

export function copy(){
  return {
    type: types.COPY
  }
}

export function paste(){
  return {
    type: types.PASTE
  }
}

export function del(){
  return {
    type: types.DEL
  }
}
