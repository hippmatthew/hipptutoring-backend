import Student from "../../models/student.js";
import Tutor from "../../models/tutor.js";

export default {
  get_all_students: async () => {
    try {
      return await Student.find();
    } catch (err) {
      throw new Error(err);
    }
  },
  get_all_tutors: async () => {
    try {
      return await Tutor.find();
    } catch (err) {
      throw new Error(err);
    }
  },
  get_student: async (_, { user_id }) => {
    try {
      const student = await Student.findById(user_id);
      return {
        id: student._id,
        ...student,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  get_tutor: async (_, { user_id }) => {
    try {
      const tutor = await Tutor.findById(user_id);
      return {
        id: tutor._id,
        ...tutor,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};
