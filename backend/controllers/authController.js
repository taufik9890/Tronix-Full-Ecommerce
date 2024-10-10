const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const emailValidation = require("../helpers/emailValidation");

exports.registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.send({ error: "Please fill the all field" });
    }

    if (email && !emailValidation(email)) {
      return res.send({ error: "Email is not valid" });
    }

    if (password && password.length < 6) {
      return res.send({ error: "Password is too short" });
    }

    const existingEmail = await User.find({ email: email });

    if (existingEmail.length > 0) {
      res.send({ error: "Email already in used" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const user = new User({
          name: name,
          email: email,
          password: hash,
        });
        user.save();

        jwt.sign({ email: email }, "hello", async function (err, token) {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "esmernn2203@gmail.com",
              pass: "lmef czte zfct wmea",
            },
          });

          const info = await transporter.sendMail({
            from: '"MERNIAN"<esmernn2203@gmail.com>',
            to: user.email,
            subject: "Verification link",
            html: `Your code is <a href="http://localhost:5173/verification/${token}">Click me</a>`,
          });
        });

        res.send({
          success: "Registration successful. Please check your email",
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      bcrypt.compare(password, findUser.password, async function (err, result) {
        const token = jwt.sign(
          { id: findUser._id, email: findUser.email },
          process.env.LOGIN_TOKEN,
          { expiresIn: "24h" }
        );

        if (result) {
          return res.send({
            success: "Login success",
            token: token,
            email: findUser.email,
            name: findUser.name,
            role: findUser.role,
          });
        } else {
          return res.send({ error: "Credential not matched" });
        }
      });
    } else {
      return res.send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.linkController = async (req, res) => {
  const { token } = req.body;
  try {
    const { email } = jwt.verify(token, "hello");
    const findUser = await User.findOne({ email: email });
    if (!findUser.emailVerified) {
      await User.findOneAndUpdate({ email: email }, { emailVerified: true });
      res.send({ success: "Verification successful" });
    } else {
      res.send({ error: "email already verified" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.otpController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser.emailVerified && findUser.otp === otp) {
      await User.findOneAndUpdate(
        { email: email },
        { otp: "", emailVerified: true }
      );
      return res.send({ success: "Verification successful" });
    } else {
      return res.send({ error: "OTP not matched" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.resendMailController = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.send({ error: "User not found" });
    }
    if (!findUser.emailVerified) {
      await User.findOneAndUpdate({ email: email }, { emailVerified: true });
      jwt.sign({ email: email }, "hello", async function (err, token) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "emonh7805@gmail.com",
            pass: "atjs rzlj jyez czgp",
          },
        });
        const info = await transporter.sendMail({
          from: "Exams file",
          to: email,
          subject: "Verification link",
          html: `Here is your verification link <a href='http://localhost:5173/verification/${token}'>Click me</a>`,
        });
        res.send({ success: "Mail has been send" });
      });
    } else {
      res.send({ error: "Email already verified" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    if (email && !emailValidation(email)) {
      return res.send({ error: "Email is not valid" });
    }

    const existingUser = await User.find({ email: email });

    if (existingUser.length > 0) {
      jwt.sign({ email: email }, "hello", async function (err, token) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "emonh7805@gmail.com",
            pass: "atjs rzlj jyez czgp",
          },
        });

        const info = await transporter.sendMail({
          from: '"MERNIAN"<esmernn2203@gmail.com>',
          to: email,
          subject: "New password link",
          html: `here is your new password link. <a href="http://localhost:5173/newpassword/${token}">Click me</a>`,
        });
      });
    } else {
      res.send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.newPasswordController = async (req, res) => {
  const { password, token } = req.body;
  try {
    const { email } = jwt.verify(token, "hello");

    bcrypt.hash(password, 10, async function (err, hash) {
      await User.findOneAndUpdate({ email: email }, { password: hash });
      res.send({ success: "Password changed" });
    });
  } catch (error) {
    console.log(error);
  }
};
