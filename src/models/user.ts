import { model, Schema } from "mongoose";

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  join_date: string;
  sessions: string[];
}

const USER_SCHEMA = new Schema<IUser>({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  join_date: String,
  sessions: [String],
});

const User = model<IUser>("user", USER_SCHEMA);

export default User;
