const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    validate: {
      validator: function(v) {
        return v && v.trim().length > 0;
      },
      message: "Title must not be empty"
    }
  },
  description: { type: String, default: "" },
  progress: {
    type: Number,
    min: [0, "Progress cannot be less than 0"],
    max: [100, "Progress cannot be more than 100"],
    default: 0
  }
})


const transform = (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

TaskSchema.set('toJSON', { transform });

TaskSchema.set('toObject', { transform });

module.exports = mongoose.model('Task', TaskSchema)
