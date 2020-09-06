import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type Member {
    userId: ID!
    workspaceId: ID!
    fullName: String!
    displayName: String
    isAdmin: Boolean
  }

  type Workspace {
    id: ID!
    name: String!
    ownerId: ID!
    members: [Member]
  }

  extend type Mutation {
    createWorkspace(data: CreateWorkspaceInput!): Workspace!
  }

  input CreateWorkspaceInput {
    name: String!
  }
`;
