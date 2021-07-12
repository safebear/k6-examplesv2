import http from 'k6/http';
import { checkResponseOk, checkResponseBodyIsString } from './check-responses';

const res = http.request('GET', 'https://anything/this/is/mocked');

test('Check a response is OK', () => {
  expect(checkResponseOk(res)).toEqual(true);
});

test('Check response body is string', () => {
  expect(checkResponseBodyIsString(res)).toEqual(true);
});
