import React from "react";
import { Field } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { DiagnosesSelectProps } from './AddEntryForm';

const HospitalForm: React.FC<DiagnosesSelectProps> = ({ setFieldValue, setFieldTouched, diagnoses}) => {
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
      Discharge:
      <Field
        placeholder='Date: mm/dd/yyyy'
        name='discharge.date'
        component={TextField}
      />
      <Field
        placeholder='Discharge criteria'
        name='discharge.criteria'
        component={TextField}
      />
    </>
  );
};

export default HospitalForm;