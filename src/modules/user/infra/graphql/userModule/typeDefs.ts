import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(data: LoginInput!): LoginPayload!
    register(data: RegisterInput!): User!
    confirm(data: ConfirmInput!): Boolean!
    refreshToken: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    username: String!
  }

  input ConfirmInput {
    token: String!
  }

  type LoginPayload {
    user: User!
    accessToken: String!
  }
`;
