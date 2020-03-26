import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useLocation, matchPath } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  IconButton,
  ListSubheader,
  Drawer,
  Hidden
} from '@material-ui/core';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavItem from 'src/components/NavItem';
import navConfig from './navConfig';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  mobileDrawer: {
    backgroundImage: 'url("/images/navbar-bg.png")',
    width: drawerWidth,
  },
  drawerOpen: {
    width: 0,
    background: 'transparent',
    borderRight: 'unset',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: 'transparent',
    borderRight: 'unset',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(15),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    marginTop: 85,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  navigation: {
    overflow: 'hidden',
    flexGrow: 1
  }
}));

function renderNavItems({
  // eslint-disable-next-line react/prop-types
  items, subheader, key, role, ...rest
}) {
  return (
    <List key={key}>
      {subheader && <ListSubheader disableSticky>{subheader}</ListSubheader>}
      {/* eslint-disable-next-line react/prop-types */}
      {items.reduce(
        // eslint-disable-next-line no-use-before-define
        (acc, item) => reduceChildRoutes({ acc, item, role, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc, pathname, item, role, depth = 0
}) {
  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });
    if (!item.role || item.role === role) {
      acc.push(
        <NavItem
          depth={depth}
          icon={item.icon}
          key={item.href}
          label={item.label}
          open={Boolean(open)}
          title={item.title}
        >
          {renderNavItems({
            depth: depth + 1,
            pathname,
            items: item.items
          })}
        </NavItem>
      );
    }
  } else {
    if (!item.role || item.role === role) {
      acc.push(
        <NavItem
          depth={depth}
          href={item.href}
          icon={item.icon}
          key={item.href}
          label={item.label}
          title={item.title}
        />
      );
    }
  }

  return acc;
}

export default function NavBar({
  openMobile,
  onMobileClose,
  className,
  role,
  ...rest
}) {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
 
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <nav className={classes.navigation}>
        {navConfig.map((list) => renderNavItems({
          items: list.items,
          subheader: list.subheader,
          pathname: location.pathname,
          role: role,
          key: list.subheader
        }))}
      </nav>
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.mobileDrawer
          }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{ justifyContent: open ? 'flex-end': 'center' }}>
          <IconButton onClick={handleDrawerClose}>
            {
              open &&
                <ChevronLeftIcon style={{ fontSize: 30, color: '#ffffff' }} />
            }
            {
              !open &&
                <MenuIcon style={{ fontSize: 30, color: '#ffffff' }} />
            }
          </IconButton>
        </div>
        {content}
      </Drawer>
    </>
  );
}
