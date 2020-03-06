import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal, Container } from '@material-ui/core';
import Details from './Details';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    // boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

function InvoiceDetails({ isOpen, onClose, invoice }) {
  const classes = useStyles();
  if (!invoice) {
    return null;
  }

  return (
    <Modal
      className={classes.root}
      open={isOpen}
    >
      <Container maxWidth="lg" className={classes.modalContainer}>
        <Details invoice={invoice} onClose={onClose} />
      </Container>
    </Modal>
  );
}

export default InvoiceDetails;
