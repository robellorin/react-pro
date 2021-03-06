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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    borderRadius: 20,
    boxShadow: 'none',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 12
  },
  content: {
    padding: 0,
    flex: 1,
    overflow: 'auto'
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: 20
    }
  },
  inner: {
    // padding: 10
  },
  listItem: {
    borderRadius: 20,
    filter: 'drop-shadow(0 0 16px rgba(0,0,0,0.07))',
    border: '1px solid #d7d7d7',
    padding: '20px 50px',
    marginBottom: 10,
    '@media (max-width: 949px)': {
      padding: '16px 50px',
    },
    '@media (max-width: 750px)': {
      padding: '10px 20px',
    }
  },
  headers: {
    ffontSize: 15,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  actionsHeader: {
    fontSize: 15,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    width: 150,
    textAlign: 'center',
    '@media (max-width: 1440px)': {
      width: 120
    },
    [theme.breakpoints.down('sm')]: {
      width: 100
    }
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
  ActionHeaderWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'center'
  },
  tableText: {
    '& p, span, button': {
      fontSize: 20,
      '@media (max-width: 1440px)': {
        fontSize: 17
      }
    }
  },
  text: {
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  total: {
    color: '#37c566',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  state: {
    border: '1px solid',
    padding: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'table-cell'
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
    alignItems: 'center',
    fontSize: 15,
    lineHeight: '6px',
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
    color: '#ffffff',
  },
  rowButton: {
    width: 150,
    height: 42,
    borderRadius: 10,
    fontFamily: 'TT Hoves',
    textTransform: 'capitalize',
    '@media (max-width: 1440px)': {
      width: 120
    },
    [theme.breakpoints.down('sm')]: {
      width: 100
    }
  }
}));

const paymentStatusColors = {
  created: '#2f38e7',
  approved: '#37c565',
  completed: '#37c565',
  refunded: colors.red[600],
  idle: '#ffc90d'
};

const currencies = {
  USD: '$',
  EUR: '???',
  GBP: '??'
};

function Results({
  className, invoices, onView, onPay, payDisabled, selectedUserId, ...rest
}) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const totalPages = Math.floor(invoices.length / rowsPerPage) + 1;
  const pageList = [];
  const headers = selectedUserId === 0 || selectedUserId === 490 || selectedUserId === 516
    ? ['Ref', 'Total', 'Status', 'Date', 'name', 'Actions']
    : ['Ref', 'Total', 'Status', 'Date', 'Actions'];

  for (let i = 0; i < totalPages; i++) {
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
  };

  const handleClick = (invoice) => {
    if (invoice.state === 'created') onPay(invoice);
    else onView(invoice);
  };
  console.log(selectedUserId);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card className={classes.card}>
        <CardHeader classes={{ title: classes.headerTitle }} title="Invoices" />
        <CardContent className={classes.content}>
          <List style={{ height: '100%' }}>
            <ListItem
              className={classes.listItem}
              style={{ border: 'none', paddingBottom: 0 }}
            >
              {headers.map((item, index) => (
                <ListItemText
                  key={item}
                  classes={{
                    root:
                      index === 0
                        ? classes.listItemText
                        : index === 5
                          ? classes.ActionHeaderWrapper
                          : classes.alignCenter,
                    primary: index < 4 ? classes.headers : classes.actionsHeader
                  }}
                >
                  {item}
                </ListItemText>
              ))}
            </ListItem>
            {(rowsPerPage > 0
              ? invoices.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              : invoices
            ).map((invoice) => (
              <ListItem
                key={invoice.id}
                className={clsx(classes.listItem, classes.tableText)}
              >
                <ListItemText
                  classes={{
                    root: classes.listItemText,
                    primary: classes.text
                  }}
                >
                  {invoice.id}
                </ListItemText>
                <ListItemText
                  classes={{
                    root: classes.alignCenter,
                    primary: classes.total
                  }}
                >
                  {`${currencies[invoice.currency]} ${invoice.amount}`}
                </ListItemText>
                <ListItemText classes={{ root: classes.alignCenter }}>
                  <Typography
                    className={clsx(classes.state, classes.rowButton)}
                    style={{
                      color: paymentStatusColors[invoice.state],
                      borderColor: paymentStatusColors[invoice.state]
                    }}
                  >
                    {invoice.state}
                  </Typography>
                </ListItemText>
                <ListItemText
                  classes={{ root: classes.alignCenter, primary: classes.text }}
                >
                  {moment(invoice.updatedAt).format('DD MMM YYYY')}
                </ListItemText>
                {(selectedUserId === 0
                  || selectedUserId === 490
                  || selectedUserId === 516) && (
                  <ListItemText
                    classes={{
                      root: classes.alignCenter,
                      primary: classes.text
                    }}
                  >
                    {`${invoice.surname ?? ''} ${invoice.firstname ?? ''}`}
                  </ListItemText>
                )}
                <div className={classes.actionsWrapper}>
                  <Button
                    className={clsx(classes.button, classes.rowButton)}
                    style={{
                      backgroundColor:
                        invoice.state === 'created' ? '#37c565' : '#2f38e7'
                    }}
                    disabled={!!(payDisabled && invoice.state === 'created')}
                    onClick={() => handleClick(invoice)}
                    size="small"
                    variant="contained"
                  >
                    {invoice.state === 'created' ? 'Pay' : 'View'}
                  </Button>
                </div>
              </ListItem>
            ))}
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
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
            <p>Records</p>
          </div>
          <div className={classes.rowsPerPage}>
            <IconButton
              edge="start"
              aria-label="back"
              onClick={() => handleChangePage(0)}
              disabled={page < 2}
            >
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
                {pageList.map((curPage) => (
                  <MenuItem key={curPage} value={curPage}>
                    {curPage}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>{`of ${totalPages}`}</p>
            <IconButton
              edge="end"
              aria-label="next"
              onClick={() => handleChangePage(1)}
              disabled={page >= totalPages}
            >
              <ArrowRightIcon />
            </IconButton>
          </div>
          <p>{`${invoices.length} Records`}</p>
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
