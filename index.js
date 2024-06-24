const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");

// Define your schema
const schema = buildSchema(`
    type User {
      id: ID!
      name: String!
      email: String!
      posts: [Post]
    }
  
    type Post {
      id: ID!
      title: String!
      content: String!
      authorId: ID!
    }
  
    type Query {
      user(id: ID!): User
      post(id: ID!): Post
    }
  `);

// Dummy data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

const posts = [
  {
    id: "1",
    title: "First Post",
    content: "This is the content of the first post.",
    authorId: "1",
  },
  {
    id: "2",
    title: "Second Post",
    content: "Content of the second post goes here.",
    authorId: "2",
  },
];

// Resolver functions
const root = {
  user: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  User: {
    posts: (user) => {
      console.log("fer");
      return posts.filter((post) => post.authorId === user.id);
    },
  },
};

// Create an express server
const app = express();

// Setup GraphQL endpoint
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Start the server
app.listen(4000);
console.log("GraphQL server running at http://localhost:4000/graphql");
