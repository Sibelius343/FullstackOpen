export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface Discharge {
  date: string,
  criteria: string
}

interface SickLeave {
  startDate: string,
  endDate: string
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}