const mongoose = require('mongoose');

const minionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Minion = mongoose.model('Minion', minionSchema);
module.exports = Minion;
