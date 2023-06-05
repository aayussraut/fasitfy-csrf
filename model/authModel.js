import fp from "fastify-plugin";
import { DataTypes } from "sequelize";
export default fp(async (fastify, opts) => {
  const user = fastify.sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  try {
    await user.sync();
  } catch (err) {
    console.log(err);
  }
  fastify.decorate("user", user);
});
