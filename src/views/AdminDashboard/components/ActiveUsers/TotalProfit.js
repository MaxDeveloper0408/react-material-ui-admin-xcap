import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import LocalAtmIcon from '@material-ui/icons/LocalAtmOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
  const { className, UserService, ...rest } = props;

  const classes = useStyles();

  const [plans, setPlans] = useState([]);
  const [plansum, setPlansum] = useState('');
  useEffect(() => {
    const fetchService = async () => {
        try {
          const response = await UserService.active_users_count();
          if(response.status && response.status == 'success') {
            setPlansum(response.sum)
          }else {
            setPlansum(0)
          }
        } catch (e) {
          setPlansum(0)
        }
    };
    fetchService();
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              CONTAS ATIVAS
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {plansum}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <LocalAtmIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <Typography
          className={classes.caption}
          variant="caption"
        >
          número de contas de cliente ativas no sistema.
        </Typography>
        <LinearProgress
          className={classes.progress}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
