const mongoose = require("mongoose");

const UserLogSchema = new mongoose.Schema(
  {
    loginTime: { type: Date, required: true },
    logoutTime: { type: Date },
    jwtToken: { type: String, required: true },
    username: { type: String, required: true },
    ipAddress: { type: String },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const transform = (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

UserLogSchema.set("toJSON", { transform });

UserLogSchema.set("toObject", { transform });

module.exports = mongoose.model("UserLog", UserLogSchema);
