const { nanoid } = require('nanoid');
const books = require('./books');

const simpanBukuHandler = (request, h) => {
  // eslint-disable-next-line object-curly-newline
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const simpanBuku = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  books.push(simpanBuku);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const tampilBukuHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let daftarBuku = books;

  if (name) {
    daftarBuku = daftarBuku.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading === '0') {
    daftarBuku = daftarBuku.filter((b) => b.reading === false);
  } else if (reading === '1') {
    daftarBuku = daftarBuku.filter((b) => b.reading === true);
  }

  if (finished === '0') {
    daftarBuku = daftarBuku.filter((b) => b.finished === false);
  } else if (finished === '1') {
    daftarBuku = daftarBuku.filter((b) => b.finished === true);
  }

  const response = h.response({
    status: 'success',
    data: {
      books: daftarBuku.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

const tampilBukuBerdasarkanIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const ubahBukuBerdasarkanIdHandler = (request, h) => {
  const { bookId } = request.params;

  // eslint-disable-next-line object-curly-newline
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const hapusBukuBerdasarkanId = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  simpanBukuHandler,
  tampilBukuHandler,
  tampilBukuBerdasarkanIdHandler,
  ubahBukuBerdasarkanIdHandler,
  hapusBukuBerdasarkanId,
};
