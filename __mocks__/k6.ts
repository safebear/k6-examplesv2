export const group = jest.fn((name, callback) => callback());

export const check = jest.fn(() => true);

export const fail = jest.fn(() => {
  throw new Error('Error');
});
