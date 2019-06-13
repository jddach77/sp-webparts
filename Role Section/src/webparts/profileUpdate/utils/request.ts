/**
 * Get rpc request object
 * @param  {String}         methodName
 * @param  {Object}         params          Optional
 * @param  {Number|String}  idNo            Optional. Unique id used to identify the call
 *
 * @return {Object}         Rpc formatted request object
 */
function getRpcRequest(methodName, params, idNo) {
  const rpcObject:any = {
    jsonrpc: '2.0',
    method: methodName
  };

  if (params) {
    rpcObject.params = params;
  }

  if (idNo) {
    rpcObject.id = idNo;
  }

  return rpcObject;
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error:any = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Get correct endpoint for different environment
 *
 * @return {string} correct endpoint accordingly node environment
 */
function getURL(methodName) {
  let link;
  if (methodName === 'user.Authenticate') {
    link = 'auth';
  } else {
    link = 'mgp';
  }

  const HTTPS = 'https://';
  const ENDPOINT_PROD = `${HTTPS}api.dev.filtered.com/v2/jwt/${link}`;
  const ENDPOINT_TEST = `${HTTPS}api.test.filtered.com/v2/jsonrpc/${link}`;
  const ENDPOINT_DEV = `${HTTPS}api.dev.filtered.com/v2/jwt/${link}`;

  let process:any;

  // switch (true) {
  //   case process.env.NODE_ENV_CUSTOM === 'endpoint-prod':
  //     return ENDPOINT_PROD;
  //   case process.env.NODE_ENV_CUSTOM === 'endpoint-test':
  //     return ENDPOINT_TEST;
  //   case process.env.NODE_ENV_CUSTOM === 'endpoint-dev':
  //     return ENDPOINT_DEV;
  //   default:
  // }
  return ENDPOINT_DEV;

}

/**
 * Requests a URL, returning a promise
 *
 * @param  {String}         methodName
 * @param  {object}         [params]    The options we want to pass to "fetch"
 * @param  {Number|String}  idNo        Unique id used to identify the call
 * @param  {object}         jwt         Auth tokens
 *
 * @return {object}         The response data
 */
export default function request(methodName, params, idNo, jwt) {
  let authorizationData;
  if (methodName === 'user.Authenticate') {
    authorizationData = `Bearer ${jwt.apiKey} ${jwt.token}`;
  } else {
    authorizationData = 'Bearer ' + jwt;
  }
  const rpcRequest = getRpcRequest(methodName, params, idNo);
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: authorizationData,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rpcRequest)
  };

  return fetch(getURL(methodName), requestOptions)
    .then(checkStatus)
    .then(parseJSON);
}
