export default {
  findPageById(dataset, id){
    return _.find(dataset, (item)=>item.pageId === id)
  }
}
