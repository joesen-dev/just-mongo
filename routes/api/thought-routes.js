const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
} = require("../../controllers/thought-controller");

// /api/thoughts -> GET all thoughts
router.route("/").get(getAllThoughts);
// /api/thoughts/:id -> GET thought by Id
router.route("/:id").get(getThoughtById);
// /api/thoughts/:userId -> POST create thought
router.route("/:userId").post(createThought);

// /api/thoughts/<userId>/<thoughtId> -> PUT to update a thought
router.route("/:userId/:thoughtId").put(updateThought).delete(removeThought);

module.exports = router;
