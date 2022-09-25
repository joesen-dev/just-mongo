const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts -> GET all thoughts
router.route("/").get(getAllThoughts);
// /api/thoughts/:id -> GET thought by Id
router.route("/:id").get(getThoughtById);
// /api/thoughts/:userId -> POST create thought
router.route("/:userId").post(createThought);
// /api/thoughts/<userId>/<thoughtId> -> PUT/Delete to update/delete a thought
router.route("/:userId/:thoughtId").put(updateThought).delete(removeThought);

// TODO: create and delete reactions to thoughts
// /api/thoughts/:thoughtId/reactions -> POST/DELETE to create/delete a reaction
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
