const { app } = require('./src/app.js')
const { sequelize } = require('./src/db/connection.js')
const { PORT } = require('./config.js')

sequelize.sync({ force: false }).then(() => {
  console.log('Successful connection')
  app.listen(PORT, () => {
    console.log('Listening at %d', PORT)
  })
})