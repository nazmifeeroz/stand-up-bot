export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return state.filter(i => i !== i[action.index])
    default:
      throw new Error()
  }
}
// const handleRemoveItem = (state, action) => {
//   switch (action.type) {
//     case 'SHARING':
//       setSharing(sharing.filter(i => i !== sharing[index]))
//       break
//     case 'help':
//       setHelp(help.filter(i => i !== help[index]))
//       break
//     case 'pairing':
//       setPairing(pairing.filter(i => i !== pairing[index]))
//       break
//     default:
//       console.log('nothing')
//   }
// }

// const addSharing = share => {
//   const newShare = [...sharing, share]
//   setSharing(newShare)
// }

// const addHelp = need => {
//   const newHelp = [...help, need]
//   setHelp(newHelp)
// }

// const addPair = pair => {
//   const newPair = [...pairing, pair]
//   setPairing(newPair)
// }
