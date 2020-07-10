import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import { SearchInput } from 'components';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    color: 'white'
  }
}));




const Topbar = props => {
  const { className, onSidebarOpen,logOut, ...rest } = props;
  const classes = useStyles();
  const [notifications] = useState([]);
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
      <RouterLink to="/">
        <img
          alt="Logo"
          width="100px"
          src="/images/logos/logo.png"
        />
      </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Buscar.."
          />
        </div>
          <IconButton style={{color: '#939499'}}>
            <Badge
              badgeContent={notifications.length}
              style={{color: '#939499'}}
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            style={{color: '#939499'}}
            onClick={logOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            style={{color: '#939499'}}
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  logOut: PropTypes.func
};

export default Topbar;
