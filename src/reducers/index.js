import {combineReducers} from 'redux';
import api from './api';
import browse from './browse';
import errors from './errors';
import menu from './menu';
import track from './track';
import playList from './playList';

export default combineReducers({
  api,
  menu,
  track,
  browse,
  errors,
  playList,
})