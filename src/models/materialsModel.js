const mongoose = require("mongoose");
const materialSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: false,
    default: "",
  },
  price: {
    type: "string",
    required: true,
  },
  quantity: {
    type: "number",
    required: true,
  },
  createdBy: {
    type: "string",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const materialsModel = mongoose.model("materials", materialSchema);
class Materials {
  constructor(body, id) {
    this.body = body;
    this.errors = [];
    this.body.createdBy = id;
    this.material = null;
  }
  async create() {
    this.validate();
    if (this.errors.length > 0) {
      return;
    }
    const material = await materialsModel.findOne({
      name: this.body.name,
      description: this.body.description,
    });
    if (material) {
      this.errors.push("Material already exists");
      return;
    }
    this.material = await materialsModel.create(this.body);
  }
  validate() {
    this.cleanUp();
    if (!this.body.name.length) {
      this.errors.push("Name is required");
    }
    if (!this.body.price) {
      this.errors.push("Price is required");
    }
    if (!this.body.quantity) {
      this.errors.push("Quantity is required");
    }
    if (this.body.quantity <= 0) {
      this.errors.push("Quantity must be greater than 0");
    }
  }
  async delete(id) {
    if (typeof id !== "string") {
      return;
    }
    const material = await materialsModel.findByIdAndDelete({ _id: id });
    return material;
  }
  async searchId(id) {
    if (typeof id !== "string") {
      return;
    }
    const material = await materialsModel.findById({ _id: id });
    return material;
  }
  async search() {
    const materials = await materialsModel.find().sort({ createdAt: -1 });
    return materials;
  }
  async edit(id) {
    if (typeof id !== "string") {
      return;
    }
    this.validate();
    if (this.errors.length > 0) {
      return;
    }
    this.material = await materialsModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      name: this.body.name,
      description: this.body.description,
      price: this.body.price,
      quantity: this.body.quantity,
      createdBy: this.body.createdBy,
    };
  }
}
module.exports = Materials;
