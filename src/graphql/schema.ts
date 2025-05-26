import { gql } from "mercurius-codegen";

export const schema = gql`
  #graphql
  scalar DateTime
  scalar Void

  type Task {
    id: ID!
    description: String!
    done: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    addTask(task: AddTaskInput!): Task
    updateTask(id: ID!, task: UpdateTaskInput!): Task
    deleteTask(id: ID!): Void
  }

  input AddTaskInput {
    description: String!
    done: Boolean
  }

  input UpdateTaskInput {
    description: String
    done: Boolean
  }
`;
