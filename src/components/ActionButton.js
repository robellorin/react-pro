import React, {
  useRef,
  useState,
  memo
} from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PaymentIcon from '@material-ui/icons/Payment';
import PageviewIcon from '@material-ui/icons/Pageview';

function ActionButton({ invoice, onDownload, onView, onPay, ...rest }) {
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title="More options">
        <Button
          {...rest}
          color="primary"
          onClick={handleMenuOpen}
          ref={moreRef}
          size="small"
          variant="outlined"
        >
          Action
        </Button>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={() => { onView(invoice); setOpenMenu(false);}} disabled={invoice.payment.status==='pending'}>
          <ListItemIcon>
            <PageviewIcon />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>
        <MenuItem onClick={() => { onDownload(invoice); setOpenMenu(false);}} disabled={invoice.payment.status==='pending'}>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Download" />
        </MenuItem>
        <MenuItem onClick={() => { onPay(invoice); setOpenMenu(false);}} disabled={invoice.payment.status!=='pending'}>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Pay" />
        </MenuItem>
      </Menu>
    </>
  );
}

ActionButton.propTypes = {
  className: PropTypes.string,
  onDownload: PropTypes.func,
  onView: PropTypes.func,
  onPay: PropTypes.func
};

export default memo(ActionButton);
