import * as types from '../constants/ActionTypes';
import * as comTypes from '../constants/ComTypes';
import * as slideEffect from '../constants/SlideEffect'
import * as staticValues from '../constants/StaticValues'

import Immutable from 'immutable'
import _ from 'lodash'

import undoable, { excludeAction } from 'redux-undo'

const initialState = Immutable.fromJS({
  effect: slideEffect.SLIDE,
  pages: [0, 1],
  selectedPageId: 0,
  pagesById: [{
    id: 0,
    content: "douyu",
    selectedComId: 0,
    items: [
      {
        id : 0,
        index: 0,
        type: comTypes.BACKGROUND,
        style: {
        },
        animation:'',
        content:['text0'],
        position: [0, 0],
        dimension: [50, 100]
      },
      {
        id : 1,
        index: 1,
        type: comTypes.IMAGE,
        animation:'',
        position: [-3, 73],
        dimension: [640, 497],
        src:"/images/5.png",
        opacity: 0,
        radius: 0,
        shadow: 0,
        rotate: 0
      },
      {
        id : 2,
        index: 2,
        type: comTypes.IMAGE,
        animation:'',
        position: [0, 45],
        dimension: [640, 529],
        src:"/images/1.png",
        opacity: 0,
        radius: 0,
        shadow: 0,
        rotate: 0
      },
      {
        id : 3,
        index: 3,
        type: comTypes.IMAGE,
        animation:'',
        position: [44, 165],
        dimension: [246, 313],
        src:"/images/3.png",
        opacity: 0,
        radius: 0,
        shadow: 0,
        rotate: 0
      },
      {
        id : 4,
        index: 4,
        type: comTypes.IMAGE,
        animation:'',
        position: [62, 259],
        dimension: [458, 347],
        src:"/images/4.png",
        opacity: 0,
        radius: 0,
        shadow: 0,
        rotate: 0
      }
    ]
  },{
    id: 1,
    content: "shark",
    selectedComId: 0,
    items: [
      {
        id : 0,
        index: 0,
        type: comTypes.BACKGROUND,
        style: {

        },
        fontSize: 14,
        fontSizeUnit: 'px',
        animation:'',
        content:['text0', 'text1'],
        position: [50, 50],
        dimension: [50, 100]
      },
      {
        id : 1,
        index: 1,
        type: comTypes.TEXT,
        style: {

        },
        fontSize: 14,
        fontSizeUnit: 'px',
        animation:'',
        content:['text0', 'text1'],
        position: [50, 50],
        dimension: [50, 100]
      }
      , {
        id : 2,
        index: 2,
        type: comTypes.IMAGE,
        animation:'',
        position: [0, 100],
        dimension: [staticValues.CAROUSEL_WIDTH, 400],
        src:"/images/1.png",
        opacity: 0,
        radius: 0,
        shadow: 0,
        rotate: 0
      }
    ]
  }]
});

