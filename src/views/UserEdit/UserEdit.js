import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { UserDetails } from './components';
import UserService from "../../services/user.service";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const UserEdit = ({ match, location }) => {
  const classes = useStyles();
  const { params: { userId } } = match;

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
          <UserDetails 
          MySwal={MySwal}
          UserService={UserService}
          userId={userId}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserEdit;
