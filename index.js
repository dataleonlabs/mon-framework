const url = require('url');
const querystring = require('querystring');

// Fonction de gestion des requêtes
const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const queryParams = querystring.parse(parsedUrl.query);

  if (request.method === 'GET' && parsedUrl.pathname === '/api/data') {
    // Répond à la requête GET sur /api/data
    const jsonData = {
      message: 'Ceci est une réponse GET depuis /api/data',
      queryParams: queryParams
    };
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(jsonData));
  } else if (request.method === 'POST' && parsedUrl.pathname === '/api/data') {
    // Gestion de la requête POST sur /api/data
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      const postData = querystring.parse(body);
      const jsonData = {
        message: 'Ceci est une réponse POST depuis /api/data',
        postData: postData
      };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(jsonData));
    });
  } else {
    // Route inconnue ou méthode non autorisée
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Route non trouvée ou méthode non autorisée');
  }
};

module.exports = requestHandler