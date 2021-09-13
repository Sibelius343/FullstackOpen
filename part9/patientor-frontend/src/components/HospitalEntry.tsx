import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HospitalEntry, EntryIcon } from '../types';
import DiagnosesList from './DiagnosesList';

const HospitalEntryComponent = ({ entry }: {entry: HospitalEntry }) => {
  return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}{' '}
            <Icon name={EntryIcon[entry.type]} size='large'/>
          </Card.Header>
          <Card.Meta>
            <i>{entry.description}</i>
          </Card.Meta>
          <Card.Description>
            <dl>
              <dt style={{ 'fontWeight': 'bold' }}>Discharge:</dt>
              <dd>Date: {entry.discharge.date}</dd>
              <dd>Criteria: {entry.discharge.criteria}</dd>
            </dl>
            <DiagnosesList entry={entry} />
          </Card.Description>
        </Card.Content>
      </Card>
  );
};

export default HospitalEntryComponent;