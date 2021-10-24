const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const loginSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: "string",
  },
  name: {
    type: "string",
    required: true,
  },
  age: {
    type: "Number",
    required: true,
  },
});
const loginModel = mongoose.model("Login", loginSchema);
class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validate();
    if (this.errors.length > 0) {
      return;
    }
    this.user = await loginModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push("User not found");
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Password is incorrect");
      this.user = null;
      return;
    }
  }
  async register() {
    this.validate();
    if (this.errors.length > 0) {
      return;
    }
    if (!this.body.name) {
      this.errors.push("Name is required");
      return;
    }
    if (!this.body.age) {
      this.errors.push("Age is required");
      return;
    }
    if (this.body.age < 18) {
      this.errors.push("Age must be 18 or above");
      return;
    }
    const user = await loginModel.findOne({ email: this.body.email });
    if (user) {
      this.errors.push("User already exists");
      return;
    }
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(this.body.password, salt);
    this.body.password = hash;
    this.user = await loginModel.create(this.body);
  }
  validate() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email is invalid");
    }
    if (!this.body.password) {
      this.errors.push("Password is required");
    }
    if (this.body.password.length < 8 || this.body.password.length > 30) {
      this.errors.push("Password must be between 8 and 30 characters");
    }
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      name: this.body.name,
      age: this.body.age,
    };
  }
}
module.exports = Login;
