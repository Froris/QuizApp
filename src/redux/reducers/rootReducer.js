import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import createQuizReducer from './createQuizReducer';
import auth from './auth';

export default combineReducers({
  quiz: quizReducer,
  create: createQuizReducer,
  auth: auth
})