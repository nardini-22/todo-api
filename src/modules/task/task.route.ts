import { FastifyInstance } from "fastify";

export const taskRoutes = async (server: FastifyInstance) => {
  server.get("/", {}, async (request, reply) => {
    const query = "{ add(x: 2, y: 2) }";
    return reply.graphql(query);
  });
};
