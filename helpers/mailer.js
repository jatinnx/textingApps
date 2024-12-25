import nodemailer from "nodemailer";
import User from "../models/users.model";
import bcryptjs from "bcryptjs"
import e from "express";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendEmail = async ({ email, subject, userId }) => {



    try {

        const hashToken = await bcryptjs.hash(userId.toString(), 10)
        // todo : configure mail for usege 

        if (subject === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (subject === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 360000000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "af6f86a43606a9",
                pass: "********233e"
            }
        });

        const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: subject === "VERIFY" ? "verify your email" : "reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        const info = await transport.sendMail
            (mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info
    } catch (error) {
        console.log(error)
    }
}