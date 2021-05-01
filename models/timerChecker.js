const mongoose = require("mongoose");

const timerCheckerSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: null,
  },
});

timerCheckerSchema.methods.toJSON = function () {
  const timerChecker = this;
  const timerCheckerObject = timerChecker.toObject();
  return timerCheckerObject;
};

module.exports = mongoose.model("TimerChecker", timerCheckerSchema);
