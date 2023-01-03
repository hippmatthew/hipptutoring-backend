export default `#graphql
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    join_date: String!
    sessions: [String!]
  }
  type Tokened_User {
    token: String!
    user: User!
  }
  type Session {
    id: ID!
    subject: String!
    session_date: String!
    start_time: String!
    length: String!
    zoom_id: String!
    cost: String!
  }

  input registration_info {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    confirm_password: String!
  }

  type Query {
    test_query: String
  }
  type Mutation {
    register(info: registration_info): Tokened_User!
    login(email: String, password: String): Tokened_User!
    delete_user(user_id: String): User!
  }
`;
