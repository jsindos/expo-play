import { createStore } from 'redux'

export default createStore((state, action) => {
  switch (action.type) {
    case 'HELLO':
      return action.payload
    default:
      return state
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
