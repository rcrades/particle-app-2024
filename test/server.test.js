const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
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

test('PUT /user_preferences.json saves preferences', async () => {
  const server = await startServer();
  const port = server.address().port;
  const prefsPath = path.join(__dirname, '..', 'user_preferences.json');
  const original = fs.readFileSync(prefsPath, 'utf8');
  const newPrefs = { particleCount: 200 };

  const res = await fetch(`http://localhost:${port}/user_preferences.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPrefs)
  });

  assert.strictEqual(res.status, 200);
  const saved = JSON.parse(fs.readFileSync(prefsPath, 'utf8'));
  assert.deepStrictEqual(saved, newPrefs);

  fs.writeFileSync(prefsPath, original);
  server.close();
});
