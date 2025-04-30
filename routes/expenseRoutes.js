const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleWare");
const expenseController = require("../controller/expenseController");

router.post("/expenses", authMiddleware,expenseController.postExpense);

router.get("/expenses",authMiddleware, expenseController.getExpense);

router.put("/expenses/:_id",authMiddleware, expenseController.putExpense);

router.delete("/expenses/:_id",authMiddleware, expenseController.deleteExpense);

module.exports = router;