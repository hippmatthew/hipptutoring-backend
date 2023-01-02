const { model, Schema } = require("mongoose");

const SESSION_SCHEMA = new Schema({
  subject: String,
  session_date: String,
  session_time: String,
  session_length: String,
  zoom_id: String,
  cost: String,
});

module.exports = model("sessions", SESSION_SCHEMA);
