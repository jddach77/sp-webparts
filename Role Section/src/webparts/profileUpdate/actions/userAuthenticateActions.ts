export const SET_USER_API_KEY = 'SET_USER_API_KEY';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const setUserAPIKey = key => {
  return {
    type: SET_USER_API_KEY,
    payload: key
  };
};
export const setUserToken = token => {
  return {
    type: SET_USER_TOKEN,
    payload: token
  };
};
export const setAccessToken = accessToken => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: accessToken
  };
};
