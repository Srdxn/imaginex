import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name, email: user.email } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, user: { name: user.name, email: user.email } });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};


const userCredits = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user: { name: user.name, credits: user.creditBalance } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {

        const userId = req.userId;
        const { planId } = req.body;

        const userData = await userModel.findById(userId);

        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing Details" });
        }

        let credits, plan, amount, date;

        switch (planId) {
            case "Basic":
                plan = "Basic";
                amount = 25;
                credits = 30;
                break;

            case "Advanced":
                plan = "Advanced";
                amount = 50;
                credits = 70;
                break;

            case "Premium":
                plan = "Premium";
                amount = 150;
                credits = 230;
                break;

            default:
                return res.json({ success: false, message: "Invalid Plan" });
        }

        date = Date.now();

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error.message });
            }

            res.json({ success: true, order });
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const verifyRazorpay = async (req, res) => {
    try {

        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if(orderInfo.status === "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt);


            if(transactionData.payment) {
                return res.json({ success: false, message: "Payment failed" });
            }

            const userData = await userModel.findById(transactionData.userId);

            const creditBalance = userData.creditBalance + transactionData.credits;

            await userModel.findByIdAndUpdate(userData._id, { creditBalance });

            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            return res.json({ success: true, message: "Credits added to the remaining balance" });

        } else {
            res.json({ success: false, message: "Payment failed" });
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };