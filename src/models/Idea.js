var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const IdeaSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
  },
  { id: true }
);

// Duplicate the ID field.
IdeaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
IdeaSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const IdeaModel = mongoose.model("User", IdeaSchema);
module.exports = IdeaModel;
