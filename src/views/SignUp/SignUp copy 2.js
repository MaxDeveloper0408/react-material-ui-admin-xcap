import React, { useState, useEffect,Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export class SignUp extends Component {
  state = {
    step: 1,
    full_name: '',
    email: '',
    password: '',
    confirm: '',
    investment_type: '',
    birthdate: '',
    gender: '',
    cpf: '',
    cellphone: '',
    zipcode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    investment: '',
    password: '',
    salt: '',
    admin: 0,
    first_access: 0,
    client_type: '',
    active: 'YES',
  }

  nextStep = () => {
    const {step} = this.state;
    this.setState({step: step + 1})
  }
  prevStep = () => {
    const {step} = this.state;
    this.setState({step: step - 1})
  }

  handleChange = input => e => {
    this.setState({[input]: e.target.value});
  }

  render () {
    const {step} = this.state;
    const {full_name, investment_type, birthdate, gender, cpf, cellphone,
    zipcode, street, number, complement, neighborhood, city, state, email,
    investment, password, confirm, salt, admin, first_access, client_type,active} = this.state;
    const values = {full_name, investment_type, birthdate, gender, cpf, cellphone,
      zipcode, street, number, complement, neighborhood, city, state, email,
      investment, password, confirm, salt, admin, first_access, client_type,active};
    switch(step) {
      case 1: 
        return (
          <FormStep1
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2: 
        return (
          <h1>step1</h1>
        )
      case 3: 
        return (
          <h1>step1</h1>
        )
    }
  }
}
export default withRouter(SignUp);