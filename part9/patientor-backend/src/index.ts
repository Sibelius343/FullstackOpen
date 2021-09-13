import express from 'express';
import cors = require('cors');
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (__req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log('app listening on port: ', PORT);
});