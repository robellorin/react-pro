import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import LoadingComponent from 'src/components/Loading';
import { fetchInvoices } from 'src/actions';
import Results from './Results';
import Checkout from '../Checkout';
import InvoiceModal from '../InvoiceDetails';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    height: 'calc(100vh - 165px)',
    position: 'relative'
  },
  container: {
    height: '100%',
    paddingBottom: 12
  },
  results: {
    paddingTop: 24,
    height: '100%'
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  }
}));

function InvoicesList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.payment);
  const session = useSelector((state) => state.session);
  const [invoices, setInvoices] = useState(paymentData.invoices);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const payDisabled = props.selectedUser && props.selectedUser.id !== session.user.id;
  useEffect(() => {
    dispatch(fetchInvoices(props.selectedUser ? props.selectedUser.id : null));
  }, [dispatch, props.selectedUser]);

  useEffect(() => {
    if (paymentData.loading) {

    } else if (!paymentData.loading && invoices !== paymentData.invoices) {
      setInvoices(paymentData.invoices);
    }
  }, [paymentData, invoices]);

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenView(true);
  };

  const onViewClose = () => {
    setOpenView(false);
  };

  const pay = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenCheckout(true);
  };

  const onCheckoutClose = (status) => {
    if (status === 'success') dispatch(fetchInvoices());
    setOpenCheckout(false);
  };

  return (
    <Page className={classes.root} title="Invoices Management List">
      <Container maxWidth={false} className={classes.container}>
        <Results
          className={classes.results}
          invoices={invoices}
          onView={viewInvoice}
          onPay={pay}
          payDisabled={payDisabled}
          selectedUserId={props.selectedUser.id ?? session.user.id}
        />
        <Modal open={openCheckout}>
          <Container maxWidth={false} className={classes.modalContainer}>
            <Checkout
              isModal
              onClose={onCheckoutClose}
              invoice={selectedInvoice}
            />
          </Container>
        </Modal>
        <InvoiceModal
          invoice={selectedInvoice}
          isOpen={openView}
          onClose={onViewClose}
        />
      </Container>
      {paymentData.loading && <LoadingComponent />}
    </Page>
  );
}

export default InvoicesList;
