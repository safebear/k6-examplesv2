import http from 'k6/http';
import { parseJsonResponse } from './parse-responses';

const res = http.request('GET', 'https://anything/this/is/mocked');
const defaultData = ['a'];

test('Parsing a response', () => {
  expect(parseJsonResponse(res, defaultData)).toEqual(['a', 'b', 'c']);
});

// Todo: Need to add a test for a failed response
