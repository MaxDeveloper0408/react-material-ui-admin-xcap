import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import InputMask from "react-input-mask";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import AutoSelect from 'react-select';

const useStyles = makeStyles(() => ({
    root: {
      height: '100%!important'
    },
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
  const { className, UserService, AuthService, MySwal, ...rest } = props
  const [bank, setBank] = useState({
    user_id: AuthService.getCurrentUser().id,
    banco_agencia: "",
    banco_conta: "",
    tipo_conta: "",
    bank_id: ""
  })
  const [bank_list, setBank_list] = useState([])
  const [select_bank, setSelect_bank] = useState({label: '', value: 0})

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await UserService.getBank(AuthService.getCurrentUser().id)
          if(response.data) {
            setBank(response.data)
            setSelect_bank({label: response.data.bank_list.name, value: response.data.bank_id})
          }
            

      } catch (e) {

      }
    }
    const fetchBank = async () => {
      try {
          const bank_response = await UserService.bank_all()
          if(bank_response.data) {
            setBank_list(bank_response.data.map(bank_item => ({
              value: bank_item.id,
              label: bank_item.name
            })))
          }
      } catch (e) {

      }
    };
    fetchUser();
    fetchBank();
  }, []);

  const classes = useStyles();
  const [fields, setFields] = useState({
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
    if(bank.bank_id == "" || bank.bank_id == 0 || bank.bank_id == null) {
      MySwal.fire({
        title: 'Fail',
        text: "You should select bank",
        dangerMode: true
      })
    }else if(bank && bank.banco_agencia.length > 0 && bank.banco_conta.length > 0 && bank.tipo_conta.length > 0){
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
  const select_customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      // color: state.isSelected ? 'red' : 'white',
      color: 'black',
    }),
    // control: () => ({
      // width: '100%',
    // })
  }
  const handleChange_bank = value => {
    setBank({
      ...bank,
      bank_id: value.value
    })
    setSelect_bank({label: value.label, value: value.value})
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
          subheader="Você pode atualizar os dados bancários para recebimento de saque"
          title="Conta bancária"
        />
        <Divider />
        <CardContent>
            <Grid container spacing={2} noValidate>
            <Grid item xs={12}>
                <InputLabel htmlFor="Banco Nome">Banco Nome</InputLabel>
                <AutoSelect 
                value={select_bank? select_bank : ''}
                onChange={value => handleChange_bank(value)}
                maxMenuHeight={190}
                styles={select_customStyles}
                options={bank_list} />
            </Grid>
              <Grid item xs={6}>
                <InputMask
                  mask="999999999999999999999999999999999999999"
                  maskChar=" "
                  value={bank.banco_agencia}
                  onChange={handleChange("banco_agencia")}
                >
                  {() => <TextField
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              label="Número da Agência"
                              name="banco_agencia"
                              placeholder="ex: 123"
                              // value={bank.banco_agencia}
                              // onChange={handleChange("banco_agencia")}
                              margin="normal"
                              error={filedError.banco_agencia !== ""}
                              helperText={
                                filedError.banco_agencia !== "" ? `${filedError.banco_agencia}` : ""
                              }
                              required
                    />}
              </InputMask>
                
              </Grid>
              <Grid item xs={6}>
              <InputMask
                  mask="99999-9"
                  maskChar=" "
                  value={bank.banco_conta}
                  onChange={handleChange("banco_conta")}
                >
                  {() => <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Número da Conta"
                  name="banco_conta"
                  placeholder="ex: 40342-9"
                  margin="normal"
                  error={filedError.banco_conta !== ""}
                  helperText={
                    filedError.banco_conta !== "" ? `${filedError.banco_conta}` : ""
                  }
                  required
                />}
              </InputMask>
                
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="investment_type">Tipo de Conta</InputLabel>
                <Select value={bank.tipo_conta} onChange={handleChange("tipo_conta")}>
                  <MenuItem value={"Conta Corrente"}>Conta Corrente</MenuItem>
                  <MenuItem value={"Conta Poupança"}>Conta Poupança</MenuItem>
                </Select>
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
