const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      // .select("-__v")
      .then((dbUserData) => {
        // if no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a new user
  createUser({ body }, res) {
    console.log("body");
    console.log(body);
    User.create(body)
      .then((dbUserData) => {
        console.log("dbUserData");
        console.log(dbUserData);
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a new friend to a user's friend list
  addFriend({ params, body }, res) {
    console.log("body");
    console.log(body);
    console.log("params");
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.userId },
      // push the added friend _id to the associated user's friend's array field
      { $push: { friends: params.friendId } },
      // TODO: you shouldn't be able to duplicate friends
      { new: true }
    )
      .then((dbFriendData) => {
        console.log("dbFriendData");
        console.log(dbFriendData);
        if (!dbFriendData) {
          res.status(404).send({ message: "User not found" });
          return;
        }
        res.json(dbFriendData);
      })
      .catch((err) => res.json(err));
  },

  // remove a friend from a user's friend list
  // remove reply
  removeFriend({ params }, res) {
    console.log("params");
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { friendId: params.friendId } } },
      { new: true }
    )
      .then((deletedFriend) => {
        console.log("deletedFriend");
        console.log(deletedFriend);
        if (!deletedFriend) {
          return res.status(404).json({ message: "No friend with this id!" });
        }
        res.json(deletedFriend);
      })
      .catch((err) => res.json(err));
  },
  // TODO: this route is not working properly
  removeFriend({ params }, res) {
    console.log("params");
    console.log(params);
    User.findOneAndDelete({ _id: params.friendId })
      .then((deletedFriend) => {
        console.log("deletedFriend");
        console.log(deletedFriend);
        if (!deletedFriend) {
          return res.status(404).json({ message: "No friend with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        );
      })
      .then((deletedFriend) => {
        if (!deletedFriend) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(deletedFriend);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
