const { sequelize } = require('./src/db/connection.js')
const { app } = require('./src/app.js')
const { PORT } = require('./config.js')

sequelize.sync({ force: true }).then(() => {
  console.log('Successful Sync')
  app.listen(PORT, () => {
    console.log('Listening at %d', PORT)
  })
}).catch(err => console.log(err))