import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Button,
  TextField
} from '@material-ui/core';
import MaterialTable from "material-table";
import AddIcon from '@material-ui/icons/Add';
import { getNews, addNews, deleteNews, updateNews } from 'src/actions';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 20,
    border: 'none',
    boxShadow: 'none',
    width: '100%',
    height: '100%'
  },
  content: {
    padding: 36,
    height: '100%',
    overflow: 'auto'
  },
  addBtn: {
    marginTop: theme.spacing(2)
  }

}));

function GlobalNews({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const newsData = useSelector(state => state.news);
  const [data, setData] = useState(newsData.news.filter(item => item.userId === 0));
  const [loading, setLoading] = useState(newsData.loading);
  const addIcon = React.useRef(null);

  const columns = [
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

  useEffect(() => {
    addIcon.current.parentNode.parentNode.classList.remove('MuiIconButton-root');
    dispatch(getNews('all'));
  }, [dispatch]);

  useEffect(() => {
    if (loading && !newsData.loading && newsData.status === 'success') {
      setData(newsData.news.filter(item => item.userId === 0));
    }
    setLoading(newsData.loading);
  }, [newsData, loading]);
  const onRowAdd = (row) => {
    return dispatch(addNews(0, row.news));
  }

  const onRowUpdate = (newRow, oldRow) => {
    return dispatch(updateNews(oldRow.id, newRow.news));
  }

  const onRowDelete = (oldRow) => {
    return dispatch(deleteNews(oldRow.id));
  }

  const addClickHandle = () => {
    addIcon.current.click();
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

export default GlobalNews;
