const { UserInputError } = require("apollo-server");
const { hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validate_registration,
  validate_login,
} = require("../../util/validation");
const User = require("../../models/user");
const Session = require("../../models/session");

const { SECRET } = process.env;

module.exports = {
  Mutation: {
    register: async (
      _,
      { info: { first_name, last_name, email, password, confirm_password } }
    ) => {
      const { valid, errors } = await validate_registration({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      });

      if (!valid) throw new UserInputError("Registration Error", { errors });

      password = await hash(password, 12);

      const user = await new User({
        first_name,
        last_name,
        email,
        password,
        join_date: new Date().toISOString(),
        sessions: [],
      }).save();

      const token = jwt.sign({ user_id: user._id }, SECRET, {
        noTimestamp: true,
      });

      return {
        token,
        user: {
          id: user._id,
          ...user._doc,
        },
      };
    },
    login: async (_, { email, password }) => {
      const { valid, errors, user } = await validate_login({
        email,
        password,
      });

      console.log(valid);
      console.log(errors);

      if (!valid) throw new UserInputError("Login Error", { errors });

      const token = jwt.sign({ user_id: user._id }, SECRET, {
        noTimestamp: true,
      });

      return {
        token,
        user: {
          id: user._id,
          ...user._doc,
        },
      };
    },
    delete_user: async (_, { user_id }) => {
      try {
        const user = await User.findByIdAndDelete(user_id);

        const { sessions } = user;

        sessions.forEach(async (session_id) => {
          await Session.findByIdAndDelete(session_id);
        });
        user.sessions = [];

        return {
          id: user._id,
          ...user._doc,
        };
      } catch (error) {
        throw new Error("Account Deletion Error", error);
      }
    },
  },
};
