const { sequelize } = require("./src/db/connection.js");
const { app } = require("./src/app.js");
const { PORT } = require("./config.js");

const start = async (conn, server) => {
  try {
    await conn.authenticate();
    console.log("Connection has been established successfully.");
    await conn.sync({ force: false });
    console.log("Successful Sync");
    server.listen(PORT, () => {
      console.log("Listening at %d", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start(sequelize, app);
