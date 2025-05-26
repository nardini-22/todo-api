import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import mercurius from "mercurius";
import { taskRoutes } from "./modules/task/task.route";
import { schema, resolvers } from "./graphql";
import mercuriusCodegen from "mercurius-codegen";

export async function buildServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: true,
  });

  // Register plugins
  await server.register(cors, {
    origin: true,
    credentials: true,
  });

  server.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  });

  // Swagger documentation
  await server.register(swagger, {
    swagger: {
      info: {
        title: "Clean Architecture API",
        description: "API documentation with Swagger",
        version: "1.0.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "users", description: "User related end-points" }],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/docs",
  });

  await server.register(taskRoutes, { prefix: "/" });

  mercuriusCodegen(server, {
    targetPath: "./src/graphql/generated.ts",
  }).catch(console.error);

  return server;
}
