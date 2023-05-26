import bcrypt from "bcryptjs";

import Student from "../models/student.js";
import Tutor from "../models/tutor.js";

const email_regEx =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

enum AccountType {
  student,
  tutor,
}

const validate = {
  registration: async ({
    first_name,
    last_name,
    email,
    password,
    phone_str,
    account_type,
  }) => {
    interface IError {
      first_name: String;
      last_name: String;
      email: String;
      password: String;
      phone_str: String;
    }

    const errors: IError = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_str: "",
    };

    let valid = true;
    const user =
      account_type == AccountType.student
        ? await Student.findOne({ email })
        : await Tutor.findOne({ email });

    if (first_name === "") {
      errors.first_name = "Field cannot be empty";
      if (valid) valid = false;
    }

    if (last_name === "") {
      errors.last_name = "Field cannot be empty";
      if (valid) valid = false;
    }

    if (email.trim() === "") {
      errors.email = "Field cannot be empty";
      if (valid) valid = false;
    } else if (!email.match(email_regEx)) {
      errors.email = "Must be a valid email";
      if (valid) valid = false;
    } else if (user) {
      errors.email = "There is already an account with this email";
      if (valid) valid = false;
    }

    if (password === "") {
      errors.password = "Field cannot be empty";
      if (valid) valid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      if (valid) valid = false;
    }

    if (phone_str === "") {
      errors.phone_str = "Field cannot be empty";
      if (valid) valid = false;
    }

    return {
      valid,
      errors,
    };
  },
  log_in: async ({ email, password, account_type }) => {
    interface IError {
      email: string;
      password: string;
    }

    let valid = true;
    const errors: IError = {
      email: "",
      password: "",
    };

    const user =
      account_type == AccountType.student
        ? await Student.findOne({ email })
        : await Tutor.findOne({ email });
    const matched = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (email.trim() === "") {
      errors.email = "Field must not be empty";
      if (valid) valid = false;
    } else if (!email.match(email_regEx)) {
      errors.email = "Must be a valid email";
      if (valid) valid = false;
    } else if (!user) {
      errors.email = "Account with that email does not exist";
      if (valid) valid = false;
    }

    if (password === "") {
      errors.password = "Field must not be empty";
      if (valid) valid = false;
    } else if (user && !matched) {
      errors.password = "Incorrect Password";
      if (valid) valid = false;
    }

    return {
      valid,
      errors,
      user,
    };
  },
};

export default validate;
