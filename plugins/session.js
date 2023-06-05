import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

export default fp(async (fastify, opts) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: "mysecretkeywhichhaslengthof32characters",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 360000,
      expires: Date.now() + 360000,
      // sameSite: "none",
    },
    cookieName: "sessionId",
    saveUninitialized: false,
  });

  fastify.decorate("authenticate", async (req, reply) => {
    console.log("\nYou are here\n");
    console.log(req.session.user);
    const user = await req.session.get("user");

    if (user) {
      console.log("You are authenticated");
    } else {
      reply.code(404).send({ msg: "Please login" });
    }
  });
});
