const { simpanBukuHandler } = require('./handler');

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: simpanBukuHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: () => {},
  },
];

module.exports = route;
