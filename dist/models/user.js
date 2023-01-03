import { model, Schema } from "mongoose";
const USER_SCHEMA = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    join_date: String,
    sessions: [String],
});
const User = model("user", USER_SCHEMA);
export default User;
