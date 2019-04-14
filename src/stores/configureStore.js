import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  const enhancers = []
  const middlewares = [
    thunk
  ]

  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  const composedEnhancers = compose(
      applyMiddleware(...middlewares),
      ...enhancers
  )

  const store = createStore(rootReducer, initialState, composedEnhancers);


  return store
}