const express = require("express");
const router = express.Router();
const TimerChecker = require("../models/timerChecker");

router.get("/", async (req, res) => {
  try {
    const timerChecker = await TimerChecker.find();
    res.json(timerChecker);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const newTimerChecker = new TimerChecker(req.body);
  try {
    const savedTimerChecker = await newTimerChecker.save();
    res.status(201).json(savedTimerChecker);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/all", async (req, res) => {
  try {
    const timerChecker = await TimerChecker.deleteMany({});
    res.json(timerChecker);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
