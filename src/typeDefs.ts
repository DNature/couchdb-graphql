export default `
  type Doc {
    name: String!
    email: String!
    age: Int!
    nice: Boolean!
    updated: Boolean
  }

   type Mutation {
    createRecord(name: String!, email: String!, age: Int!, nice: Boolean!): Boolean!
    delete(id: String, rev: String): Boolean!
    update(id: String, rev: String, updated: Boolean): Boolean!
  }
  
  type Query {
    findAll: [Doc!]
    findSingle(id: String!): Doc!
  }
`;
