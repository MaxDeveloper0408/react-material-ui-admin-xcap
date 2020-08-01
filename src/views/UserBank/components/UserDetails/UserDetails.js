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
  const [bank, setBank] = useState({
    user_id: AuthService.getCurrentUser().id,
    banco_nome: "",
    banco_agencia: "",
    banco_conta: "",
    tipo_conta: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await UserService.getBank(AuthService.getCurrentUser().id);
          if(response.data)
            setBank(response.data);
      } catch (e) {

      }
    };
    fetchUser();
  }, []);
  const classes = useStyles();
  const [fields, setFields] = useState({
    banco_nome: "",
    banco_agencia: "",
    banco_conta: "",
    tipo_conta: "",
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields
  })
  const [isError, setIsError] = useState(false)
  const handleChange = input => ({ target: { value } }) => {
    // Set user to the fields
    setBank({
      ...bank,
      [input]: value
    })
    // Handle errors
    const formErrors = { ...filedError }
    const lengthValidate = value.length >= 0 && value.length < 3
    switch (input) {
      case "banco_nome":
        formErrors.banco_nome = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
        break
      case "banco_agencia":
        formErrors.banco_agencia = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
        break
        case "banco_conta":
      formErrors.banco_conta = lengthValidate
        ? "Necessário mínimo de 3 caracteres."
        : ""
      break
      case "tipo_conta":
      formErrors.tipo_conta = lengthValidate
        ? "Necessário mínimo de 3 caracteres."
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
    console.log(bank);
    if(bank && bank.banco_nome.length > 0 && bank.banco_agencia.length > 0 && bank.banco_conta.length > 0 && bank.tipo_conta.length > 0){
      if(!isError) {
        UserService.bankUpdate(
          bank
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
    }else {
      MySwal.fire({
        title: 'Fail',
        text: "You should input to all fields",
        dangerMode: true
      })
    }

  }
  //console.log(bank);
  //setIsError(bank.banco_nome.length > 0 && bank.banco_agencia.length > 0 && bank.banco_conta.length > 0 && bank.tipo_conta.length > 0);
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
          subheader="Você pode atualizar os dados bancários para recebimento de saque"
          title="Conta bancária"
        />
        <Divider />
        <CardContent>
            <Grid container spacing={2} noValidate>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Banco Nome"
                  name="banco_nome"
                  placeholder="ex: Banco do Brasil"
                  value={bank.banco_nome}
                  onChange={handleChange("banco_nome")}
                  margin="normal"
                  error={filedError.banco_nome !== ""}
                  helperText={
                    filedError.banco_nome !== "" ? `${filedError.banco_nome}` : ""
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Número da Agência"
                  name="banco_agencia"
                  placeholder="ex: 123"
                  value={bank.banco_agencia}
                  onChange={handleChange("banco_agencia")}
                  margin="normal"
                  error={filedError.banco_agencia !== ""}
                  helperText={
                    filedError.banco_agencia !== "" ? `${filedError.banco_agencia}` : ""
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Número da Conta"
                  name="banco_conta"
                  placeholder="ex: 40342-9"
                  value={bank.banco_conta}
                  onChange={handleChange("banco_conta")}
                  margin="normal"
                  error={filedError.banco_conta !== ""}
                  helperText={
                    filedError.banco_conta !== "" ? `${filedError.banco_conta}` : ""
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Tipo de Conta"
                  name="tipo_conta"
                  placeholder="selecione"
                  value={bank.tipo_conta}
                  onChange={handleChange("tipo_conta")}
                  margin="normal"
                  error={filedError.tipo_conta !== ""}
                  helperText={
                    filedError.tipo_conta !== "" ? `${filedError.tipo_conta}` : ""
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
            disabled={isError}
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
