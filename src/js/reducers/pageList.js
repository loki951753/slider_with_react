import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';

const initialState = {
  pages: [0, 1],
  selectedId: 1,
  pagesById: [{
    id: 0,
    content: "douyu"
  },{
    id: 1,
    content: "shark"
  }]
};

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
            content: action.content
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

    default:
      return state
  }
}
