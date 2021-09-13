import React from 'react';
import { Field } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { DiagnosesSelectProps } from './AddEntryForm';

const OccupationalHealthcareForm: React.FC<DiagnosesSelectProps> = ({ setFieldValue, setFieldTouched, diagnoses}) => {
  return (
    <>
      <Field
        label='Date'
        placeholder='mm/dd/yyyy'
        name='date'
        component={TextField}
      />
      <Field
        label='Specialist'
        placeholder='enter name'
        name='specialist'
        component={TextField}
      />
      <Field
        label='Employer'
        placeholder='enter name'
        name='employerName'
        component={TextField}
      />
      <DiagnosisSelection
        diagnoses={diagnoses}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
      <Field
        label='Description'
        placeholder='...'
        name='description'
        component={TextField}
      />
      Sick Leave:
      <Field
        placeholder='Start mm/dd/yyyy'
        name='sickLeave.startDate'
        component={TextField}
      />
      <Field
        placeholder='End mm/dd/yyyy'
        name='sickLeave.endDate'
        component={TextField}
      />
    </>
  );
};

export default OccupationalHealthcareForm;