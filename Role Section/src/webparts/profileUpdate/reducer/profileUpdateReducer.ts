import {
  SET_PROFILE_TOKEN,
  SET_PROFILE_FUNCTION,
  SET_PROFILE_SECTOR,
  SET_PROFILE_SENIORITY
} from '../actions/profileUpdateActions';

const initialState = {
  enableSubmit: false,
  accessToken: '',
  profileFunction: '',
  sector: '',
  seniority: ''
};

export function profileUpdateReducer(state = initialState, action:any = {}) {
  //newState gets the current state, if '...state' is used within the reducer it will be based on the previous state
  let newState = { ...state };

  switch (action.type) {
    case SET_PROFILE_TOKEN:
      newState.accessToken = action.payload;
      newState.enableSubmit = checkParameters(newState);
      return newState;

    case SET_PROFILE_FUNCTION:
      newState.profileFunction = action.payload;
      newState.enableSubmit = checkParameters(newState);
      return newState;

    case SET_PROFILE_SECTOR:
      newState.sector = action.payload;
      newState.enableSubmit = checkParameters(newState);
      return newState;

    case SET_PROFILE_SENIORITY:
      newState.seniority = action.payload;
      newState.enableSubmit = checkParameters(newState);
      return newState;

    default:
      return state;
  }
}
//checkParameters is a function that checks the necessary parameters are populated and returns either true or false
const checkParameters = newState => {
  return newState.accessToken !== '';
};
