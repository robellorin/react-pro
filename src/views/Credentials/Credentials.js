import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
  InputAdornment,
   Button,
  IconButton,
  Select,
  MenuItem,
  Avatar
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { getCredentials, addCredential, deleteCredential, updateCredential } from 'src/actions';
import * as constants from 'src/constant';
import DeleteModal from './DeleteModal';

const logUrls = {
  bet365: '/images/logos/bet365.png',
  paddypower: '/images/logos/paddypower.jpeg',
  skybet: '/images/logos/skybet.jpeg',
  betfair: '/images/logos/betfair.png',
  williamhill: '/images/logos/williamhill.png',
  betfred: '/images/logos/betfred.jpeg',
}

const bookmakers = {
  bet365: 'bet365',
  paddypower: 'paddypower',
  skybet: 'skybet',
  betfair: 'betfair',
  williamhill: 'williamhill',
  betfred: 'betfred'
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
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
    height: 544
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
    padding: '20px 30px',
    marginBottom: 10,
    '@media (max-width: 949px)': {
      padding: '16px 30px',
    }
  },
  headers: {
    ffontSize: 15,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  bookmaker: {
    flex: 2,
    display: 'flex',
    alignItems: 'center'
  },
  password: {
    background: 'transparent'
  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  text: {
    fontSize: 16,
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
  actionsButton: {
    borderRadius: 5,
    padding: 4
  },
  actionsIcon: {
    color: '#ffffff',
    fontSize: 18 
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
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
  createBtn: {
    margin: '10px 0',
    backgroundColor: '#37c566',
    color: '#ffffff',
    width: 157,
    height: 51,
    borderRadius: 15,
    fontSize: 20,
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    textTransform: 'capitalize',
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
    '&:hover': {
      backgroundColor: '#19d285',
    },
    '&:disabled': {
      color: '#ffffff',
      backgroundColor: '#63d8a7',
    }
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 15,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: 10,
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`
  },
  visibility: {
    fontSize: 20,
    color: '#c8c8c8'
  }
}));

const headers = ['Bookmaker', 'Country', 'Username', 'Password', 'Balance', 'Notes', 'Actions'];
function CredentialsForm({ className, selectedUser, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listEnd = useRef(null);
  const credentials = useSelector(state => state.credentials);
  const [data, setData] = useState(credentials.credentials);
  const [loading, setLoading] = useState(credentials.loading);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [curRow, setCurRow] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [formState, setFormState] = useState({
    bookmaker: '',
    country: '',
    username: '',
    password: ''
  });
  const totalPages = Math.floor(data.length / rowsPerPage) + 1;
  const pageList = [];
  for (let i = 0; i < totalPages; i ++) {
    pageList.push(i + 1);
  }

  useEffect(() => {
    dispatch(getCredentials(selectedUser ? selectedUser.id : null));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (loading && !credentials.loading && credentials.status === 'success') {
      const credentialsData = credentials.credentials.map(item => {
        item.imageUrl = logUrls[item.bookmaker];
        item.showPassword = false;
        item.updating = false;
        return item;
      });
      setData(credentialsData);
    }
    setLoading(credentials.loading);
  }, [credentials, loading]);

  const onRowUpdate = (row) => {
    if (row.isNew) {
      dispatch(addCredential(formState.bookmaker, formState.country, formState.username, formState.password));
    } else {
      dispatch(updateCredential(formState.bookmaker, formState.country, formState.username, formState.password, row.id));
    }
    setUpdating(false);
  }

  const onRowDelete = (isCancel) => {
    if (!isCancel) {
      dispatch(deleteCredential(curRow.id));
    }
    setOpenDelete(false);
  }

  const onRowCancel = (row) => {
    setFormState({
      bookmaker: '',
      country: '',
      username: '',
      password: ''
    });
    if (row.isNew) {
      setData((prevData) => prevData.slice(0, prevData.length - 1));
    } else {
      setData((prevData) => (prevData.map(item => {
        if (item.id === row.id) item.updating = false;
        return item;
      })));
    }
    setUpdating(false);
  }

  const addClickHandle = () => {
    const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const newRow = {id: newId, updating: true, isNew: true};
    setData((prevData) => [...prevData, newRow]);
    setPage(totalPages);
    setUpdating(true);
    gotoBottom();    
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleSelectPage = (event) => {
    setPage(event.target.value);
  };

  const handleChangePage = (type) => {
    const newPage = type === 0 ? page - 1 : page + 1;
    setPage(newPage);
  }

  const handleClickDelete = (row) => {
    setCurRow(row);
    setOpenDelete(true);
  }

  const handleClickUpdate = (row) => {
    setData((prevData) => (prevData.map(item => {
      if (item.id === row.id) item.updating = true;
      return item;
    })));
    setUpdating(true);
    setFormState({
      bookmaker: row.bookmaker,
      country: row.country,
      username: row.bookmakerUsername,
      password: row.password
    })
  }

  const handleClickShowPassword = (id) => {
   setData((prevData) => (prevData.map(item => {
      if (item.id === id) item.showPassword = !item.showPassword;
      return item;
    })));
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChangeForm = (event) => {
    event.persist();
    setFormState((prevState) => ({...prevState, [event.target.name]: event.target.value}));
  };

  const gotoBottom = () => {
    setTimeout(() => {
      if (listEnd.current) {
        listEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card className={classes.card}>
        <CardHeader
          classes={{ title: classes.headerTitle }}
          title="Credentials"
        />
        <CardContent className={classes.content}>
          <List style={{ overflow: 'auto', height: '100%' }}>
            <ListItem className={classes.listItem} style={{ border: 'none', paddingBottom: 0 }}>
              {
                headers.map((item, index) => (
                  <ListItemText
                    key={item}
                    classes={{ root: index < 5 ? classes.flex2 : index === 5 ? classes.flex3 : classes.actionsWrapper, primary: classes.headers }}
                  >
                    {item}
                  </ListItemText>
                ))
              }
            </ListItem>
            {
              (rowsPerPage > 0
                ? data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                : data
              ).map((credential) => {
                if (credential.updating)
                  return (
                    <ListItem key={credential.id} className={classes.listItem}>
                      <div className={clsx(classes.bookmaker, classes.text)}>
                        <Avatar className={classes.avatar} alt='user' src={logUrls[formState.bookmaker]}>
                          <SportsSoccerIcon/>
                        </Avatar>
                        <Select
                          labelId="bookmakers"
                          id="bookmakers-select"
                          name='bookmaker'
                          value={formState.bookmaker}
                          onChange={handleChangeForm}
                        >
                        {
                          Object.keys(bookmakers).map(key => (
                            <MenuItem key={key} value={key}>{bookmakers[key]}</MenuItem>  
                          ))
                        }
                        </Select>
                      </div>
                      <div className={classes.flex2}>
                        <Select
                          labelId="countris"
                          id="country-select"
                          name='country'
                          style={{ width: '95%' }}
                          value={formState.country}
                          onChange={handleChangeForm}
                        >
                        {
                          Object.keys(constants.countryList).map(key => (
                            <MenuItem key={key} value={key}>{constants.countryList[key]}</MenuItem>  
                          ))
                        }
                        </Select>
                      </div>
                      <div className={classes.flex2}>
                        <TextField
                          name='username'
                          autoComplete='off'
                          placeholder='Username'
                          value={formState.username}
                          onChange={handleChangeForm}
                        >
                          {formState.username}
                        </TextField>
                      </div>
                      <div className={classes.flex2}>
                        <TextField
                          autoComplete='off'
                          name='password'
                          placeholder='Password'
                          value={formState.password}
                          onChange={handleChangeForm}
                        >
                          {formState.password}
                        </TextField>
                      </div>
                      <ListItemText className={classes.flex2}></ListItemText>
                      <ListItemText className={classes.flex3}></ListItemText>
                      <div className={classes.actionsWrapper}>
                        <IconButton
                          className={classes.actionsButton}
                          style={{ marginRight: 5, backgroundColor: '#37c566'}}
                          onClick={() => onRowUpdate(credential)}
                        >
                          <CheckIcon className={classes.actionsIcon}/>
                        </IconButton>
                        <IconButton 
                          className={classes.actionsButton}
                          style={{ backgroundColor: '#df5157' }}
                          onClick={() => onRowCancel(credential)}>
                          <CloseIcon className={classes.actionsIcon} />
                        </IconButton>
                      </div>
                    </ListItem>
                  )
                else
                  return (
                    <ListItem key={credential.id} className={classes.listItem} style={{ opacity: updating ? 0.3 : 1 }}>
                      <div className={clsx(classes.bookmaker, classes.text)}>
                        <Avatar className={classes.avatar} alt='user' src={credential.imageUrl}>
                          <SportsSoccerIcon/>
                        </Avatar>
                        {credential.bookmaker}
                      </div>
                      <ListItemText classes={{ root:classes.flex2, primary: classes.text }}>{constants.countryList[credential.country]}</ListItemText>
                      <ListItemText classes={{ root:classes.flex2, primary: classes.text }}>{credential.bookmakerUsername}</ListItemText>
                      <ListItemText classes={{ root:classes.flex2, primary: classes.text }}>
                      <TextField
                        fullWidth
                        name="password"
                        type={credential.showPassword ? 'text' : 'password'}
                        value={credential.password}
                        InputProps={{
                          classes: {underline: classes.underline},
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword(credential.id)}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {
                                  credential.showPassword
                                    ? <Visibility className={classes.visibility} />
                                    : <VisibilityOff className={classes.visibility} />
                                }
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </ListItemText>
                    <ListItemText classes={{ root:classes.flex2, primary: classes.total }}>{credential.Balance}</ListItemText>
                    <ListItemText classes={{ root:classes.flex3, primary: classes.text }}>{credential.actions}</ListItemText>
                    <div className={classes.actionsWrapper}>
                      <IconButton
                        className={classes.actionsButton}
                        style={{ marginRight: 5, backgroundColor: '#00bff3'}}
                        disabled={updating}
                        onClick={() => handleClickUpdate(credential)}
                      >
                        <EditIcon className={classes.actionsIcon}/>
                      </IconButton>
                      <IconButton
                        className={classes.actionsButton}
                        style={{ backgroundColor: '#df5157' }}
                        onClick={() => handleClickDelete(credential)}
                        disabled={updating}
                      >
                        <DeleteIcon className={classes.actionsIcon} />
                      </IconButton>
                    </div>
                  </ListItem>
                )
              })
            }
            <div style={{ float:"left", clear: "both" }} ref={listEnd} />
          </List>
        </CardContent>
        <div>
          <Button onClick={addClickHandle} className={classes.createBtn} disabled={updating}>
              + Add
            </Button>
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
            <div/>
          </div>
        </div>
        <DeleteModal
          onClose={onRowDelete}
          open={openDelete}
          credential={curRow}
        />
      </Card>
    </div>
  );
}

export default CredentialsForm;
