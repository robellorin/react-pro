import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Results from './Results';
import Checkout from '../Checkout';
import InvoiceModal from '../InvoiceDetails';
import LoadingComponent from 'src/components/Loading';
import { fetchInvoices } from 'src/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    height: '100%'
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  results: {
    marginTop: 20
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  }
}));

function InvoicesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.payment);
  const [invoices, setInvoices] = useState(paymentData.invoices);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  useEffect(() => {
    if (paymentData.loading) {

    } else if (!paymentData.loading && invoices !== paymentData.invoices) {
      setInvoices(paymentData.invoices);
    }
  }, [paymentData, invoices]);

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenView(true);
  }

  const onViewClose = () => {
    setOpenView(false);  
  }

  const pay = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenCheckout(true);
  }

  const onCheckoutClose = (status) => {
    if (status === 'success') dispatch(fetchInvoices());
    setOpenCheckout(false);  
  }

  return (
    <Page
      className={classes.root}
      title="Invoices Management List"
    >
    {
      paymentData.loading &&
        <LoadingComponent />
    }
    {
      !paymentData.loading &&
        <Container
          maxWidth={false}
          className={classes.container}
        >
          <Results
            className={classes.results}
            invoices={invoices}
            onView={viewInvoice}
            onPay={pay}
          />
          <Modal open={openCheckout}>
            <Container
              maxWidth={false}
              className={classes.modalContainer}
            >
              <Checkout isModal={true} onClose={onCheckoutClose} invoice={selectedInvoice} />
          </Container>
        </Modal>
        <InvoiceModal invoice={selectedInvoice} isOpen={openView} onClose={onViewClose} />
      </Container>
    }
    </Page>
  );
}

export default InvoicesList;
