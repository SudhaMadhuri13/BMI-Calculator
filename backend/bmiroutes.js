const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the BMI schema
const bmiSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bmi: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Create a model for the BMI
const Bmi = mongoose.model('Bmi', bmiSchema);

// BMI calculation route
router.post('/calculate-bmi', async (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height) {
    return res.status(400).json({ error: 'Weight and height are required.' });
  }

  const bmi = weight / (height * height);

  try {
    // Save BMI data to MongoDB
    const newBmi = new Bmi({
      weight,
      height,
      bmi: bmi.toFixed(2)
    });

    await newBmi.save();  // Save the record to the database

    // Respond with the calculated BMI
    res.json({ bmi: bmi.toFixed(2) });

  } catch (err) {
    res.status(500).json({ error: 'Error saving BMI data' });
  }
});

module.exports = router;
