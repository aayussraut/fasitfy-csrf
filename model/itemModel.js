import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  const item = fastify.sequelize.define("items", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  try {
    await item.sync();
  } catch (err) {
    console.log(err);
  }
  fastify.decorate("item", item);
});
