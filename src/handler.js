const { nanoid } = require('nanoid');
const notes = require('./notes');

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const res = h.response({
      status: 'success',
      message: 'catatan berhasil dihapus.',
    });
    res.code(200);
    res.header('Content-Type', 'application/json');
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'catatan gagal dihapus, Id tidak ditemukan.',
  });
  res.code(404);
  res.header('Content-Type', 'application/json');
  return res;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index], title, tags, body, updatedAt,
    };

    const res = h.response({
      status: 'success',
      message: 'catatan berhasil diperbarui.',
    });

    res.code(200);
    res.header('Content-Type', 'application/json');
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'gagal memperbarui catatan, Id tidak ditemukan.',
  });

  res.code(404);
  res.header('Content-Type', 'application/json');
  return res;
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    const res = h.response({
      status: 'success',
      data: {
        note,
      },
    });
    res.code(200);
    res.header('Content-Type', 'application/json');
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  res.code(404);
  res.header('Content-Type', 'application/json');
  return res;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan.',
      id: {
        noteId: id,
      },
    });
    res.code(201);
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'catatan gagal ditambahkan.',
  });
  res.code(500);
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
  return res;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
