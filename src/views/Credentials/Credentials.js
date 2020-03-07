import React, { useState, useEffect } from 'react';
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

const logUrls = {
  bet365: 'https://www.bet365.com/favicons/main-favicon.ico',
  paddypower: 'https://ie2sdspp.cdnppb.net/resources/sdspp/assets/images/favicon_85ed3672424f031a43ad76943b2c8d3c.ico',
  ladbrokes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAtFBMVEXwHijwHijwHijwHijwHSfwGyXxKjP1b3X3hozzRU3wHCb2foT//f3+6uvzR0/yOEH82Nr////6sbTwIiv3io//+vr1aG7yPkb93+D81NbxMTr4k5j4kZbzREz95OX+7u/zTFT4mp76ur3wISvwGiT8zdD7wMP0W2L0XWT1Ymn0VFvwHyn4nKH//v7/+fr/+/v5oab95uf+9vf80NLzUVnwGyb0XmX1bXT0VVzyQEjxLTfwGiV2PK1wAAAAA3RSTlNd4P6aaVXKAAAAAWJLR0QR4rU9ugAAAAd0SU1FB+MJCgsnG2Jc1fEAAACXSURBVBjTVc/XEoJADAXQhd0gRkCvvTewYu/l//9LYUEwT8mZTCZXCEPmyhDprIiUFlPPVsEu8rcxhV7gkuN6EUgNXK6gWpM5qKPRpAy41UanqzJQPaDP8gc8GGI0pgzkBJj6QUAJKGsGzBfL1dpPNsINsN3tcQjTG94Rzsk9X64RRK+HN/v+eL5k/Hocjt4BsfqPm8b/AJUuCvzoOx+xAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA5LTEwVDExOjM5OjI3KzAyOjAwhRLP0QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wOS0xMFQxMTozOToyNyswMjowMPRPd20AAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII=',
  skybet: 'https://bet.sbgcdn.com/static/mbet/img/favicon_default.png',
  betfred: 'https://www.betfred.com/images/web-clip-icon/72.png',
  betfair: 'https://ie1sbw.cdnppb.net/sbw-resources/favicon_673_.ico',
  williamhill: 'https://sports.staticcache.org/sportsbook/img/favicon.ico?v=2'
}

const columns = [
  { title: '', field: 'logo', editable: 'never', render: rowData => 
    {
      const url = rowData && rowData.imageUrl ? rowData.imageUrl : '';
      return <Avatar alt="logo" src={url} style={{width: 35, height: 35, borderRadius: '50%'}}><SportsSoccerIcon /></Avatar>
    },
    width: 50
  },
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
  addBtn: {
    marginTop: theme.spacing(2)
  }

}));

function CredentialsForm({ className, ...rest }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const addIcon = React.useRef(null);

  useEffect(() => {
    addIcon.current.parentNode.parentNode.classList.remove('MuiIconButton-root');
  }, []);
  const onRowAdd = (row) => {
    row.imageUrl = logUrls[row.bookmaker];
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

  const addClickHandle = () => {
    // const addBtn = document.querySelector('[title="Add"]');
    // addBtn.click();
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
              Add: props => <div ref={addIcon} id="sddsf"/>
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
