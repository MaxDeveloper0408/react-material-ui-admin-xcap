import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Atualizar senha"
          title="Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Senha atual"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Nova senha"
            name="newPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.newPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar senha"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
          >
            Atualizar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
