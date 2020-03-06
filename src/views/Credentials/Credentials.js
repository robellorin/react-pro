import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  colors
} from '@material-ui/core';
import MaterialTable from "material-table";

const columns = [
  { title: 'Bookmaker', field: 'bookmaker' },
  { title: 'Username', field: 'surname'},
  { title: 'Password', field: 'password'},
  { title: 'Balance', field: 'balance', editable: 'never'},
];
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 20,
  },

}));

function CredentialsForm({ className, ...rest }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const onRowAdd = (row) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          let clone = [];
          Object.assign(clone, data);
          clone.push(row);
          setData(clone);
        }
        resolve()
      }, 1000)
    });
    return promise;
  }

  const onRowUpdate = (newRow, oldRow) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          let clone = [];
          Object.assign(clone, data);
          const index = data.indexOf(oldRow);
          clone[index] = newRow;
          setData(clone);
        }
        resolve()
      }, 1000)
    });
    return promise;
  }

  const onRowDelete = (oldRow) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          let clone = [];
          Object.assign(clone, data);
          const index = data.indexOf(oldRow);
          clone.splice(index, 1);
          setData(clone);
        }
        resolve()
      }, 1000)
    });
    return promise;
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
          columns={columns}
          data={data}
          editable={{
              onRowAdd: newData => onRowAdd(newData),
              onRowUpdate: (newData, oldData) => onRowUpdate(newData, oldData),
              onRowDelete: oldData => onRowDelete(oldData)
          }}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </CardContent>
    </Card>
  );
}

export default CredentialsForm;
