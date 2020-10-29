import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { PlanList } from './components';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import PlanService from '../../services/plan.service';
import DepositService from '../../services/deposit.service';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UserDetails } from '../UserEdit/components';

const MySwal = withReactContent(Swal);
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const AdminDeposit = ({ match, location }) => {
    const { params: { userId } } = match;
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
                        DepositService={DepositService}
                        useHistory={useHistory}
                        userId={userId}/>
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDeposit;
