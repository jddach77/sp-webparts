import {
  SET_USER_API_KEY,
  SET_USER_TOKEN
} from '../actions/userAuthenticateActions';

const initialState = {
  enableSubmit: false,
  apiKey: '',
  token: ''
};

export function userAuthenticateReducer(state = initialState, action:any = {}) {
  //newState gets the current state, if '...state' is used within the reducer it will be based on the previous state
  let newState = { ...state };

  switch (action.type) {
    case SET_USER_API_KEY:
      newState.apiKey = action.payload;
      newState.enableSubmit = checkParameters(newState);
      return newState;

    case SET_USER_TOKEN:
      newState.token = action.payload;
      newState.enableSubmit = checkParameters(newState);
      return newState;

    default:
      return state;
  }
}
//checkParameters is a function that checks the necessary parameters are populated and returns either true or false
const checkParameters = newState => {
  return newState.apiKey !== '' && newState.token !== '';
};
