import { model, Schema } from "mongoose";

interface ISession {
  subject: string;
  session_date: string;
  start_time: string;
  length: string;
  zoom_id: string;
  cost: string;
}

const SESSION_SCHEMA = new Schema<ISession>({
  subject: String,
  session_date: String,
  start_time: String,
  length: String,
  zoom_id: String,
  cost: String,
});

const Session = model("sessions", SESSION_SCHEMA);

export default Session;
