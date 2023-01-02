const { model, Schema } = require("mongoose");

const USER_SCHEMA = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  join_date: String,
  sessions: [
    {
      session_id: String,
      subject: String,
      session_date: String,
      session_time: String,
      zoom_id: String,
      cost: String,
    },
  ],
});

module.exports = model("users", USER_SCHEMA);
