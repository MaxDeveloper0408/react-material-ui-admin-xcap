/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(2)
  },
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.grey[50],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: "fff",
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: "#4d84ff",
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: "#4d84ff"
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));



const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const classes = useStyles();
  const [state, setState] = useState({});
  const handleClick = e => {
    setState({ [e]: !state[e] });
  };
  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <div key={page.title}>
        {page.subpages != null ? (
          <div key={page.title}>
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
          button
          onClick={handleClick.bind(
            this,
            page.title
          )}  
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
          {state[page.title] ? (
              <ExpandLess />
          ) : (
              <ExpandMore />
          )}
        </ListItem>
        <Collapse in={state[page.title]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {page.subpages.map((subpage) => {
                    return (
                      <ListItem
                        className={classes.nested}
                        disableGutters
                        key={subpage.title}
                      >
                      <Button
                        activeClassName={classes.active}
                        className={classes.button}
                        component={CustomRouterLink}
                        to={subpage.href}
                      >
                      <div className={classes.icon}>{subpage.icon}</div>
                      {subpage.title}
                      </Button>
                      </ListItem>
                    )
                })}
            </List>
        </Collapse> 
        </div>): (
            <ListItem
            className={classes.item}
            disableGutters
            key={page.title}
            button
            onClick={handleClick.bind(
              this,
              page.title
            )}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
        )}
        </div>
      ))}
    </List>
    
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
