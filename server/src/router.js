const express = require("express");
const isLoggedIn = require("./middleware/isLoggedIn");
const router = express.Router();
//Creates all routes with auth
router.post("/login", require("./routes/loginRoute"));
router.get("/todos", isLoggedIn, require("./routes/readTodosRoute"));
router.post("/register", require("./routes/registerRoute"));
router.post("/addtodo", isLoggedIn, require("./routes/addTodoRoute"));
router.put("/todos/:todoId", isLoggedIn, require("./routes/updateTodoRoute"));
router.delete(
  "/todos/:todoId",
  isLoggedIn,
  require("./routes/deleteTodoRoute")
);

module.exports = router;
