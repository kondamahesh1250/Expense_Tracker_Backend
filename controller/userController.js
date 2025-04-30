require('dotenv').config();
const userModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).send({ message: "User already exits! Please login!" });
        }
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).send({ message: "User registerd Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await userModel.findOne({ email });

        if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: userExists._id }, secret, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const verifyUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("name email");
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send({ message: "Error getting user", error: error.message });
    }
};

module.exports = { postUser, getUser, verifyUser };
