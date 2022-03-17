const supertest = require('supertest')
const { app } = require('../src/app')
const api = supertest(app)

describe('Peliculas route', () => {
  describe('GET /peliculas', () => {
    test('Get title, without match', async () => {
      const response = await api.get('/peliculas/?title=title_movie')
      expect(response.status).toEqual(404);
      expect(response.text).toMatch(/Not found/);
    })
    test('Get title, with bad query', async () => {
      const response = await api.get('/peliculas/?titulo=title_movie')
      expect(response.status).toEqual(404);
      expect(response.text).toMatch(/Not found/);
    })
  })
})
