import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  res.send(patientsService.getPatient(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  const id: string = req.params.id;

  try {
    const newEntry = toNewEntry(req.body);

    const modifiedPatient = patientsService.addEntry(id, newEntry);
    res.json(modifiedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;