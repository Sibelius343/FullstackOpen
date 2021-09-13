import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatientDetails, useStateValue } from "../state";
import { Patient } from "../types";
import { Card, Header, Icon } from "semantic-ui-react";
import Entry from '../components/Entry';
import { AddEntryModal } from "./AddEntryModal";

enum genderIcons {
  "male" = 'mars',
  "female" = 'venus',
  "other" = 'genderless'
}

const PatientDetailsPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log('fetching details');

        const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(getPatientDetails(patientDetails));
      } catch (e) {
        if (e instanceof Error) {
          console.log('error fetching details:', e.message);
        }
      }
    };
    if (!patient || patient.id !== id) {
      void fetchDetails();
    }
  }, [dispatch]);

  if (!patient ) {
    return null;
  }

  console.log(diagnoses);
  
  return (
    <div>
      <Header as='h2'>
        {patient.name} <Icon name={genderIcons[patient.gender]} />
      </Header>
      <p>
        ssn: {patient.ssn}<br />
        occupation: {patient.occupation}
      </p>
      <Header as='h3'>
        entries
      </Header>
      <Card.Group>
        {patient.entries.map(e => (
          <Entry entry={e} key={e.id} />
        ))}
      </Card.Group>
      <AddEntryModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default PatientDetailsPage;