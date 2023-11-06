const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  //Expire after 7d + 60s since the tokens are valid for 7d 604860
  //expireAt: { type: Date, expires: "120", default: Date.now },
  expiresAt: { type: Date, expires: "604860s", default: Date.now },
  token: { type: String, required: true },
});

module.exports = blacklistedToken = mongoose.model(
  "blacklistedToken",
  tokenSchema
);
