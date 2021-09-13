import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "GET_DIAGNOSES";
      payload: Diagnosis[]
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "PATIENT_DETAILS":
      return {
        ...state,
        patient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce((memo, diagnosis) => ({
            ...memo, [diagnosis.code]: diagnosis
          }), {})
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => (
  { type: 'SET_PATIENT_LIST', payload: patientList }
);

export const getPatientDetails = (patient: Patient): Action => (
  { type: 'PATIENT_DETAILS', payload: patient }
);

export const addPatient = (patient: Patient): Action => (
  { type: 'ADD_PATIENT', payload: patient }
);

export const getDiagnoses = (diagnoses: Diagnosis[]): Action => (
  { type: 'GET_DIAGNOSES', payload: diagnoses}
);