const expenseModel = require("../model/expenseSchema");

const postExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const expense = await expenseModel.create({
            amount: Number(amount),
            category: category,
            description: description,
            date: date,
            userId: req.userId
        });
        if (expense) {
            res.status(200).send({ message: "Expense Added Successfully", expense });
        }
    } catch (error) {
        res.status(400).send({ message: "Failed to add expense, try again", error: error.message })
    }
};

const getExpense = async (req, res) => {
    try {
        const expense = await expenseModel.find({ userId: req.userId });
        if (expense) {
            res.status(200).send(expense);
        }
    } catch (error) {
        res.status(400).send({ message: "Error in getting data" });
    }
};

const putExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const { _id } = req.params;
        const expense = await expenseModel.findOneAndUpdate(
            { _id: _id, userId: req.userId },
            { amount, category, description, date },
            { new: true }
        );
        if (!expense) {
            return res.status(400).send({ message: "Expense Not Found" });
        }
        res.status(200).send({ message: "Expense updated Successfully" })
    } catch (error) {
        res.status(400).send({ message: "Failed to Update expense", error: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { _id } = req.params;
        const expense = await expenseModel.findByIdAndDelete({ _id: _id, userId: req.userId });
        if (!expense) {
            res.status(400).send({ message: "Expense Not found" })
        }
        res.status(200).send({ message: "Expense deleted successfully!" });
    } catch (error) {
        res.status(400).send({ message: "Error in deleting expense!" })
    }
};

module.exports = { postExpense, getExpense, putExpense, deleteExpense };