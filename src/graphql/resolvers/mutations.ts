import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

import Student from "../../models/student.js";
import Tutor from "../../models/tutor.js";
import validate from "../../util/validation.js";
import generate_phonenumber_from_string from "../../util/conversion_function.js";
import generate_default_rules from "../../util/default_rules.js";

const { SECRET } = process.env;

enum AccountType {
  student,
  tutor,
}

export default {
  register_student: async (
    _,
    { info: { first_name, last_name, email, password, phone_str } }
  ) => {
    const { valid, errors } = await validate.registration({
      first_name,
      last_name,
      email,
      password,
      phone_str,
      account_type: AccountType.student,
    });
    if (!valid) throw new Error("student registration error");

    password = await bcrypt.hash(password, 12);

    const phone = generate_phonenumber_from_string(phone_str);

    const student = await new Student({
      name: {
        first: first_name,
        last: last_name,
      },
      email,
      password,
      phone,
      join_date: new Date().toISOString(),
    }).save();

    const token = jwt.sign({ user_id: student._id }, SECRET, {
      noTimestamp: true,
    });

    return {
      token,
      user: {
        id: student._id,
        ...student,
      },
    };
  },
  register_tutor: async (
    _,
    { info: { first_name, last_name, email, password, phone_str } }
  ) => {
    const { valid, errors } = await validate.registration({
      first_name,
      last_name,
      email,
      password,
      phone_str,
      account_type: AccountType.tutor,
    });
    if (!valid) throw new Error("tutor registration error");

    password = await bcrypt.hash(password, 12);

    const phone = generate_phonenumber_from_string(phone_str);
    const rules = generate_default_rules();

    const tutor = await new Tutor({
      name: {
        first: first_name,
        last: last_name,
      },
      email,
      password,
      phone,
      join_date: new Date().toISOString(),
      rules,
    }).save();

    const token = jwt.sign({ user_id: tutor._id }, SECRET, {
      noTimestamp: true,
    });

    return {
      token,
      user: {
        id: tutor._id,
        ...tutor,
      },
    };
  },
  student_login: async (_, { email, password }) => {
    const { valid, errors, user } = await validate.log_in({
      email,
      password,
      account_type: AccountType.student,
    });
    if (!valid) throw new Error("student login error");

    const token = jwt.sign({ user_id: user._id }, SECRET, {
      noTimestamp: true,
    });

    return {
      token,
      user: {
        id: user._id,
        ...user,
      },
    };
  },
  tutor_login: async (_, { email, password }) => {
    const { valid, errors, user } = await validate.log_in({
      email,
      password,
      account_type: AccountType.tutor,
    });
    if (!valid) throw new Error("tutor login error");

    const token = jwt.sign({ user_id: user._id }, SECRET, {
      noTimestamp: true,
    });

    return {
      token,
      user: {
        id: user._id,
        ...user,
      },
    };
  },
  delete_student: async (_, { user_id }) => {
    try {
      // remove all tutoring sessions linked to this student
      // notify all tutors involved that the student has cancelled their session

      const deleted_user = await Student.findByIdAndDelete(user_id);

      return {
        id: deleted_user._id,
        ...deleted_user,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  delete_tutor: async (_, { user_id }) => {
    try {
      // tutor must complete all scheduled sessions with their students before account deletion will work
      // create a validation function for the above situation

      const deleted_user = await Tutor.findByIdAndDelete(user_id);

      return {
        id: deleted_user._id,
        ...deleted_user,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};
