var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8011 });

server.route({
    method: 'GET',
    path: '/alexa',
    handler: function (request, reply) {
        reply('The connection to the server works!');
    }
});

server.route({
    method: 'GET',
    path: '/alexa/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
