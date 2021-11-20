const Hapi = require('@hapi/hapi');
<<<<<<< HEAD
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['http://notesapp-v1.dicodingacademy.com'], // or ['*']
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
=======
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
	const notesService = new NotesService();

	const server = Hapi.server({
		port: 5000,
		host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});

	await server.register({
		plugin: notes,
		options: {
			service: notesService,
		},
	});

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
>>>>>>> cb01377 (restructure with hapi plugin)
};

init();
