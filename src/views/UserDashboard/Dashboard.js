import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import {
  TotalProfit,
  CTotalProfit,
  FTotalProfit,
  AvaliableBalance,
  ETotalProfit,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: '100%'
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <FTotalProfit
            UserService={UserService}
          />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <CTotalProfit
            UserService={UserService}
          />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <TotalProfit
            UserService={UserService}
          />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <ETotalProfit
            UserService={UserService}
            AuthService={AuthService}
          />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <AvaliableBalance
            UserService={UserService}
            AuthService={AuthService}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
