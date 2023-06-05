import fp from "fastify-plugin";
import fastifyCsrf from "@fastify/csrf-protection";
import fastifySession from "@fastify/session";

export default fp(async (fastify, opts) => {
  fastify.register(fastifyCsrf, {
    sessionPlugin: "@fastify/session",
    getToken: (req) => {
      return req.session.token;
    },
  });
});
