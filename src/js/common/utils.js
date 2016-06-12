import _ from 'lodash';

const findPageById = function(dataset, id){
  return _.find(dataset, (item)=>item.id === id)
}

const delPageById = function(dataset, id){

}

//dataset: Array
//index: Number
//text: Object
const insertText = function(dataset, pageIndex, text){
  let _page = null
  let _dataset = null

  dataset.every((page, index)=>{
    if (page.id === pageIndex) {
      _page = {
        ...page,
        items: [
          ...page.items,
          text
        ]
      }

      //remove the element at index
      _dataset = [
        ...dataset.slice(0, index),
        _page,
        ...dataset.slice(index+1)
      ]

      return false
    }else {
      return true
    }
  })

  return _dataset
}
export default {
  findPageById,
  insertText
}
