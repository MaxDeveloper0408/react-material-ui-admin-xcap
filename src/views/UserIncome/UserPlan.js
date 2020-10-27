import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { PlanList, DepositList, WithdrawList } from './components';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import PlanService from '../../services/plan.service';
import WithdrawService from '../../services/withdraw.service';
import DepositService from '../../services/deposit.service';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const UserPlan = ({ match, location }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
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
                    <PlanList
                        MySwal={MySwal}
                        UserService={UserService}
                        AuthService={AuthService}
                        PlanService={PlanService}
                    />
                    <DepositList
                        DepositService={DepositService}
                        AuthService={AuthService}
                    />
                    <WithdrawList
                        WithdrawService={WithdrawService}
                        AuthService={AuthService}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default UserPlan;
