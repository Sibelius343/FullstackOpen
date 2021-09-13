import { NewPatient, Gender, HealthCheckRating, EntryWithoutId, Entry } from "./types";

type Field = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown[]
};

// type EntryField = {
//   description: unknown,
//   date: unknown,
//   specialist: unknown,
//   diagnosisCodes?: unknown,
//   type: unknown,
//   healthCheckRating?: unknown,
//   discharge?: unknown,
//   employerName?: unknown,
//   sickLeave?: unknown
// };

enum EntryType {
  "Hospital" = "Hospital",
  "Occupational" = "OccupationalHealthcare",
  "Health" = "HealthCheck"
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is EntryWithoutId => {
  if (!entry.type || !Object.values(EntryType).includes(entry.type)) {
    return false;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { description, date, specialist } = entry;
    if (
      typeof description !== 'string' ||
      !(isDate(date)) ||
      typeof specialist !== 'string'
    ) {
        return false;
      }
  } catch {
    return false;
  }

  switch (entry.type) {
    case EntryType.Health: 
      if (!entry.healthCheckRating) {
        return false;
      }
      return Object.values(HealthCheckRating).includes(entry.healthCheckRating);
    case EntryType.Hospital:
      if (!entry.discharge) {
        return false;
      }
      return (isDate(entry.discharge.date) && typeof entry.discharge.criteria === 'string');
    case EntryType.Occupational:
      if (!entry.employerName || typeof entry.employerName !== 'string') {
        return false;
      }
      if (entry.sickLeave) {
        return (isDate(entry.sickLeave.startDate) && isDate(entry.sickLeave.endDate));
      }
      return true;
    default:
      return false;
  }


};

const parseString = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error(`malformatted or missing field: ${field}`);
  }
  return field;
};

const parseDate = (date: unknown):  string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`malformatted or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`malformatted or missing gender: ${gender}`);
  }
  return gender;
};

const parseEntry = (entry: unknown): EntryWithoutId => {
  if (!entry || !isEntry(entry)) {
    throw new Error(`malformatted or missing entry: ${entry}`);
  }
  return entry;
};

const parseEntries = (entries: unknown[]): Entry[] => {
  if(!entries) {
    throw new Error(`malformatted or missing entries: ${entries}`);
  }
  entries.forEach(e => {
    if (!isEntry(e)) {
      throw new Error(`malformatted entry: ${e}`);
    }
  });
  return entries as Entry[];
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Field): NewPatient => {
  const newPatient: NewPatient  = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};

export const toNewEntry = (entry: unknown): EntryWithoutId => {
  const newEntry: EntryWithoutId = parseEntry(entry);
  return newEntry;
};