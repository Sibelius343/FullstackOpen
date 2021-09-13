import { NonSensitivePatient, NewPatient, Patient, Entry, EntryWithoutId } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const addedPatient: Patient = { ...patient, id: uuid() };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const newEntry: Entry = { ...entry, id: uuid() };
  const patient = getPatient(id);
  if (patient) {
    patient.entries.push(newEntry);
  }
  return patient;
};

export default { getPatient, getPatients, addPatient, addEntry };