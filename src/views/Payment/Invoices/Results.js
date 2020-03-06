import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  colors,
  Button
} from '@material-ui/core';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  actions: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  },
  downloadButton: {
    marginLeft: theme.spacing(1)
  }
}));

const paymentStatusColors = {
  canceled: colors.grey[600],
  pending: colors.orange[600],
  completed: colors.green[600],
  rejected: colors.red[600]
};

function Results({ className, invoices, onView, onPay, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleClick = (invoice) => {
    if (invoice.payment.status === 'pending') onPay(invoice);
    else onView(invoice);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {invoices.length}
        {' '}
        Records found. Page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(invoices.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          title="Invoices"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ref</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : invoices
                  ).map((invoice) => (
                    <TableRow
                      key={invoice.id}
                    >
                      <TableCell>
                        {invoice.payment.ref}
                      </TableCell>
                      <TableCell>
                        {invoice.payment.currency}
                        {invoice.payment.total}
                      </TableCell>
                      <TableCell>
                        <Label
                          color={paymentStatusColors[invoice.payment.status]}
                          variant="outlined"
                        >
                          {invoice.payment.status}
                        </Label>
                      </TableCell>
                      <TableCell>
                        {moment(invoice.created_at).format(
                          'DD MMM YYYY | hh:mm'
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          style={{color: '#fff', backgroundColor: invoice.payment.status === 'pending' ? '#007bff' : colors.green[600]}}
                          onClick={() => handleClick(invoice)}
                          size="small"
                          variant="contained"
                        >
                          {invoice.payment.status === 'pending' ? 'Pay' : 'View'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={invoices.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.array,
  onDownload: PropTypes.func,
  onView: PropTypes.func,
  onPay: PropTypes.func
};

Results.defaultProps = {
  invoices: []
};

export default Results;
