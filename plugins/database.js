import fp from "fastify-plugin";
import { Sequelize } from "sequelize";

export default fp(async (fastify, opts) => {
  console.log("database plugin");
  let sequelize = new Sequelize(
    "postgres://iush:8502@localhost:5432/sequelize_authentication"
  );
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  fastify.decorate("sequelize", sequelize);
});
