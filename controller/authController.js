export const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.user.create({
      username: req.body.username,
      password: req.body.password,
    });
    reply.send(user);
  } catch (err) {
    console.log(err);
  }
};

export const signInHandler = async (req, reply) => {
  try {
    const user = await req.server.user.findOne({
      where: { username: req.body.username },
    });
    if (user.password === req.body.password) {
      console.log("\nYou Here\n");
      await req.session.set("user", user);
      const token = await reply.generateCsrf();
      req.session.token = token;
      reply.send({ msg: "Logged in", token: token });
    } else {
      reply.send({ msg: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
  }
};
