import { configureStore } from '@reduxjs/toolkit'
import { reset as resetAppSlice } from './appSlice'
import { reset as resetDialogSlice } from './dialogSlice'

import rootReducer from './rootReducer'
import { userActions } from './userSlice'

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store


export const resetStore = () => {
  // let oldState = store.getState();

  store.dispatch(resetAppSlice());
  store.dispatch(resetDialogSlice());
  store.dispatch(userActions.reset());
}
