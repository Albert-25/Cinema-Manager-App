import { Service } from './service'

const api = new Service()

test('Test service', async () => {
  const res = await api.testConnection()
  expect(res.msg).toEqual('pong')
})