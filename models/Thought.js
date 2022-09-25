// import mongoose dependencies
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: Use a JavaScript data library to format timestamps
      // TODO: Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
