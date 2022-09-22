const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

/*
 * Note: The following variations achieve the same goal
 ** this code:
 **  -> router.route('/').get(getCallbackFunction).post(postCallbackFunction);

 ** is this same as this:
 **  -> router.get('/', getCallbackFunction);
 **  -> router.post('/' postCallbackFunction);
 */

// Set up GET all and POST at /api/user
router.route("/").get(getAllUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
