import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';

import utils from '../common/utils'

const initialState = [
  {
    pageId: 0,
    items: [
      {
        id : 0,
        index: 0,
        type: 'text',
        props: {
          style: "backgroundColor:'yellow'"
          , innerText: 'TeXt'
        }

      }
    ]
  },
  {
    pageId: 1,
    items: [
      {
        // id : 0,
        // index: 0,
        // html: ""
      }
    ]
  }
]

export default function(state = initialState, action){
  switch (action.type) {
    case types.ADD_TEXT:{
      console.log("i am add text");
      console.log(action);

      //insert a text in current selected page
      const text = {
        id : 1,
        index: 1,
        type: 'text',
        props: {
          style: "backgroundColor:'yellow'"
          , innerText: 'Another TeXt'
        }
      }

      //TODO:
      //more specified reducer
      return [...state[1].items, text]

      break;
    }
    default:
      return state
  }
}
