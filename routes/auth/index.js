import {
  signUpHandler,
  signInHandler,
} from "../../controller/authController.js";
export default function authRoutes(fastify, opts, done) {
  const signUpOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signUpHandler,
  };
  const signInOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signInHandler,
  };
  fastify.post("/signup", signUpOptns);
  fastify.post("/signin", signInOptns);
  done();
}
