// import mongoose dependencies
const { Schema, model } = require("mongoose");

const ReactionSchema = new Schema({
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
});

const ThoughtSchema = new Schema({
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
  reactions: [ReactionSchema], // Array of nested documents created with the reactionSchema
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
