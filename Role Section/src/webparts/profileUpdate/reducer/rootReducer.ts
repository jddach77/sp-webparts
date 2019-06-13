import { combineReducers } from 'redux';
import { profileUpdateReducer } from './profileUpdateReducer';
import { userAuthenticateReducer } from './userAuthenticateReducer';

//combineReducer is a function that take an object of reducers and produces a single reducer
const rootReducer = combineReducers({
  userAuthenticate: userAuthenticateReducer,
  profileUpdate: profileUpdateReducer
});

export default rootReducer;
