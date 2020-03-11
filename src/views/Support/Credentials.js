import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Avatar
} from '@material-ui/core';
import MaterialTable from "material-table";
import AddIcon from '@material-ui/icons/Add';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { getCredentials, addCredential, deleteCredential, updateCredential } from 'src/actions';

const logUrls = {
  bet365: '/images/logos/bet365.png',
  paddypower: '/images/logos/paddypower.jpeg',
  skybet: 'https://bet.sbgcdn.com/static/mbet/img/favicon_default.png',
  betfair: '/images/logos/betfair.png',
  williamhill: '/images/logos/williamhill.png',
  betfred: 'https://www.betfred.com/images/web-clip-icon/114.png',
}

const lookup = {
  bet365: 'bet365',
  paddypower: 'paddypower',
  skybet: 'skybet',
  betfair: 'betfair',
  williamhill: 'williamhill',
  betfred: 'betfred'
}

const columns = [
  { title: '', field: 'logo', editable: 'never', render: rowData => 
    {
      const url = rowData && rowData.imageUrl ? rowData.imageUrl : '';
      return <Avatar alt="logo" src={url} style={{width: 35, height: 35, borderRadius: '50%'}}><SportsSoccerIcon /></Avatar>
    },
    width: 50
  },
  { title: 'Bookmaker', field: 'bookmaker', lookup: lookup },
  { title: 'Username', field: 'bookmakerUsername'},
  { title: 'Password', field: 'password'},
  { title: 'Balance', field: 'balance', editable: 'never'},
  { title: 'Notes', field: 'actions', editable: 'never'},
];

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 20,
  },
  addBtn: {
    marginTop: theme.spacing(2)
  }

}));

function CredentialsForm({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const credentials = useSelector(state => state.credentials);
  const [data, setData] = useState(credentials.credentials);
  const [loading, setLoading] = useState(credentials.loading);
  const addIcon = React.useRef(null);

  useEffect(() => {
    addIcon.current.parentNode.parentNode.classList.remove('MuiIconButton-root');
    dispatch(getCredentials());
  }, [dispatch]);

  useEffect(() => {
    if (loading && !credentials.loading && credentials.status === 'success') {
      const credentialsData = credentials.credentials.map(item => {
        item.imageUrl = logUrls[item.bookmaker];
        return item;
      });
      setData(credentialsData);
    }
    setLoading(credentials.loading);
  }, [credentials, loading]);
  const onRowAdd = (row) => {
    return dispatch(addCredential(row.bookmaker, row.bookmakerUsername, row.password));
  }

  const onRowUpdate = (newRow, oldRow) => {
    return dispatch(updateCredential(newRow.bookmaker, newRow.bookmakerUsername, newRow.password, oldRow.id));
  }

  const onRowDelete = (oldRow) => {
    return dispatch(deleteCredential(oldRow.id));
  }

  const addClickHandle = () => {
    addIcon.current.click();
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Credentials"
      />
      <Divider />
      <CardContent className={classes.content}>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          editable={{
              onRowAdd: newData => onRowAdd(newData),
              onRowUpdate: (newData, oldData) => onRowUpdate(newData, oldData),
              onRowDelete: oldData => onRowDelete(oldData)
          }}
          icons={
            {
              Add: props => <div ref={addIcon}/>
            }
          }
          options={{
            actionsColumnIndex: -1
          }}
        />
        <Button
          className={classes.addBtn}
          color="primary"
          onClick={addClickHandle}
          variant="contained"
        >
          <AddIcon />
          Add
        </Button>
      </CardContent>
    </Card>
  );
}

export default CredentialsForm;