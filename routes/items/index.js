import {
  postItemHandler,
  getItemHandler,
  getItemsHandler,
  putItemHandler,
  deleteItemHandler,
} from "../../controller/itemController.js";

export default function itemRoutes(fastify, opts, done) {
  const postItemOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
    onRequest: fastify.csrfProtection,
    preValidation: fastify.authenticate,
    handler: postItemHandler,
  };

  const getItemsOptns = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item_name: { type: "string" },
            },
          },
        },
      },
    },
    onRequest: fastify.csrfProtection,
    preValidation: fastify.authenticate,
    handler: getItemsHandler,
  };

  const getItemOptns = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            item_name: { type: "string" },
          },
        },
      },
    },
    onRequest: fastify.csrfProtection,
    preValidation: fastify.authenticate,
    handler: getItemHandler,
  };
  const putItemOptns = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },

      // response: {
      //   200: {
      //     type: "object",
      //     properties: {
      //       item_name: { type: "string" },
      //     },
      //   },
      // },
    },
    onRequest: fastify.authenticate,
    handler: putItemHandler,
  };
  const deleteItemOptns = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            msg: { type: "string" },
          },
        },
      },
    },
    onRequest: fastify.csrfProtection,
    preValidation: fastify.authenticate,
    handler: deleteItemHandler,
  };

  fastify.get("/", getItemsOptns);
  fastify.post("/", postItemOptns);
  fastify.get("/:id", getItemOptns);
  fastify.put("/:id", putItemOptns);
  fastify.delete("/:id", deleteItemOptns);
  done();
}
