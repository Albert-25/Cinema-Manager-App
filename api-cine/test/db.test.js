const { sequelize } = require('../src/db/connection')
const { User } = require('../src/db/models/user')

beforeAll(async () => {
  await User.sync({ force: false })
})

describe('USER model', () => {
  test('Username and Passwd to be not null', async () => {
    try {
      await User.create({})
    } catch (e) {
      expect(e.name).toEqual('SequelizeValidationError')
      expect(e.message).toEqual(expect.stringMatching('User.username cannot be null'))
      expect(e.message).toEqual(expect.stringMatching('User.passwd cannot be null'))
      expect(e.message).toEqual(expect.stringMatching('User.role cannot be null'))
    }
  })
  test('Username to be unique', async () => {
    await User.create({ username: 'test username to be unique', passwd: 'test passwd', role: 'role' })
    try {
      await User.create({ username: 'test username to be unique', passwd: 'test passwd', role: 'role' })
    } catch (e) {
      expect(e.name).toEqual('SequelizeUniqueConstraintError')
    }
  })
})


afterAll(async () => {
  await User.destroy({ where: { username: 'test username to be unique' } })
  sequelize.close()
})