const { User, Thought } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({
            message: "Thought not found",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a new user
  createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          // push the created thought's _id to the associated user's thoughts array field
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).send({ message: "User not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //   // update a thought by its _id
  //   updateThought({ params, body }, res) {
  //     Thought.findOneAndUpdate(
  //       { _id: params.thoughtId },
  //       { $push: { replies: body } }
  //       //   {
  //       //     new: true,
  //       //     // runValidators: true - include this explicit setting when updating data so that it knows to validate any new information
  //       //     runValidators: true,
  //       //   }
  //     )
  //       .then((dbPizzaData) => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: "No reply found with this id!" });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch((err) => res.json(err));
  //   },

  //   // delete a thought
  //   removeComment() {},
};

module.exports = thoughtController;
