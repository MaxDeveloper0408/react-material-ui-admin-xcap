import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import UserService from "../../services/user.service";
import {
  TotalProfit,
  CTotalProfit,
  FTotalProfit,
  WTotalProfit,
  WPTotalProfit,
  ActiveUsers,
  PlanNumbers,
  CPlanTotal,
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
          <WTotalProfit 
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
          <WPTotalProfit 
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
          <ActiveUsers 
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
          <PlanNumbers
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
          <CPlanTotal
              UserService={UserService}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
