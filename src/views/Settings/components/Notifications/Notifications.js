import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Gerenciar notificações"
          title="Notificações"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Celular
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="checkbox"
                    defaultChecked //
                  />
                }
                label="E-mail"
              />
              <FormControlLabel
                control={<Checkbox color="checkbox" />}
                label="SMS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="checkbox"
                    defaultChecked //
                  />
                }
                label="Push Notification"
              />
            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Navegador
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="checkbox"
                    defaultChecked //
                  />
                }
                label="E-mail"
              />
              <FormControlLabel
                control={<Checkbox color="checkbox" />}
                label="Chat Online"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
          >
            Salvar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
