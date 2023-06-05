export const postItemHandler = async (req, reply) => {
  try {
    const item = await req.server.item.create({
      item_name: req.body.item_name,
    });
    reply.send(item);
  } catch (err) {
    console.log(err);
  }
};

export const getItemsHandler = async (req, reply) => {
  try {
    const items = await req.server.item.findAll();
    reply.send(items);
  } catch (err) {
    console.log(err);
  }
};

export const getItemHandler = async (req, reply) => {
  try {
    const item = await req.server.item.findOne({
      where: { id: req.params.id },
    });
    reply.send(item);
  } catch (err) {
    console.log(err);
  }
};

export const deleteItemHandler = async (req, reply) => {
  try {
    const item = await req.server.item.findByPk(req.params.id);
    await item.destroy();
    reply.code(200).send({ msg: "Item deleted" });
    reply.send(item);
  } catch (err) {
    console.log(err);
  }
};

export const putItemHandler = async (req, reply) => {
  try {
    const item = await req.server.item.findByPk(req.params.id);
    await item.update({
      item_name: req.body.item_name,
    });
    reply.send({ msg: "Item updated" });
  } catch (err) {
    console.log(err);
  }
};
