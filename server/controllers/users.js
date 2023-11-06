const express = require("express");
const router = express.Router();
const user = require("../models/user");
const {
  signToken,
  signRefreshToken,
  verifyToken,
  verifyRefreshToken,
  invalidateToken
} = require("../middleware/auth");
const { validateEmail } = require("../middleware/emailValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user ===
router.post("/api/users/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, username, preference } = req.body;

    if (!email || !password || !passwordCheck || !username || !preference) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const validEmail = await validateEmail(email);
    if (!validEmail)
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long" });
    }

    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Passwords do not match. Please try again" });
    }

    if (await User.findOne({ email: email })) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await new User({
      email: email,
      password: passwordHash,
      username: username,
      preference: preference,
    });
    const savedUser = await newUser.save();
    const token = await signToken(savedUser._id);
    const refreshToken = await signRefreshToken(savedUser._id);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(201).json({
      token: token,
      userId: savedUser._id
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login user ===
router.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentails" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (isMatch && user && email && password) {
      const token = await signToken(user._id);
      const refreshToken = await signRefreshToken(user._id);

      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.status(200).json({
        token: token,
        userId: user._id
      });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Logout user ===
router.post("/api/users/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const result = await invalidateToken(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Change password ===
router.patch("/api/users/:id", (req, res) => {
  User.findById(req.params.id, async function (err, user) {
    if (err) { return next(err); }
    if (user === null) {
      return res.status(404)
    }
    const { password, passwordCheck } = req.body;
    if (!password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Passwords do not match. Please try again" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash
    await user.save()
    res.status(200).json(user)
  });
})

// Get new refresh token and normal token ===
router.post("/api/users/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const refreshTokenStatus = await verifyRefreshToken(refreshToken);
    if (!refreshTokenStatus) res.status(400).json("Invalid token");
    if (refreshTokenStatus) {
      var decoded = await jwt.decode(refreshToken, { complete: true });
      const userId = decoded.payload.aud;
      const newToken = await signToken(userId);
      const newRefreshToken = await signRefreshToken(userId);
      await invalidateToken(refreshToken);

      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
      res.status(200).json({
        token: newToken,
        userId: userId,
      });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Get all users ===
router.get("/api/users", function (req, res, next) {
  user.find(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ user: user });
  });
});

// Get specific user ===
router.get("/api/users/:id", function (req, res, next) {
  var id = req.params.id;
  user.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({ message: "user not found!" });
    }
    res.json(user);
  });
});

// Delete specific user ===
router.delete("/api/users/:id", function (req, res, next) {
  var id = req.params.id;
  user.findOneAndDelete({ _id: id }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  });
});

module.exports = router;
