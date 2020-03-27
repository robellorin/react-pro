import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  container: {
    marginTop: theme.spacing(3),
    height: 200
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function DeleteModal({
  open, onClose, className, credential, ...rest
}) {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader title="" />
        <Divider />
        <CardContent>
          <Typography variant="body1">
            Are you sure you want to delete this row?
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={() => onClose(true)}>
            Dismiss
          </Button>
          <Button
            color="primary"
            onClick={() => onClose(false)}
            variant="contained"
          >
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

DeleteModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

DeleteModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default DeleteModal;
