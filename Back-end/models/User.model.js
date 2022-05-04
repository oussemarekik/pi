import mongoose from "mongoose";
var userSchema = mongoose.Schema({
  nom: { type: String, required: "nom is required" },
  email: { type: String, required: "Email is required", unique: true },
  password: { type: String, required: "Password is required" },
});

export const User = mongoose.model("user", userSchema);
