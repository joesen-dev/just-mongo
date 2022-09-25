// import mongoose dependencies
const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: Use a JavaScript data library to format timestamps
      // TODO: Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// const Reaction = model("Reaction", reactionSchema);

module.exports = reactionSchema;
