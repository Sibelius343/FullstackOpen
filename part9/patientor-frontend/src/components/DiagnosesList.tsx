import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';

const DiagnosesList = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.keys(diagnoses).length === 0) {
    return null;
  }
  
  return (
    <div>
      <ul>
        {entry.diagnosisCodes?.map(d => (
          <li key={entry.id + ':' + d}>
            <b>{d}:</b> {diagnoses && diagnoses[d].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosesList;