import { socketResponseType, socketResponseCode } from './constants';
import { soResponse } from './types';
import http from 'k6/http';

/**
 * This sets up your socket client connection with the backend client
 * @param domain the domain you're testing
 * @returns the sid for your socket connection
 */
export function makeConnection(domain: string): string {
  let res;

  // Establishing a `polling` transport and getting the `sid`.
  res = http.get(
    `http://${domain}/socket.io/?EIO=4&transport=polling&t=${hashDate()}`
  );

  const sid = getSid(res.body as string);

  const data = '40';
  const headers = { 'Content-type': 'text/plain;charset=UTF-8' };

  // `open` event
  res = http.post(
    `http://${domain}/socket.io/?EIO=4&transport=polling&t=${hashDate()}&sid=${sid}`,
    data,
    { headers: headers }
  );
  // `connect` event
  res = http.get(
    `http://${domain}/socket.io/?EIO=4&transport=polling&t=${hashDate()}&sid=${sid}`
  );

  return sid;
}

/**
 * This method will check:
 * 1. The type of socket.io response
 * 2. The response code
 * And act accordingly.
 * @param message the socket.io response
 */
export function checkResponse(response: string): soResponse {
  return { type: parseInt(response[0]), code: parseInt(response[1]) };
}

/**
 * In our message we're returning an array, but this may not be the case your app.
 * If that's the case, change the regex in the 'match' const.
 * @param response socketio response message
 * @returns the data from the response message
 */
export function getArrayFromRequest<T>(response: string): T {
  const match = /\[.+\]/;
  const parsedResponse = response.match(match);
  return parsedResponse ? JSON.parse(parsedResponse[0]) : 'No Response';
}

/**
 * This function will only check for 'event' messages.
 * To see what other types of messages you can check for,
 * look at the enums in constants.ts.
 * @param msg message sent from socket.io backend client
 * @param checks a function that you pass through which performs checks on the parsed message
 */
export function checkForEventMessages<T>(
  msg: string,
  checks: (messageData: T) => void
): void {
  // Check for event messages
  const msgObject =
    // you can change this to check for other message types
    checkResponse(msg).type === socketResponseType.message &&
    checkResponse(msg).code === socketResponseCode.event
      ? getArrayFromRequest<T>(msg) // get data from message
      : null;

  if (msgObject) {
    checks(msgObject);
  }
}

function hashDate(): string {
  return (+new Date()).toString(36);
}

function getSid(parserEncoding: string): string {
  const match = /{.+?}/;
  const response = parserEncoding.match(match);
  return response ? JSON.parse(response[0]).sid : 'No Response';
}
