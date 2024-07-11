const express = require("express");
const isLoggedIn = require("./middleware/isLoggedIn");
const router = express.Router();

router.post("/login", require("./routes/loginRoute"));
router.get("/todos", isLoggedIn, require("./routes/readTodosRoute"));
router.post("/register", require("./routes/registerRoute"));
router.post("/addtodo", isLoggedIn, require("./routes/addTodoRoute"));

module.exports = router;
