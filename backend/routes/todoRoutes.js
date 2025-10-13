const express = require("express");
const todoController = require("../controllers/todoControllers")
const router = express.Router();
const {checkAuth} = require("../middleware/auth")

router.post("/create", checkAuth, todoController.createTodo);
router.get("/get", checkAuth, todoController.getTodos);
router.delete("/delete/:id", checkAuth, todoController.deleteTodo);
router.put("/update/:id", checkAuth, todoController.updateTodo);

router.get("/get/:id", checkAuth, todoController.todoDetails);

router.put("/status/:id",checkAuth, todoController.status)

module.exports = router;

