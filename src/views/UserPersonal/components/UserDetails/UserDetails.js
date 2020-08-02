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
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import InputMask from "react-input-mask"


import CPF from "cpf_cnpj";
const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
const cpfRegex = RegExp(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)

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
    full_name: "",
    email: "",
    investment_type: "",
    birthdate: "",
    gender: "",
    cpf: "",
    cellphone: "",
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    investment: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await UserService.getOneUser(AuthService.getCurrentUser().id);
          if(response.data.password)
            delete response.data.password
          setUser(response.data);
      } catch (e) {
        setUser({});
      }
    };
    fetchUser();
  }, []);
  const user_investment_type = user.investment_type;
  const classes = useStyles();
  const [fields, setFields] = useState({
    full_name: "",
    email: "",
    investment_type: "",
    birthdate: "",
    gender: "",
    cpf: "",
    cellphone: "",
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    investment: "",
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields
  })
  const [isError, setIsError] = useState(false)
  const [isZipcode, setIsZipcode] = useState(true)

  const handleChange = input => ({ target: { value } }) => {
    // Set user to the fields
    setUser({
      ...user,
      [input]: value
    })
    // Handle errors
    const formErrors = { ...filedError }
    const lengthValidate = value.length >= 0 && value.length < 3
    const numberValidate = /^[0-9]{0,255}$/;
    const phoneValidate = /^([+][0-9]{2})?([ ]\([0-9]{2})\)[ ]([0-9]{3}|[0-9]{5})-[0-9]{4}$/;
    let cep = '';
    let cepformatValidate = true;

    if(input == "zipcode") {
      cep = value;
      cep = cep.replace(/\D/g, '')
      let val_cep = value;
      var validate = /[0-9]{5}[-][0-9]{3}/;
      cepformatValidate = cep == '';
          if (validate.test(val_cep)) {
            fetch("https://viacep.com.br/ws/"+cep+"/json")
              .then(res => res.json())
              .then(
                (result) => {
                  if(result.erro) {
                    cepformatValidate = true;
                    setUser({
                      ...user,
                      street: '',
                      neighborhood: '',
                      city: '',
                      state: ''
                    })
                    setIsZipcode(false)
                  } else {
                    setUser({
                      ...user,
                      zipcode: value,
                      street: result.logradouro,
                      neighborhood: result.bairro,
                      city: result.localidade,
                      state: result.uf
                    })
                    cepformatValidate = false;
                    setIsZipcode(true)
                  }
                },
                (error) => {
                  setIsZipcode(false)
                  cepformatValidate = true;
                }
            )
          }else {
            setIsZipcode(false)
            cepformatValidate = true;
          }
    }

    switch (input) {
      case "full_name":
        formErrors.full_name = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
        break
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Endereço de email inválido."
      break
      case "cpf":
        formErrors.cpf = !CPF.CPF.isValid(value) || !cpfRegex.test(value)
          ? "CPF inválido. i.e. 532.820.857-96"
          : ""
      break
      case "cellphone":
        formErrors.cellphone = phoneValidate.test(value)
          ? ""
          : "Por favor insira um número de telefone válido. i.e: +55 (99) 99999-9999"
      break
      case "password":
        formErrors.password = value.length >= 0 && value.length < 6
          ? "Necessário mínimo de 6 caracteres."
          : ""
      break
      case "confirm":
        formErrors.confirm = lengthValidate
          ? "Necessário mínimo de 6 caracteres."
          : ""
      break
      case "zipcode":
        formErrors.zipcode = value.length == 0 || cepformatValidate
          ? "Formato de CEP inválido."
          : ""
      break
      case "birthdate":
        formErrors.birthdate = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
      break
      case "gender":
        formErrors.gender = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
      break
      case "street":
        formErrors.street = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
      break
      case "number":
        formErrors.number = !numberValidate.test(value) || value.length < 2 || value.length > 5
          ? "Números mínimos 2 e 5 máximos necessários."
          : ""
      break
      case "complement":
        formErrors.complement = ""
      break
      case "neighborhood":
        formErrors.neighborhood = lengthValidate
          ? "Necessário mínimo de 3 caracteres."
          : ""
      break
      case "city":
        formErrors.city = value.length == 0
          ? "Necessário mínimo de 1 caractere."
          : ""
      break
      case "state":
        formErrors.state = value.length == 0
          ? "Necessário mínimo de 1 caractere."
          : ""
      break
      case "investment":
        formErrors.investment = lengthValidate
          ? "Necessário mínimo de 2 caracteres."
          : ""
      break
      case "investment_type":
        formErrors.investment_type = lengthValidate
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
    if(!isError) {
      UserService.update(
        user
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
          subheader="O endereço pode ser atualizado uma vez a cada 72 horas. Para atualizar dados pessoais como nome ou gênero, entre em contato com o suporte."
          title="Dados Cadastrais"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2} noValidate>
            <Grid item xs={4}>
              <TextField
                fullWidth
                InputProps={{
                  className: classes.colorWhite
                }}
                InputLabelProps={{
                  className: classes.colorWhite,
                  shrink: true,
                }}
                label="Nome Completo"
                name="full_name"
                placeholder="Nome Completo"
                value={user.full_name}
                onChange={handleChange("full_name")}
                margin="normal"
                error={filedError.full_name !== ""}
                helperText={
                  filedError.full_name !== "" ? `${filedError.full_name}` : ""
                }
                disabled
                required
              />
            </Grid>
            <Grid item xs={4}>
                    <TextField
                        fullWidth
                        value={user.cpf}
                        InputProps={{
                          className: classes.colorWhite
                        }}
                        InputLabelProps={{
                          className: classes.colorWhite,
                          shrink: true,
                        }}
                        disabled
                        label="CPF"
                        name="cpf"
                        placeholder="formato: 123.432.156-12"
                        margin="normal"
                        error={filedError.cpf !== ""}
                        helperText={
                          filedError.cpf !== "" ? `${filedError.cpf}` : ""
                        }
                        required
                      />

            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                fullWidth
                  InputProps={{
                  className: classes.colorWhite
                }}
                InputLabelProps={{
                  className: classes.colorWhite,
                  shrink: true,
                }}
                label="E-mail"
                name="email"
                placeholder="meu@email.com.br"
                type="email"
                value={user.email}
                onChange={handleChange("email")}
                margin="normal"
                error={filedError.email !== ""}
                helperText={filedError.email !== "" ? `${filedError.email}` : ""}
                required
              />
            </Grid>
            <Grid item xs={4}>
                 <TextField
                          disabled
                          value={user.cellphone}
                          fullWidth
                            InputProps={{
                            className: classes.colorWhite
                          }}
                          InputLabelProps={{
                            className: classes.colorWhite,
                            shrink: true,
                          }}
                          fullWidth
                          label="Celular"
                          name="cellphone"
                          placeholder="i.e: +55 (99) 99999-9999"
                          margin="normal"
                          error={filedError.cellphone !== ""}
                          helperText={filedError.cellphone !== "" ? `${filedError.cellphone}` : ""}
                  />
            </Grid>

            <Grid item xs={4}>
              <TextField
                disabled
                fullWidth
                InputProps={{
                  className: classes.colorWhite
                }}
                InputLabelProps={{
                  className: classes.colorWhite,
                  shrink: true,
                }}
                label="Nascimento"
                name="birthdate"
                type="date"
                value={user.birthdate}
                onChange={handleChange("birthdate")}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <FormControl fullWidth required margin="normal">
                <InputLabel htmlFor="gender">Gênero</InputLabel>
                <Select className={classes.colorWhite} value={user.gender} onChange={handleChange("gender")} disabled>
                  <MenuItem value={"MASCULINO"}>MASCULINO</MenuItem>
                  <MenuItem value={"FEMININO"}>FEMININO</MenuItem>
                  <MenuItem value={"TRANSGÊNERO"}>TRANSGÊNERO</MenuItem>
                  <MenuItem value={"OUTRO"}>OUTRO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputMask
                mask="99999-999"
                maskChar=" "
                value={user.zipcode}
                onChange={handleChange("zipcode")}
              >
                {() => <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        label="CEP"
                        name="zipcode"
                        placeholder="Enter your zipcode"
                        margin="normal"
                        error={!isZipcode}
                        helperText={isZipcode ? "" : "Formato de CEP inválido."}
                        required
                      />
                }
                </InputMask>

            </Grid>
            <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Logradouro"
                  name="street"
                  placeholder="Digite sua rua/logradouro."
                  value={user.street}
                  onChange={handleChange("street")}
                  margin="normal"
                  error={filedError.street !== ""}
                  helperText={filedError.street !== "" ? `${filedError.street}` : ""}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Número"
                  name="number"
                  placeholder="Digite o número da residência."
                  value={user.number}
                  onChange={handleChange("number")}
                  margin="normal"
                  error={filedError.number !== ""}
                  helperText={filedError.number !== "" ? "Números de 2 a 5 necessários." : ""}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Complemento"
                  name="complement"
                  placeholder="Digite um complemento. i.e: apartamento 10"
                  value={user.complement}
                  onChange={handleChange("complement")}
                  margin="normal"
                  error={filedError.complement !== ""}
                  helperText={filedError.complement !== "" ? `${filedError.complement}` : ""}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="neighborhood"
                  placeholder="Digite o bairro da residência."
                  value={user.neighborhood}
                  onChange={handleChange("neighborhood")}
                  margin="normal"
                  error={filedError.neighborhood !== ""}
                  helperText={filedError.neighborhood !== "" ? `${filedError.neighborhood}` : ""}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    className: classes.colorWhite
                  }}
                  InputLabelProps={{
                    className: classes.colorWhite
                  }}
                  fullWidth
                  label="Cidade"
                  name="city"
                  placeholder="Digite o nome da cidade."
                  value={user.city}
                  onChange={handleChange("city")}
                  margin="normal"
                  error={filedError.city !== ""}
                  helperText={filedError.city !== "" ? `${filedError.city}` : ""}
                  disabled
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    className: classes.colorWhite
                  }}
                  InputLabelProps={{
                    className: classes.colorWhite
                  }}
                  fullWidth
                  label="Estado"
                  name="state"
                  placeholder="Digite o nome do estado."
                  value={user.state}
                  onChange={handleChange("state")}
                  margin="normal"
                  error={filedError.state !== ""}
                  helperText={filedError.state !== "" ? `${filedError.state}` : ""}
                  disabled
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
