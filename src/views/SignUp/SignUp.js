import React, { useState, Fragment } from "react"
import { Link as RouterLink, withRouter, Redirect, useHistory} from 'react-router-dom';
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import Confirm from "./Confirm"
import AuthService from "../../services/auth.service";
import SweetAlert from 'sweetalert2-react';
import CPF from "cpf_cnpj";
import {
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
//import Success from "./Success"

const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
const cpfRegex = RegExp(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)
// Step titles
const labels = ["First Step", "Second Step", "Confirmation"]

const useStyles = makeStyles(theme => ({
  completed: {
    color: "#1361ff!important"
  },
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  },
  contentForm: {
    padding: 50
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
  stepDone: {
    backgroundColor:'#1a237e',
    color: 'white'
  }
}));

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [steps, setSteps] = useState(0)
  const [fields, setFields] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
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
    password: "",
    salt: "",
    client_type: "",
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields
  })

  const [isError, setIsError] = useState(false)
  const [firstIsError, setFirstIsError] = useState(false)
  const [secondIsError, setSecondIsError] = useState(false)
  const [isZipcode, setIsZipcode] = useState(false)
  const [statusFail, setStatusFail] = useState(false)
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')
  // Proceed to next step
  const handleNext = () => setSteps(steps + 1)
  // Go back to prev step
  const handleBack = () => setSteps(steps - 1)

  // Handle fields change
  // const handleBlur = inpurt =? ({tartget:})
  const handleChange = input => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value
    })

    // Handle errors
    const formErrors = { ...filedError }
    const lengthValidate = value.length >= 0 && value.length < 3
    const numberValidate = /^[0-9]{0,255}$/;
    const phoneValidate = /^([+][0-9]{2})?([ ]\([0-9]{2})\)[ ]([0-9]{3}|[0-9]{4})-[0-9]{4}$/;
    let cep = '';
    let cepformatValidate = true;


    if(input == "zipcode") {
      console.log('***zipcoe***');
      console.log(input);
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
                    setFields({
                      ...fields,
                      street: '',
                      neighborhood: '',
                      city: '',
                      state: ''
                    })
                    setIsZipcode(false)
                    // console.log(isZipcode)
                  } else {
                    setFields({
                      ...fields,
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
          ? "Minimum 3 characaters required"
          : ""
        break
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid email address"
      break
      case "cpf":
        formErrors.cpf = !CPF.CPF.isValid(value) || !cpfRegex.test(value)
          ? "invalid CPF. i.e. 532.820.857-96"
          : ""
      break
      case "cellphone":
        formErrors.cellphone = phoneValidate.test(value)
          ? ""
          : "Please enter a valid phone number. i.e: +55 (99) 9999-9999"
      break
      case "password":
        formErrors.password = value.length >= 0 && value.length < 6
          ? "Minimum 6 characaters required"
          : ""
      break
      case "confirm":
        formErrors.confirm = lengthValidate
          ? "Minimum 6 characaters required"
          : ""
      break
      case "zipcode":
        formErrors.zipcode = value.length == 0 || cepformatValidate
          ? "Formato de CEP inválido."
          : ""
      break
      case "birthdate":
        formErrors.birthdate = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "gender":
        formErrors.gender = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "street":
        formErrors.street = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "number":
        formErrors.number = !numberValidate.test(value) || value.length < 2 || value.length > 5
          ? "Minimum 2 and Maxmum 5 numbers required"
          : ""
      break
      case "complement":
        formErrors.complement = ""
      break
      case "neighborhood":
        formErrors.neighborhood = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "city":
        formErrors.city = value.length == 0
          ? "Minimum 1 characaters required"
          : ""
      break
      case "state":
        formErrors.state = value.length == 0
          ? "Minimum 1 characater required"
          : ""
      break
      case "investment":
        formErrors.investment = lengthValidate
          ? "Minimum 3 characaters required"
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
  // const handleBlur = input => ({ target: { value } }) => {
  //   if(input == "zipcode") {
  //     const formErrors = { ...filedError }
  //     var cep = value.replace(/\D/g, '');
  //     const cepformatValidate = cep == '';
  //     formErrors.zipcode = cepformatValidate
  //         ? "Formato de CEP inválido."
  //         : ""
  //     if(cep != '') {
  //         fetch("https://viacep.com.br/ws/"+cep+"/json")
  //           .then(res => res.json())
  //           .then(
  //             (result) => {
  //               setFields({
  //                 street:result.logradouro,
  //                 neighborhood: result.bairro,
  //                 city: result.localidade,
  //                 state: result.uf,
  //                 number: result.ibge 
  //               })
  //               formErrors.zipcode = ""
  //               setFieldError({
  //                 ...formErrors
  //               })
  //             },
  //             (error) => {
  //               formErrors.zipcode = "Formato de CEP inválido."
  //               setFieldError({
  //                 ...formErrors
  //               })
  //             }
  //         )
  //     } else {
  //       formErrors.zipcode = "Formato de CEP inválido."
  //       setFieldError({
  //         ...formErrors
  //       })
  //     }
  //     setFieldError({
  //       ...formErrors
  //     })
  //   }
  // }
  const gotoSignIn = () => {
    history.push("/sign-in");
  }
  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            classes={classes}
            handleNext={handleNext}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        )
      case 1:
        return (
          <SecondStep
            classes={classes}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            isZipcode={isZipcode}
            filedError={filedError}
          />
        )
      case 2:
        return (
          <Confirm
            classes={classes}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            submit={submit}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        )
      default:
        break
    }
  }

  const submit = () => {
    if(!isError) {
      AuthService.register(
        fields
      ).then(
        response => {
          setStatusFail(false);
          setStatus(true);
          setMessage(response.data.message);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setStatusFail(true);
          setStatus(false);
          setMessage(resMessage);

        }
      );
    }
  } 
  // Handle components
  return (

    <div className={classes.root}>

      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                "O dinheiro, assim como as emoções, é algo que você precisa controlar para manter sua vida no caminho certo."
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Natasha Munson
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  xcapitalinv.com.br
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <IconButton onClick={gotoSignIn}>
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
            <div className={classes.contentForm}>
                <Fragment>
                    {steps === labels.length ? (
                      // <Success />
                      <div></div>
                    ) : (
                      <Fragment>
                        <Stepper
                          activeStep={steps}
                          style={{ paddingTop: 30, paddingBottom: 50 }}
                          alternativeLabel
                        >
                          {labels.map(label => (
                            <Step key={label}>
                              <StepLabel StepIconProps={{
                                  classes: { root: classes.completed }
                                }}>
                                  {label}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        {handleSteps(steps)}
                      </Fragment>
                    )}
                </Fragment>
            </div>
           </Grid>
      </Grid>
        <SweetAlert
        show={status}
        title="Success"
        text={message}
        type='success'
        onConfirm={() => {
          setStatus(false)      
          history.push("/sign-in");    
        }}
        />
        <SweetAlert
        show={statusFail}
        title="Fail"
        text={message}
        type='error'
        onConfirm={() => {
          setStatusFail(false)
        }}
        />
    </div>
  )
}

export default withRouter(SignUp);
