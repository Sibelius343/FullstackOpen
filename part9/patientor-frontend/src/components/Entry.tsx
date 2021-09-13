import React from 'react';
import { Entry, EntryType } from "../types";
import HealthEntry from './HealthEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';

const assertNever = (entry: never): never => {
  throw new Error('not a supported Entry type' + JSON.stringify(entry));
};

const EntryComponent = ({ entry }: { entry: Entry }): JSX.Element | null => {
  switch (entry.type) {
    case EntryType.Health:
      return <HealthEntry entry={entry}/>;
    case EntryType.Hospital:
      return <HospitalEntry entry={entry}/>;
    case EntryType.Occupational:
      return <OccupationalEntry entry={entry}/>;
    default:
      assertNever(entry);
  }
  return null;
};

export default EntryComponent;