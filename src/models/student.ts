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

interface IStudent {
  name: Name;
  email: String;
  password: String;
  phone: PhoneNumber;
  join_date: String;
}

const STUDENT_SCHEMA = new Schema<IStudent>({
  name: {
    first: String,
    last: String,
  },
  email: String,
  password: String,
  phone: {
    international_area_code: Number,
    area_code: Number,
    exchange: Number,
    extension: Number,
  },
  join_date: String,
});

export default model<IStudent>("Student", STUDENT_SCHEMA);
