import React from 'react';
import { Card, Icon, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
import { HealthCheckEntry, EntryIcon } from '../types';
import DiagnosesList from './DiagnosesList';

const healthCheckIcons: SemanticICONS[] = ['heart', 'heart', 'heart', 'heartbeat'];
const healthCheckColors: SemanticCOLORS[] = [ 'green', 'yellow', 'orange', 'red'];

const HealthEntry = ({ entry }: {entry: HealthCheckEntry }) => {
  return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}{' '}
            <Icon name={EntryIcon[entry.type]} size='large' />
          </Card.Header>
          <Card.Meta>
            <i>{entry.description}</i>
          </Card.Meta>
          <Card.Description>
            <Icon
              name={healthCheckIcons[entry.healthCheckRating]}
              color={healthCheckColors[entry.healthCheckRating]}
            />
            <DiagnosesList entry={entry} />
          </Card.Description>
        </Card.Content>
      </Card>
  );
};

export default HealthEntry;