import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';
import utils from '../common/utils'

const initialState = {
  pages: [0, 1, 2],
  selectedId: 1,
  pagesById: [{
    id: 0,
    content: "douyu",
    items: [
      {
        id : 0,
        index: 0,
        type: 'text',
        props: {
          style: {
            'backgroundColor':'yellow'
          }
          , innerText: 'TeXt0'
        }

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
        props: {
          style: {
            'backgroundColor':'yellow'
          }
          , innerText: 'TeXt1'
        }

      }
    ]
  },
  {
    id: 2,
    content: "text",
    items: [
      {
        id : 0,
        index: 0,
        type: 'text',
        props: {
          style: {
            'backgroundColor':'yellow'
          }
          , innerText: 'TeXt2'
        }

      }
    ]
  }],
  selectedCom: 0
};

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
  switch (action.type) {
    case types.ADD_PAGE: {
      console.log('i am add page');
      const newId = Math.max(...state.pages) + 1
      console.log(newId);
      const selectedIndex = state.pages.indexOf(state.selectedId)
      console.log(selectedIndex);
      return {
        ...state,
        pages: [...state.pages.slice(0, selectedIndex+1),
          newId,
          ...state.pages.slice(selectedIndex + 1)
        ],
        pagesById: [...state.pagesById.slice(0, selectedIndex+1),
          {
            id: newId,
            content: action.content,
            items: []
          },
          ...state.pagesById.slice(selectedIndex + 1)
        ],
        //auto select the new page
        selectedId: newId
      }
      break;
    }
    case types.SELECT_PAGE: {
      console.log('i am select page');

      return {
        ...state,
        selectedId: action.id
      }
    }

    case types.ADD_TEXT:{
      console.log("i am add text");
      console.log(action);

      const id = genId(state)
      const text = {
        id: id,
        type: "text",
        props:{
          style: {
            "zIndex": `id`,
            ...action.props.style
          },

          innerText: action.props.innerText
        }
      }

      return {
        ...state,
        pagesById: [
          ...utils.insertText(state.pagesById, state.selectedId, text)
        ],
        selectedCom: id
      }

      break;
    }

    case types.SELECT_COM: {
      console.log("select component");

      return {
        ...state,
        selectedCom: action.id
      }

      break;
    }
    default:
      return state
  }
}
