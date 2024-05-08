const { response } = require("express");

const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
