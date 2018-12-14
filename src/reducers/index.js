import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import exampleData from './example';

export default combineReducers({
  router: routerReducer,
  exampleData
});
