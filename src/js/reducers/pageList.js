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
      return {
        ...state,
        pages: [...state.pages, newId],
        pagesById: [
          ...state.pagesById,
          {
            id: newId,
            content: action.content
          }
        ]
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
