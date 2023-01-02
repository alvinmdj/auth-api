const Hapi = require('@hapi/hapi');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
  ]);

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      value: 'Hello world!',
    }),
  });

  server.ext('onPreResponse', (request, h) => {
    // get response context from request
    const { response } = request;

    if (response instanceof Error) {
      // if response is an error, handle as needed
      const translatedError = DomainErrorTranslator.translate(response);

      // handle client error internally
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // persist Hapi native client error handling (404 route, etc)
      // isServer is a property of Hapi native error response
      if (!translatedError.isServer) {
        return h.continue;
      }

      // handle server error as needed
      const newResponse = h.response({
        status: 'error',
        message: 'Something wrong on the server',
      });
      newResponse.code(500);
      return newResponse;
    }

    // if response is not an error, continue
    return h.continue;
  });

  return server;
};

module.exports = createServer;
