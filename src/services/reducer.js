export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return state.filter(i => i !== i[action.index])
    default:
      throw new Error()
  }
}
