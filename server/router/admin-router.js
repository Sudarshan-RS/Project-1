const express = require ("express");
const {getAllUsers, getAllContacts, deleteUsersById, updateUsersById, getUserById, deleteContactById} = require("../controllers/admin-controller");
const { models, Model } = require("mongoose");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, updateUsersById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, deleteUsersById);
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, deleteContactById);


module.exports = router;