import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {},
    colorWhite: {
      color: 'white!important'
    },
    disableButton: {
        "&:disabled": {
          color: 'rgb(206, 191, 191)!important',
          backgroundColor: 'rgb(107, 110, 128)!important'
        }
    },
}));

const UserDetails = props => {
  const { className, UserService, AuthService, MySwal, ...rest } = props;
  const [user, setUser] = useState({
    password: "",
    confirm: ""
  });

  const classes = useStyles();
  const [fields, setFields] = useState({
    password: "",
    confirm: ""
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields
  })
  const [isError, setIsError] = useState(true)

  const handleChange = input => ({ target: { value } }) => {
    // Set user to the fields
    setUser({
      ...user,
      [input]: value
    })
    // Handle errors
    const formErrors = { ...filedError }

    switch (input) {
      case "password":
        formErrors.password = value.length >= 0 && value.length < 6
          ? "Necessário mínimo de 6 caracteres."
          : ""
      break
      case "confirm":
        formErrors.confirm = value.length >= 0 && value.length < 6 || user.password != value 
          ? "Necessário mínimo de 6 caracteres and should same with password"
          : ""
      break
      default:
        break
    }

    // set error hook
    let error_count = 0;
    Object.values(formErrors).forEach((error,val,array) => {
      if (error.length > 0) {
        error_count = error_count + 1;
        return;
      }
    })
    if(error_count > 0){
      setIsError(true)
    } else {
      setIsError(false)
    }
    // set errors hook
    setFieldError({
      ...formErrors
    })
  }

  const submit = () => {
    if(!isError) {
      UserService.updatePassword(
        {id: AuthService.getCurrentUser().id, password: user.password}
      ).then(
        response => {
          MySwal.fire({
            title: 'Success',
            text: response.message
          })
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            MySwal.fire({
              title: 'Fail',
              text: resMessage,
              dangerMode: true
            })
        }
      );
    }
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Atualizar dados da conta"
          title="Minha Conta"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2} noValidate>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                placeholder="Senha"
                value={user.password}
                onChange={handleChange("password")}
                margin="normal"
                error={filedError.password !== ""}
                helperText={
                  filedError.password !== "" ? `${filedError.password}` : ""
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmar Senha"
                name="confirm"
                type="password"
                placeholder="Confirmar Senha"
                value={user.confirm}
                onChange={handleChange("confirm")}
                margin="normal"
                error={user.password != user.confirm || user.confirm.length == 0}
                helperText={
                  user.password != user.confirm || user.confirm.length == 0 ? "Necessário mínimo de 6 caracteres and should same with password" : ""
                }
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant="contained"
            disabled={isError || user.password != user.confirm || user.confirm.length == 0}
            color="secondary"
            onClick={submit}
            className={classes.disableButton}
          >
            Salvar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails;
