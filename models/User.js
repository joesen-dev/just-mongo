// import mongoose dependencies
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: "Please enter a username",
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: "Please enter an email address",
      unique: true,
      // must be a valid email address (look into Mongoose's matching validation)
      match: [/.+@.+\..+/],
    },
    thoughts: [
      // Array of _id values referencing the Thought model
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      // Array of _id values referencing the User model (self-reference)
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // tell the Mongoose model that it should use any getter (victuals) function we've specified
      getters: true,
    },
    id: false,
  }
);

// Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

// create the USer model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
