import React, { useState } from 'react';
import axios from 'axios';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBmiCategory('');

    if (!weight || !height) {
      setError('Please enter both weight and height.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/calculate-bmi', {
        weight: parseFloat(weight),
        height: parseFloat(height),
      });
      const calculatedBmi = response.data.bmi;
      setBmi(calculatedBmi);
      classifyBmi(calculatedBmi); // Call the classification function
    } catch (err) {
      setError('Error calculating BMI. Please try again.');
    }
  };

  // Function to classify the BMI
  const classifyBmi = (bmi) => {
    if (bmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiCategory('Normal weight');
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiCategory('Overweight');
    } else if (bmi >= 30) {
      setBmiCategory('Obese');
    } else {
      setBmiCategory('');
    }
  };

  return (
    <div>
      <h2 className="bmi-heading">BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Weight (kg): </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>
        <div>
          <label>Height (m): </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </div>
        <button type="submit">Calculate BMI</button>
      </form>

      {bmi && <h3>Your BMI is: {bmi}</h3>}
      {bmiCategory && <h4>BMI Category: {bmiCategory}</h4>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default BMICalculator;

