// models/Celebrity.model.js

const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
  {
    timestamps: true
  },
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;