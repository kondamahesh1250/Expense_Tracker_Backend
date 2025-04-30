const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    }

});

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = expenseModel;