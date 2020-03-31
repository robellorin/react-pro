import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import domtoimage from 'dom-to-image';
import jsPDF from "jspdf";
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  colors
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: theme.spacing(6),
    // paddingTop: theme.spacing(0)
  },
  marginTop: {
    marginTop: theme.spacing(4)
  },
  dates: {
    padding: theme.spacing(2),
    backgroundColor: colors.grey[100]
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function Details({ invoice, className, onClose, ...rest }) {
  const classes = useStyles();
  const onDownload = () => {
    const content = document.getElementById('invoice-content');
    domtoimage.toPng(content)
    .then(function (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pdf = new jsPDF({ unit: 'pt', format: [img.width * 0.75, img.height * 0.75] });
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0);
        const imgData = canvas.toDataURL('image/png', 0.95);
        pdf.addImage(imgData, 'image/png', 0, 0);
        pdf.save(`${moment(invoice.updatedAt).format('DD-MM-YYYY')}-invoice.pdf`);
       }
    });
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent id="invoice-content" className={classes.content}>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <img
              alt="Brand"
              src="/images/logos/logo.png"
            />
          </Grid>
          <Grid item>
            <Typography
              align="right"
              component="h3"
              variant="h1"
            >
              {invoice.state.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          alignItems="center"
          className={classes.marginTop}
          container
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h5">www.udevia.com</Typography>
          </Grid>
          <Grid item>
            <Typography align="right">
              Invoice #
              {invoice.id}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          className={clsx(classes.marginTop, classes.dates)}
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              component="h4"
              gutterBottom
              variant="overline"
            >
              Date of issue
            </Typography>
            <Typography>
              {moment(invoice.betTo).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="h4"
              gutterBottom
              variant="overline"
            >
              Reference
            </Typography>
            <Typography>{invoice.id}</Typography>
          </Grid>
        </Grid>
        <div className={classes.marginTop}>
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
          >
            Billed to
          </Typography>
          <Typography>
            Udevia    
            <br />
          </Typography>
        </div>
        <Table className={classes.marginTop}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell />
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`Fee of ${moment(invoice.created_at).format('MMM YYYY')}`}</TableCell>
              <TableCell />
              <TableCell align="right">
              €{invoice.amount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.marginTop}>
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
          >
            Notes
          </Typography>
          <Typography>
            Please make sure you have the right bank registration number as I
            had issues before and make sure you guys cover transfer expenses.
          </Typography>
        </div>
      </CardContent>
      <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            onClick={onClose}
            variant="contained"
          >
            Close
          </Button>
          <Button
            color="primary"
            onClick={onDownload}
            variant="contained"
          >
            <GetAppIcon />
            Download
          </Button>
        </CardActions>
    </Card>
  );
}

Details.propTypes = {
  className: PropTypes.string,
  invoice: PropTypes.object.isRequired
};

export default Details;
