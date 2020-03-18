import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import MaterialTable from "material-table";
import { getUsersWithNews, updateUsersWithNews } from 'src/actions';

const columns = [
  { title: 'UserName', field: 'username' },
  { title: 'Surname', field: 'surname'},
  { title: 'CutOff', field: 'cutOff'},
  { 
    title: 'News',
    editComponent: props => <TextField
      id="filled-multiline-flexible"
      label="News"
      style={{ width: 300 }}
      multiline
      rowsMax="5"
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      variant="filled"
    />,
    field: 'news'
  }
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

function UsersWithNews({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const supportData = useSelector(state => state.supportData);
  const [data, setData] = useState(supportData.usersWithNews);
  const [loading, setLoading] = useState(supportData.loading);
  const addIcon = React.useRef(null);

  useEffect(() => {
    // addIcon.current.parentNode.parentNode.classList.remove('MuiIconButton-root');
    dispatch(getUsersWithNews());
  }, [dispatch]);

  useEffect(() => {
    if (loading && !supportData.loading && supportData.status === 'success') {
      setData(supportData.usersWithNews);
    }
    setLoading(supportData.loading);
  }, [supportData, loading]);
  
  const onRowUpdate = (newRow, oldRow) => {
    return dispatch(updateUsersWithNews(oldRow.id, newRow.cutOff, oldRow.newsId, newRow.news));
  }
    
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          editable={{
              onRowUpdate: (newData, oldData) => onRowUpdate(newData, oldData)
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
      </CardContent>
    </Card>
  );
}

export default UsersWithNews;
