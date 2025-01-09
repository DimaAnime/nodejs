const express = require("express");

const {
    getUsers,
    createUser,
    getUserById,
    UpdateUser,
    DeleteUser
    } = require("../../controllers/users")


const router = express.Router();



router.route("/")
    .get(getUsers)
    .post(createUser);

router.route("/:id")
    .get(getUserById)
    .put(UpdateUser)
    .delete(DeleteUser);


module.exports = router;