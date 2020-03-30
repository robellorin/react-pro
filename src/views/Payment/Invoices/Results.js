import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  FormControl,
  colors,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  card: {
    border: 'none',
    borderRadius: 20,
    boxShadow: 'none',
    paddingLeft: 30,
    paddingRight: 30
  },
  content: {
    padding: 0,
    height: 554
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  inner: {
    // padding: 10
  },
  listItem: {
    borderRadius: 20,
    filter: 'drop-shadow(0 0 16px rgba(0,0,0,0.07))',
    border: '1px solid #d7d7d7',
    padding: '20px 100px',
    marginBottom: 10,
    '@media (max-width: 949px)': {
      padding: '16px 50px',
    }
  },
  headers: {
    ffontSize: 15,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  listItemText: {
    flex: 1
  },
  alignCenter: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  total: {
    fontSize: 20,
    color: '#37c566',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  state: {
    fontFamily: 'TT Hoves',
    fontSize: 20,
    border: '1px solid',
    width: 150,
    height: 42,
    padding: 8,
    borderRadius: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    textTransform: 'Capitalize',
    display: 'table-cell'
  },
  actionsWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  actions: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 15,
    lineHeight: 6,
    color: '#8f9da4',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    paddingTop: 10
  },
  rowsPerPage: {
    display: 'flex',
    alignItems: 'center'
  },
  rowsSelInput: {
    margin: '0 7px',
    borderRadius: 10,
    border: '1px solid #c8d5da',
    '& fieldset': {
      border: 'none'
    }
  },
  rowsSelect: {
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 12,
    color: '#8f9da4'
  },
  selIcon: {
    color: '#37c566'
  },
  button: {
    width: 150,
    height: 42,
    borderRadius: 10,
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TT Hoves',
    textTransform: 'capitalize'
  }
}));

const paymentStatusColors = {
  created: '#2f38e7',
  approved: '#37c565',
  refunded: colors.red[600],
  idle: '#ffc90d'
};

const headers = ['Ref', 'Total', 'Status', 'Date', 'Actions'];

function Results({ className, invoices, onView, onPay, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.floor(invoices.length / rowsPerPage) + 1;
  const pageList = [];
  for (let i = 0; i < totalPages; i ++) {
    pageList.push(i + 1);
  }
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSelectPage = (event) => {
    setPage(event.target.value);
  };

  const handleChangePage = (type) => {
    const newPage = type === 0 ? page - 1 : page + 1;
    setPage(newPage);
  }

  const handleClick = (invoice) => {
    if (invoice.state === 'created') onPay(invoice);
    else onView(invoice);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card className={classes.card}>
        <CardHeader
          classes={{ title: classes.headerTitle }}
          title="Invoices"
        />
        <CardContent className={classes.content}>
          <List style={{ overflow: 'auto', height: '100%' }}>
            <ListItem className={classes.listItem} style={{ border: 'none', paddingBottom: 0 }}>
              {
                headers.map((item, index) => (
                  <ListItemText key={item} classes={{ root: index === 0 ? classes.listItemText : classes.alignCenter, primary: classes.headers }}>
                    {item}
                  </ListItemText>
                ))
              }
            </ListItem>
            {
              (rowsPerPage > 0
                ? invoices.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                : invoices
              ).map((invoice) => (
                <ListItem key={invoice.id} className={classes.listItem}>
                  <ListItemText classes={{ root:classes.listItemText, primary: classes.text }}>{invoice.id}</ListItemText>
                  <ListItemText classes={{ root:classes.alignCenter, primary: classes.total }}>&euro;{` ${invoice.amount}`}</ListItemText>
                  <ListItemText classes={{ root:classes.alignCenter }}>
                    <Typography className={classes.state} style={{ color: paymentStatusColors[invoice.state], borderColor: paymentStatusColors[invoice.state] }}>
                      {invoice.state}
                    </Typography>
                  </ListItemText>
                  <ListItemText classes={{ root:classes.alignCenter, primary: classes.text }}>
                    {moment(invoice.created_at).format('DD MMM YYYY')}
                  </ListItemText>
                  <div className={classes.actionsWrapper}>
                    <Button
                      className={classes.button}
                      style={{ backgroundColor: invoice.state === 'created' ? '#37c565' : '#2f38e7' }}
                      onClick={() => handleClick(invoice)}
                      size="small"
                      variant="contained"
                    >
                      {invoice.state === 'created' ? 'Pay' : 'View'}
                    </Button>
                  </div>
                </ListItem>
              ))
            }
          </List>
        </CardContent>
        <div className={classes.pagination}>
          <div className={classes.rowsPerPage}>
            <p>Show</p>
            <FormControl variant="outlined">
              <Select
                className={classes.rowsSelInput}
                labelId="perCounts"
                id="perCounts-select"
                classes={{ root: classes.rowsSelect, icon: classes.selIcon }}
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
            <p>Records</p>
          </div>
          <div className={classes.rowsPerPage}>
            <IconButton edge="start" aria-label="back" onClick={() => handleChangePage(0)} disabled={page < 2}>
              <ArrowLeftIcon />
            </IconButton>
            <p>Page</p>
            <FormControl variant="outlined">
              <Select
                className={classes.rowsSelInput}
                labelId="perCounts"
                id="perCounts-select"
                classes={{ root: classes.rowsSelect, icon: classes.selIcon }}
                value={page}
                onChange={handleSelectPage}
              >
              {
                pageList.map(curPage => (
                  <MenuItem key={curPage} value={curPage}>{curPage}</MenuItem>  
                ))
              }
              </Select>
            </FormControl>
            <p>{`of ${totalPages}`}</p>
            <IconButton edge="end" aria-label="next" onClick={() => handleChangePage(1)} disabled={page >= totalPages}>
              <ArrowRightIcon />
            </IconButton>
          </div>
          <p>
            {`${invoices.length} Records`}
          </p>
        </div>
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
