import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';

type EntryModalType = {
  open: boolean,
  setOpen: (arg: boolean) => void
};

export const AddEntryModal: React.FC<EntryModalType> = ({ open, setOpen }) => {
  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Add Entry</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content='Add new entry' />
      <Modal.Content>
        <AddEntryForm
          setOpen={setOpen}
        />
      </Modal.Content>      
    </Modal>
  );
};