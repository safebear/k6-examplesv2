import { check } from 'k6';
import { RefinedResponse } from 'k6/http';

/**
 * Checks that the response of a request is ok
 * @param res k6 HTTP response object
 */
export function checkResponseOk(res: RefinedResponse<'text'>): boolean {
  return check(res, { 'Status is 200 OK': () => res.status === 200 });
}

/**
 * Checks that the response body is a string
 * @param res k6 HTTP response object
 */
export function checkResponseBodyIsString(
  res: RefinedResponse<'text'>
): boolean {
  return check(res, {
    'Response Body is String': () => typeof res.body === 'string'
  });
}