const pageList = function(state = initialState, action){
  let selectedPageIndex
  let selectedPage
  let selectedItemIndex

  switch (action.type) {
    case types.ADD_PAGE: {
      console.log('add page');
      const newId = state.get('pages').max() + 1
      console.log(newId);

      // const selectedIndex = state.get('pages').toJS().indexOf(state.get('selectedId'))
      const selectedIndex = state.get('pages').indexOf(state.get('selectedPageId'))
      console.log(selectedIndex);

      return state.set('selectedPageId', newId)
            .setIn(['pagesById', selectedIndex+1, 'selectedComId'], 0)
            .set('pages', state.get('pages').insert(selectedIndex + 1, newId))
            .set('pagesById', state.get('pagesById').insert(selectedIndex+1, Immutable.fromJS({
              id: newId,
              content: action.content,
              items: [{
                id : 0,
                index: 0,
                type: comTypes.BACKGROUND,
                style: {
                },
                content:['text'],
                animation:'',
                position: [0, 50],
                dimension: [50, 100]
              }]
            })))
      break;
    }
    case types.SELECT_PAGE: {
      console.log('select page');

      return state.set('selectedPageId', action.id)
                  // .set('selectedComId', 0)
    }

    case types.SELECT_BACKGROUND: {
      console.log('select background');

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))

      return state.setIn(['pagesById', selectedPageIndex, 'selectedComId'], 0)
    }

    case types.CHANGE_SLIDE_EFFECT: {
      console.log('change slide effect');

      return state.set('effect', slideEffect.effectArray[action.effect])
    }
    case types.ADD_COM:{
      console.log(`add com: ${action.comType}`);

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedPage = state.get('pagesById').get(selectedPageIndex)
      const id = selectedPage.get('items').maxBy(item=>item.get('id')).get('id') + 1

      let com;
      switch (action.comType) {
        case comTypes.TEXT:
          com = {
            id,
            index: id,
            type: comTypes.TEXT,
            style: {
            },
            fontSize: 14,
            fontSizeUnit: 'px',
            animation:'',
            content: ['new text'],
            position: [0, 0],
            dimension: [100, 25]
          }
          break;
        case comTypes.IMAGE:
          com = {
            id,
            index: id,
            type: comTypes.IMAGE,
            animation:'',
            position: [0, 100],
            dimension: [staticValues.CAROUSEL_WIDTH, 400],
            src:"/images/1.jpg",
            opacity: 0,
            radius: 0,
            shadow: 0,
            rotate: 0
          }
          break;
        default:

      }
      return state.updateIn(['pagesById', selectedPageIndex, 'items'], v=>v.push(Immutable.fromJS(com)))
                  .setIn(['pagesById', selectedPageIndex, 'selectedComId'], id)

    }

    case types.DELETE_COM: {
      console.log("delete com");

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.getIn(['pagesById', selectedPageIndex, 'items'])
                               .findIndex(item=>item.get('id')===state.getIn(['pagesById', selectedPageIndex, 'selectedComId']))

      return state.deleteIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex])
                  .setIn(['pagesById', selectedPageIndex, 'selectedComId'], 0)
      break;
    }

    case types.SELECT_COM: {
      console.log("select com");

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))

      return state.setIn(['pagesById', selectedPageIndex, 'selectedComId'], action.id)
      break;
    }

    case types.ADD_COM_INDEX: {
      console.log("add com index");

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.getIn(['pagesById', selectedPageIndex, 'items'])
                               .findIndex(item=>item.get('id')===state.getIn(['pagesById', selectedPageIndex, 'selectedComId']))

      //id 0 is background
      const comCounts = state.getIn(['pagesById', selectedPageIndex, 'items']).size - 1

      //start with 1
      if (selectedItemIndex === comCounts) {
        // the last index item
        return state
      } else {
        let selectedItem = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex])
        let nextItem = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex+1])
        let nextItemIndex = nextItem.get('index')

        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex], nextItem.set('index', selectedItemIndex))
                    .setIn(['pagesById', selectedPageIndex, 'items', nextItemIndex], selectedItem.set('index', nextItemIndex))
      }
      break;
    }

    case types.MINUS_COM_INDEX: {
      console.log("minus com index");

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.getIn(['pagesById', selectedPageIndex, 'items'])
                               .findIndex(item=>item.get('id')===state.getIn(['pagesById', selectedPageIndex, 'selectedComId']))

      //id 0 is background
      const comCounts = state.getIn(['pagesById', selectedPageIndex, 'items']).size - 1

      //start with 1
      if (selectedItemIndex === 1) {
        // the first index item
        return state
      } else {
        let selectedItem = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex])
        let nextItem = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex-1])
        let nextItemIndex = nextItem.get('index')

        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex], nextItem.set('index', selectedItemIndex))
                    .setIn(['pagesById', selectedPageIndex, 'items', nextItemIndex], selectedItem.set('index', nextItemIndex))
      }

      break;
    }

    case types.STOP_DRAG:
      console.log('stop drag');

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.getIn(['pagesById', selectedPageIndex, 'items'])
                               .findIndex(item=>item.get('id')===action.id)

      console.log(action);
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
                              action.animation)
      break;

    case types.CHANGE_ITEM_RADIUS:
      console.log("change item radius");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'radius'],
                              action.radius)
      break;

    case types.CHANGE_ITEM_SHADOW:
      console.log("change item shadow");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'shadow'],
                              action.shadow)
      break;

    case types.CHANGE_ITEM_ROTATE:
      console.log("change item rotate");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'rotate'],
                              action.rotate)
      break;

    case types.CHANGE_ITEM_OPACITY:
      console.log("change item shadow");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'opacity'],
                              action.opacity)
      break;


    case types.CHANGE_ITEM_POSITION:
      console.log('change item position');
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      let width,height;

      switch (action.method) {
        case 'parentCenter':
          console.log('parent center');
          width = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension', '0'])
          return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position', '0'],
                                  (staticValues.CAROUSEL_WIDTH - width)/2)
          break;
        case 'parentRight':
          console.log('parent right');
          width = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension', '0'])
          return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position', '0'],
                                  (staticValues.CAROUSEL_WIDTH - width))
          break;

        case 'parentCentre':
          console.log('parent centre');
          height = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension', '1'])
          return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position', '1'],
                                  (staticValues.CAROUSEL_HEIGHT - height)/2)
          break;

        case 'parentBottom':
          console.log('parent bottom');
          height = state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'dimension', '1'])
          return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'position', '1'],
                                  (staticValues.CAROUSEL_HEIGHT - height))
          break;
        default:

      }

    case types.CHANGE_ITEM_FONTSIZE:
      console.log('change item font size');

      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'fontSize'],
                              action.fontSize)
      break;

    case types.TEXT_ALIGN_LEFT:
      console.log("text align left");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'textAlign'],
                            'left')
      break;

    case types.TEXT_ALIGN_RIGHT:
      console.log("text align right");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'textAlign'],
                            'right')
      break;

    case types.TEXT_ALIGN_CENTER:
      console.log("text align center");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'textAlign'],
                            'center')
      break;

    case types.TEXT_ITALIC:
      console.log("text italic");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      let isTextItalic = !!state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'fontStyle'])

      if (isTextItalic) {
        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'fontStyle'],
                            '')
      }else {
        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'fontStyle'],
                            'italic')
      }
      break;

    case types.TEXT_UNDERLINED:
      console.log("text underlined");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      let isTextUnderline = !!state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'textDecoration'])

      if (isTextUnderline) {
        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'textDecoration'],
                              '')
      } else {
        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'textDecoration'],
                              'underline')
      }
      break;


    case types.TEXT_BOLD:
      console.log("text bold");
      selectedPageIndex = state.get('pagesById').findIndex(page=>page.get('id')===state.get('selectedPageId'))
      selectedItemIndex = state.get('pagesById').get(selectedPageIndex).get('items').findIndex(item=>item.get('id')===action.id)

      let isTextBold = !!state.getIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'fontWeight'])

      if (isTextBold) {
        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'fontWeight'],
                              '')
      } else {
        return state.setIn(['pagesById', selectedPageIndex, 'items', selectedItemIndex, 'style', 'fontWeight'],
                              'bold')
      }
      break;

    default:
      return state
  }
}

export default undoable(pageList, {
  filter: (action)=>{
    return [types.SELECT_PAGE, types.SELECT_BACKGROUND, types.SELECT_COM].indexOf(action.type) === -1
  }
})
// export default undoable(pageList, {filter: excludeAction([types.SELECT_PAGE, types.SELECT_BACKGROUND, types.SELECT_COM])})
