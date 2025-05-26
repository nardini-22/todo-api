import { prisma } from "@/infra/prisma-client";
import { DateTimeResolver, VoidResolver } from "graphql-scalars";
import { IResolvers } from "mercurius";

export const resolvers: IResolvers = {
  DateTime: DateTimeResolver,
  Void: VoidResolver,
  Query: {
    tasks: async () => prisma.task.findMany(),
    task: async (_, args) =>
      prisma.task.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    addTask: async (_, { task }) =>
      prisma.task.create({
        data: {
          description: task.description,
          done: task.done ?? undefined,
        },
      }),
    updateTask: async (_, { id, task }) =>
      prisma.task.update({
        where: {
          id,
        },
        data: {
          description: task.description ?? undefined,
          done: task.done ?? undefined,
        },
      }),
    deleteTask: async (_, { id }) =>
      prisma.task.delete({
        where: { id },
      }),
  },
};
