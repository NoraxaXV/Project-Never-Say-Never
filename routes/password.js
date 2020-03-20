require('dotenv').config();

const express = require('express');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post('/forgot-password', asyncMiddleware(async (req, res, next) => {
  console.log("Attempting to send email...");
	
	const { email } = req.body;
  const user = await UserModel.findOne({ email });
	if (!user) {
    res.status(400).json({ 'message': 'invalid email' });
    return;
  }

  // create user token
  const buffer = crypto.randomBytes(20);
  const token = buffer.toString('hex');

  // update user reset password token and exp
  await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });

  // send user password reset email
  const data = {
    to: user.email,
    from: email,
    template_id: process.env.SG_RESET_PASSWORD_EMAIL,
    subject: 'Phaser Leaderboard Password Reset',
    dynamic_template_data: {
      url: `https://MMORPG-Tutorial-with-Phaser--aaronsmith8.repl.co/reset-password.html?token=${token}`,
      name: user.name
    }
  };

	
	await sgMail.send(data);
	
	res.status(200).json({ message: 'An email has been sent to your email. Password reset link is only valid for 10 minutes.' });
}));


router.post('/reset-password', asyncMiddleware(async (req, res, next) => {
  
	const user = await UserModel.findOne({ resetToken: req.body.token, resetTokenExp: { $gt: Date.now() } });
  if (!user) {
    res.status(400).json({ 'message': 'invalid token' });
    return;
  }

  // ensure provided password matches verified password
  if (req.body.password !== req.body.verifiedPassword) {
    res.status(400).json({ 'message': 'passwords do not match' });
    return;
  }
	console.log("Sending reset confirmation...");

  // update user model
  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  await user.save();

  // send user password update email
  const data = {
    to: user.email,
    from: email,
    template_id: process.env.SG_RESET_CONFIRM_EMAIL,
    subject: 'Phaser Leaderboard Password Reset Confirmation',
    dynamic_template_data: {
      name: user.name
    }
  };
	await sgMail.send(data);

  res.status(200).json({ message: 'password updated' });
}));

module.exports = router;
