export default `#graphql
  type Name {
    first: String!
    last: String!
  }
  type PhoneNumber {
    international_area_code: Int!
    area_code: Int!
    exchange: Int!
    extension: Int!
  }
  type DateAvailability {
    available: Boolean!
    times: [Boolean!]!
  }
  type Rules {
    repetition: [DateAvailability!]!
    blacklist: [String]!
  }
  type Student {
    id: ID!
    name: Name!
    email: String!
    password: String!
    phone: PhoneNumber!
    join_date: String!
  }
  type Tokened_Student {
    token: String!
    user: Student!
  }
  type Tutor {
    id: ID!
    name: Name!
    email: String!
    passowrd: String!
    phone: PhoneNumber!
    join_date: String!
    rules: Rules!
  }
  type Tokened_Tutor {
    token: String!
    user: Tutor!
  }

  input registration_info {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    phone_str: String!
  }

  type Query {
    get_all_students: [Student]!
    get_all_tutors: [Tutor]!
    get_student(user_id: ID): Student
    get_tutor(user_id: ID): Tutor
  }
  type Mutation {
    register_student(info: registration_info): Tokened_Student!
    register_tutor(info: registration_info): Tokened_Tutor!
    student_login(email: String, password: String): Tokened_Student!
    tutor_login(email: String, password: String): Tokened_Tutor!
    delete_student(user_id: ID): Student!
    delete_tutor(user_id: ID): Tutor!
  }
`;
