import { checkResponseBodyIsString } from './check-responses';
import { RefinedResponse } from 'k6/http';

/**
 * This will parse the JSON object of any HTTP response body.
 * You will need to provide some dummy data so the test continues even if the response is not what is expected.
 * If this happens, checks will fail in the final report, but there will be no `undefined` failures that crash the test.
 * @param res k6 HTTP response object
 * @param defaultData some dummy data
 * @returns the parsed JSON body
 */
export function parseJsonResponse<T>(
  res: RefinedResponse<'text'>,
  defaultData: T
): T {
  // Check our response body is a string and parse it
  if (checkResponseBodyIsString(res)) {
    return JSON.parse(res.body);
  } else {
    return defaultData;
  }
}
