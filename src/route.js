// eslint-disable-next-line object-curly-newline
const { simpanBukuHandler, tampilBukuHandler, tampilBukuBerdasarkanIdHandler, ubahBukuBerdasarkanIdHandler, hapusBukuBerdasarkanId } = require('./handler');

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: simpanBukuHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: tampilBukuHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: tampilBukuBerdasarkanIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: ubahBukuBerdasarkanIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: hapusBukuBerdasarkanId,
  },
];

module.exports = route;
