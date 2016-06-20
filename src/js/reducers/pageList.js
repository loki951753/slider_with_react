import * as types from '../constants/ActionTypes';
import utils from '../common/utils'

import Immutable from 'immutable'
import _ from 'lodash'

const initialState = Immutable.fromJS({
  pages: [0, 1],
  selectedPageId: 1,
  pagesById: [{
    id: 0,
    content: "douyu",
    items: [
      {
        id : 0,
        index: 0,
        type: 'text',
        style: {
          'backgroundColor':'yellow'
        },
        animation:'',
        innerText: 'TeXt0',
        content:['text0'],
        position: [0, 0],
        dimension: [50, 100]
      }
    ]
  },{
    id: 1,
    content: "shark",
    items: [
      {
        id : 0,
        index: 0,
        type: 'text',
        style: {
          'backgroundColor':'yellow'
        },
        animation:'',
        innerText: 'TeXt1',
        content:['text0', 'text1'],
        position: [50, 50],
        dimension: [50, 100]
      }
    ]
  }],
  selectedComId: 0
});

const genId = function(state){
  const currentPage = utils.findPageById(state.pagesById, state.selectedId)
  let maxId = 0

  currentPage.items.forEach((ele)=> {
    if(ele.id >= maxId){
      maxId = ele.id;
    }
  })
  return maxId + 1
}

export default function(state = initialState, action){

  let selectedPageIndex
  let selectedPage
  let selectedItemIndex

  switch (action.type) {
    case types.ADD_PAGE: {
      console.log('i am add page');
      // const newId = Math.max(...state.get('pages').toJS()) + 1
      const newId = state.get('pages').max() + 1
      console.log(newId);

      // const selectedIndex = state.get('pages').toJS().indexOf(state.get('selectedId'))
      const selectedIndex = state.get('pages').indexOf(state.get('selectedPageId'))
      console.log(selectedIndex);

      return state.set('selectedPageId', newId)
            .set('selectedComId', 0)
            .set('pages', state.get('pages').insert(selectedIndex + 1, newId))
            .set('pagesById', state.get('pagesById').insert(selectedIndex+1, Immutable.fromJS({
              id: newId,
              content: action.content,
              items: [{
                id : 0,
                index: 0,
                type: 'text',
                style: {
                  'backgroundColor':'yellow'
                },
                innerText: 'TeXt1',
                content:['text'],
                animation:'',
                position: [0, 50],
                dimension: [50, 100]
              }]
            })))

      // return {
      //   ...state,
      //   pages: [...state.pages.slice(0, selectedIndex+1),
      //     newId,
      //     ...state.pages.slice(selectedIndex + 1)
      //   ],
      //   pagesById: [...state.pagesById.slice(0, selectedIndex+1),
      //     {
      //       id: newId,
      //       content: action.content,
      //       items: []
      //     },
      //     ...state.pagesById.slice(selectedIndex + 1)
      //   ],
      //   //auto select the new page
      //   selectedId: newId
      // }
      break;
    }
    case types.SELECT_PAGE: {
      console.log('i am select page');

      return state.set('selectedPageId', action.id)
      .set(['selectedComId'], 0)

      // return {
      //   ...state,
      //   selectedId: action.id,
      //   //set to 0
      //   //may enhance here someday
      //   selectedComId: 0
      // }
    }

    case types.ADD_TEXT:{
      console.log("i am add text");
      console.log(action);

      selectedPage = state.get('pagesById').find(page=>page.get('id')===state.get('selectedPageId'))
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      console.log(selectedPage);
      const id = selectedPage.get('items').maxBy(item=>item.id).get('id') + 1

      const text = {
        id,
        index: id,
        type: 'text',
        style: {
          'backgroundColor':'yellow'
        },
        content: ['new text'],
        position: [0, 0],
        dimension: [50, 100]
      }

      return state.setIn(['pagesById', selectedPageIndex, 'items'], selectedPage.get('items').push(Immutable.fromJS(text)))
                  .setIn(['selectedComId'], id)

      // return {
      //   ...state,
      //   pagesById: [
      //     ...utils.insertText(state.pagesById, state.selectedId, text)
      //   ],
      //   selectedCom: id
      // }

      break;
    }

    case types.SELECT_COM: {
      console.log("select component");

      return state.set('selectedComId', action.id)
      // return {
      //   ...state,
      //   selectedCom: action.id
      // }

      break;
    }

    case types.STOP_DRAG:
      console.log('stop drag');

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.updateIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position'],
                              v=>Immutable.List([action.x, action.y]))
      break;

    case types.STOP_RESIZE:
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.updateIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension'],
                              v=>Immutable.List([action.width, action.height]))
      break;

    case types.CHANGE_ITEM_X:
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position', '0'],
                              action.x)
      break;

    case types.CHANGE_ITEM_Y:
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position', '1'],
                              action.y)
      break;

    case types.CHANGE_ITEM_WIDTH:
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension', '0'],
                              action.width)
      break;

    case types.CHANGE_ITEM_HEIGHT:
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension', '1'],
                              action.height)
      break;

    case types.CHANGE_ITEM_CONTENT:
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'content'],
                              Immutable.fromJS(action.content))
      break;

    case types.CHANGE_ITEM_ANIMATION:
      console.log("change item animation");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'animation'],
                              Immutable.fromJS(action.animation))
      break;

    case types.MOVE_COM: {
      console.log("move item");

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)
      return state.updateIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position'],
                              v=>Immutable.List([action.left, action.top]))

      // const currentPage = _.extend({},utils.findPageById(state.pagesById, state.selectedId))
      // const selectedIndex = state.pages.indexOf(state.selectedId)
      //
      // let newPageItems = []
      // currentPage.items.forEach((com)=>{
      //   if (com.id === state.selectedCom) {
      //     com.left = action.left
      //     com.top = action.top
      //     newPageItems.push(com)
      //   }else {
      //     newPageItems.push(com)
      //   }
      // })
      //
      // currentPage.items = newPageItems
      //
      // return {
      //   ...state,
      //   pagesById: [...state.pagesById.slice(0, selectedIndex),
      //     currentPage,
      //     ...state.pagesById.slice(selectedIndex + 1)
      //   ]
      // }


    }
    default:
      return state
  }
}
