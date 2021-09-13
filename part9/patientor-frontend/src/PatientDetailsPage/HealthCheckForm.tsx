import React from "react";
import { Field } from 'formik';
import { DiagnosisSelection, TextField, NumberField } from '../AddPatientModal/FormField';
import { DiagnosesSelectProps } from './AddEntryForm';

const HealthCheckForm: React.FC<DiagnosesSelectProps> = ({ setFieldValue, setFieldTouched, diagnoses}) => {
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
      <Field
        label="Health Check Rating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />
    </>
  );
};

export default HealthCheckForm;