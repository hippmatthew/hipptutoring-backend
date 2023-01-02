const { compare } = require("bcryptjs");

const User = require("../models/user");

const email_regEx =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports = {
  validate_registration: async ({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  }) => {
    const errors = {};

    const user = await User.findOne({ email });

    if (first_name === "") errors.first_name = "Field cannot be empty";

    if (last_name === "") errors.last_name = "Field cannot be empty";

    if (email.trim() === "") errors.email = "Field cannot be empty";
    else if (!email.match(email_regEx)) errors.email = "Must be a valid email";
    else if (user) errors.email = "There is already an account with this email";

    if (password === "") errors.password = "Field cannot be empty";

    if (confirm_password === "")
      errors.confirm_password = "Field cannot be empty";
    else if (confirm_password != password)
      errors.confirm_password = "Must match password field";

    return {
      valid: Object.keys(errors) < 1,
      errors,
    };
  },
  validate_login: async ({ email, password }) => {
    const errors = {};

    const user = await User.findOne({ email });

    const matched = user ? await compare(password, user.password) : false;

    if (email.trim() === "") errors.email = "Field must not be empty";
    else if (!email.match(email_regEx)) errors.email = "Must be a valid email";
    else if (!user) errors.email = "Account with that email does not exist";

    if (password === "") errors.password = "Field must not be empty";
    else if (user && !matched) errors.password = "Incorrect Password";

    return {
      valid: Object.keys(errors) < 1,
      errors,
      user,
    };
  },
};
