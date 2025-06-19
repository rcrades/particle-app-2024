const test = require('node:test');
const assert = require('node:assert');
const app = require('../server');

function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

test('GET /defaults.json returns particleCount', async () => {
  const server = await startServer();
  const port = server.address().port;
  const res = await fetch(`http://localhost:${port}/defaults.json`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.ok('particleCount' in json);
  server.close();
});


test('GET /user_preferences.json returns particleCount', async () => {
  const server = await startServer();
  const port = server.address().port;
  const res = await fetch(`http://localhost:${port}/user_preferences.json`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.ok('particleCount' in json);
  server.close();
});
