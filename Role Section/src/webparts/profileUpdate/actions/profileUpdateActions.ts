export const SET_PROFILE_TOKEN = 'SET_PROFILE_TOKEN';
export const SET_PROFILE_FUNCTION = 'SET_PROFILE_FUNCTION';
export const SET_PROFILE_SECTOR = 'SET_PROFILE_SECTOR';
export const SET_PROFILE_SENIORITY = 'SET_PROFILE_SENIORITY';

export const setProfileToken = token => {
  return {
    type: SET_PROFILE_TOKEN,
    payload: token
  };
};
export const setProfileFunction = profileFunction => {
  return {
    type: SET_PROFILE_FUNCTION,
    payload: profileFunction
  };
};
export const setProfileSector = sector => {
  return {
    type: SET_PROFILE_SECTOR,
    payload: sector
  };
};
export const setProfileSeniority = seniority => {
  return {
    type: SET_PROFILE_SENIORITY,
    payload: seniority
  };
};
