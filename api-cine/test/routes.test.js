const supertest = require('supertest')
const { app } = require('../src/app')
const api = supertest(app)

test('GET /pin', async () => {
  const response = await api.get('/pin')
  expect(response.header["content-type"]).toMatch(/application\/json/);
  expect(response.status).toEqual(200);
  expect(response.body.msg).toEqual('pong')
});

