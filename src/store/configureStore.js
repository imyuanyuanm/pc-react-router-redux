import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import initialState from '../constants/initialState';
import promiseMiddleware from './../utils/promise-middleware';
export const history = createHistory();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  promiseMiddleware()
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
    enhancers.push(logger); // development环境打印log
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
