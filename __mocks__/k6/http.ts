import { RefinedResponse } from 'k6/http';

export default {
  request: jest.fn(() => {
    return {
      json: jest.fn(key => key),
      status: 200,
      timings: {
        duration: 0
      },
      body: '["a","b","c"]'
    };
  })
};
