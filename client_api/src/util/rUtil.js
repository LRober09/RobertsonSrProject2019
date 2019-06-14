const codes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

const endResponse = (responseCode, body, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(responseCode);
  res.end(JSON.stringify(body));
};

module.exports = {codes, endResponse};