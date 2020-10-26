import React, {useEffect, useState} from 'react';
import { Link as RouterLink, withRouter, Redirect, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton } from '@material-ui/core';
import { WithdrawList, DepositList, PlanList } from './components';
import DepositService from "../../services/deposit.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import PlanService from "../../services/plan.service";
import WithdrawService from "../../services/withdraw.service";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const MySwal = withReactContent(Swal)
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const UserHistory = ({ match, location }) => {
  const classes = useStyles();
  const { params: { userId } } = match;
  const history = useHistory();
  const gotoBack = () => {
    history.goBack();
  }
  return (
    <div className={classes.root}>
      <IconButton onClick={gotoBack}>
        <ArrowBackIcon />
      </IconButton>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <WithdrawList 
          MySwal={MySwal}
          UserService={UserService}
          AuthService={AuthService}
          PlanService={PlanService}
          WithdrawService={WithdrawService}
          useHistory={useHistory}
          userId={userId}
          />
        </Grid>
        <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}>
          <DepositList
              MySwal={MySwal}
              DepositService={DepositService}
              UserService={UserService}
              AuthService={AuthService}
              PlanService={PlanService}
              WithdrawService={WithdrawService}
              useHistory={useHistory}
              userId={userId}
          />
        </Grid>
        <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}>
          <PlanList
              MySwal={MySwal}
              DepositService={DepositService}
              UserService={UserService}
              AuthService={AuthService}
              PlanService={PlanService}
              WithdrawService={WithdrawService}
              useHistory={useHistory}
              userId={userId}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserHistory;
