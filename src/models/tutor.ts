import { model, Schema } from "mongoose";

type Name = {
  first: String;
  last: String;
};

type PhoneNumber = {
  international_area_code: Number;
  area_code: Number;
  exchange: Number;
  extension: Number;
};

type DateAvailability = {
  available: Boolean;
  times: [Boolean];
};

type Rules = {
  repetition: [DateAvailability];
  blacklist: [String?];
};

interface ITutor {
  name: Name;
  email: String;
  password: String;
  phone: PhoneNumber;
  join_date: String;
  rules: Rules;
}

const TUTOR_SCHEMA = new Schema<ITutor>({
  name: {
    first: String,
    last: String,
  },
  email: String,
  password: String,
  phone: {
    international_area_code: Number,
    area_code: Number,
    first_three: Number,
    last_four: Number,
  },
  join_date: String,
  rules: {
    repetition: [
      {
        available: Boolean,
        times: [Boolean],
      },
    ],
    blacklist: [String],
  },
});

export default model<ITutor>("Tutor", TUTOR_SCHEMA);
