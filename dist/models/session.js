import { model, Schema } from "mongoose";
const SESSION_SCHEMA = new Schema({
    subject: String,
    session_date: String,
    start_time: String,
    length: String,
    zoom_id: String,
    cost: String,
});
const Session = model("sessions", SESSION_SCHEMA);
export default Session;
