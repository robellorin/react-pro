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
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#161e33',
    fontFamily: 'T THoves',
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
    fontFamily: 'T THoves',
    fontWeight: 500
  },
  listItemText: {
    flex: 1
  },
  text: {
    fontSize: 20,
    color: '#161e33',
    fontFamily: 'T THoves',
    fontWeight: 500
  },
  total: {
    fontSize: 20,
    color: '#37c566',
    fontFamily: 'T THoves',
    fontWeight: 500
  },
  state: {
    border: '1px solid',
    paddingLeft: 5,
    paddingRight: 5,
    width: 'fit-content'
  },
  actionsWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
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
    fontFamily: 'T THoves',
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
    // '&:hover': {
    //   border: 'none'
    // }
  },
  rowsSelect: {
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 12,
    color: '#8f9da4'
  },
  selIcon: {
    color: '#37c566'
  }
}));

const paymentStatusColors = {
  created: colors.orange[600],
  approved: colors.green[600],
  refunded: colors.red[600],
  idle:colors.grey[600]
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
          <List style={{ overflow: 'auto' }}>
            <ListItem className={classes.listItem} style={{ border: 'none', paddingBottom: 0 }}>
              {
                headers.map((item, index) => (
                  <ListItemText key={item} classes={{ root: index < 4 ? classes.listItemText : classes.actionsWrapper, primary: classes.headers }}>
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
                  <ListItemText classes={{ root:classes.listItemText, primary: classes.total }}>&euro;{` ${invoice.amount}`}</ListItemText>
                  <ListItemText classes={{ root:classes.listItemText }}>
                    <Typography className={classes.state} style={{ color: paymentStatusColors[invoice.state], borderColor: paymentStatusColors[invoice.state] }}>
                      {invoice.state}
                    </Typography>
                  </ListItemText>
                  <ListItemText classes={{ root:classes.listItemText, primary: classes.text }}>
                    {moment(invoice.created_at).format('DD MMM YYYY')}
                  </ListItemText>
                  <div className={classes.actionsWrapper}>
                    <Button
                      style={{color: '#fff', backgroundColor: invoice.state === 'created' ? '#007bff' : colors.green[600]}}
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
