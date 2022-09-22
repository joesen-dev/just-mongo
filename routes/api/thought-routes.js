const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
} = require("../../controllers/thought-controller");

// Set up GET all thoughts
router.route("/").get(getAllThoughts);
// /api/thoughts/<userId>
router.route("/:userId").post(createThought);

// /api/comments/<userId>/<thoughtId>
// router.route("/:userId/:thoughtId").put(addReply).delete(removeComment);
router.route("/:id").get(getThoughtById);
// .put(updateUser).delete(deleteUser);

// TODO: PUT to update a thought by its _id
// TODO: DELETE to remove a thought by its _id

module.exports = router;
