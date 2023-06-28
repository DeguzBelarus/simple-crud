import http from 'http';

export const router = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  const url = request.url;
  const method = request.method;

  switch (url) {
    default:
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write("This route doesn't exist");
      response.end();
  }
};
