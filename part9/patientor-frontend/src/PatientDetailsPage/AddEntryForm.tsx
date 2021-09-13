import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import {  useStateValue, getPatientDetails } from '../state';
import { Diagnosis, EntryType, EntryWithoutId, Patient } from '../types';
import { EntryTypeDropdown } from './EntryFormFields';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import { useParams } from 'react-router';
import HospitalForm from './HospitalForm';
import HealthCheckForm from './HealthCheckForm';
import { Grid, Button } from 'semantic-ui-react';
import * as Yup from 'yup';

interface FormProps {
  setOpen: (arg: boolean) => void;
}

const determineValidation = (entryType: string) => {
  switch (entryType) {
    case EntryType.Hospital:
      return (
        Yup.object({
          date: Yup.date()
            .required(),
          specialist: Yup.string()
            .required()
            .min(3, 'must be more than 3 characters'),
          diagnosisCodes: Yup.array().of(Yup.string()),
          description: Yup.string()
            .required(),
          discharge: Yup.object().shape({
            date: Yup.date(),
            criteria: Yup.string().min(3, 'minimum of 3 characters')
          })
        })
      );
    case EntryType.Health:
      return (
        Yup.object({
          date: Yup.date()
            .required(),
          specialist: Yup.string()
            .required()
            .min(3, 'must be more than 3 characters'),
          diagnosisCodes: Yup.array().of(Yup.string()),
          description: Yup.string()
            .required(),
          healthCeckRating: Yup.number()
            .required().min(0, 'minimum of 0')
            .max(3, 'maximum of 3'),
        })
      );
    case EntryType.Occupational:
      return (
        Yup.object({
          date: Yup.date()
            .required(),
          specialist: Yup.string()
            .required()
            .min(3, 'must be more than 3 characters'),
          diagnosisCodes: Yup.array().of(Yup.string()),
          description: Yup.string()
            .required(),
          employerName: Yup.string()
            .required().min(2, 'must be at least 2 characters'),
          sickLeave: Yup.object().shape({
            startDate: Yup.date(),
            endDate: Yup.date()
          })
        })
      );
    default:
      return null;
  }   
};

export type DiagnosesSelectProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void,
  diagnoses: Diagnosis[];
};

const entryTypeOptions: { text: EntryType, value: EntryType }[] = Object.values(EntryType).map(e => (
  { text: e, value: e }
));

const AddEntryForm = ({ setOpen }: FormProps) => {
  const [entryType, setEntryType] = useState<string>(EntryType.Hospital);
  const [{ diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const addEntry = async (newEntry: EntryWithoutId) => {
    try {
      const {data: editedPatient }= await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);
      dispatch(getPatientDetails(editedPatient));
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        console.log('error adding entry', e.message);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        date: '',
        specialist: '',
        diagnosisCodes: [],
        description: '',
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        healthCheckRating: 0,
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={addEntry}
      validationSchema={determineValidation(entryType)}
      >
      {({ values, setFieldValue, setFieldTouched }) => {
               
        return (
          <Form>
            <EntryTypeDropdown
              name='entryType'
              value={values.type}
              options={entryTypeOptions}
              placeholder='Entry Type'
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              setEntryType={setEntryType}
            />
            {entryType && entryType === 'OccupationalHealthcare' ?
              <OccupationalHealthcareForm
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                diagnoses={Object.values(diagnoses)}
              /> : null}
            {entryType && entryType === 'Hospital' ?
              <HospitalForm
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                diagnoses={Object.values(diagnoses)}
              /> : null}
            {entryType && entryType === 'HealthCheck' ?
              <HealthCheckForm
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                diagnoses={Object.values(diagnoses)}
              /> : null}
              <br />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => setOpen(false)} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }} 
    </Formik>
  );
};

export default AddEntryForm;