import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry, EntryIcon } from '../types';
import DiagnosesList from './DiagnosesList';

const OccupationalEntry = ({ entry }: {entry: OccupationalHealthcareEntry }) => {
  return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}{' '}
            <Icon name={EntryIcon[entry.type]} size='large'/>
            {entry.employerName}
          </Card.Header>
          <Card.Meta>
            <i>{entry.description}</i>
          </Card.Meta>
          <Card.Description>
            {entry.sickLeave && 
              <dl>
                <dt style={{ 'fontWeight': 'bold' }}>Sick Leave:</dt>
                <dd>Start date: {entry.sickLeave.startDate}</dd>
                <dd>End date: {entry.sickLeave.endDate}</dd>
            </dl>
            }
            <DiagnosesList entry={entry} />
          </Card.Description>
        </Card.Content>
      </Card>
  );
};

export default OccupationalEntry;