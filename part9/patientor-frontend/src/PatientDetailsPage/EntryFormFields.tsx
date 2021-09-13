import { FieldHookConfig, useField } from "formik";
import React from "react";
import { Select, DropdownProps, SelectProps } from 'semantic-ui-react';

type EntryDropdownProps = { 
  //eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void
  setEntryType: React.Dispatch<React.SetStateAction<string>> }
  & FieldHookConfig<string> & SelectProps;

export const EntryTypeDropdown: React.FC<EntryDropdownProps> = ({ setEntryType, setFieldValue, setFieldTouched, ...props }) => {
  const [field] = useField(props);
  
  const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setFieldValue('type', data.value);
    if (data.value && typeof data.value === 'string') {
      setEntryType(data.value);
    }      
  };
  const onBlur = ((_event: React.KeyboardEvent<HTMLElement>, _data: DropdownProps) => {
    setFieldTouched('type', true);
  });

  return (
    <>
      <Select
        {...field}
        {...props}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};