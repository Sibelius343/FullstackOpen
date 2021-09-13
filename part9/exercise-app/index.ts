import express = require('express');
import { calculateBmi, bmiCategory } from './bmiCalculator';
import { Result, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    const result: bmiCategory = calculateBmi(Number(height), Number(weight));
    res.json({
      weight,
      height,
      bmi: result
    });
  } catch (e) {
    res.json({
      error: 'malformatted parameters'
    });
  }
});

app.post('/exercises', (req, res) => {
  try {    
    const { daily_exercises, target } = req.body; //eslint-disable-line 
    const result: Result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (e) {
    res.json({
      error: e.message //eslint-disable-line
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('server running on port', PORT);
});