import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import SimpleMaskMoney from 'simple-mask-money/lib/simple-mask-money'
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min'; 



import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    margin: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
}));

const WithdrawList = props => {
  //basic setting

  // let input = document.getElementsByTagName('input')[0];
  // if(input) {
  //   input.oninput = () => {
  //     input.value = SimpleMaskMoney.format(input.value);
  //   }
  
  //   // Your send method
  //   input.onkeyup = (e) => {
  //     if (e.key !== "Enter") return;
  //     // This method return value of your input in format number to save in your database
  //     SimpleMaskMoney.formatToNumber(input.value);
  //   }
  // }
  

  const classes = useStyles();
  const { className, UserService, AuthService, PlanService,WithdrawService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await WithdrawService.getPlanByUser(AuthService.getCurrentUser().id);
          setPlans(response.data);
        } catch (e) {
            setPlans([]);
        }
    };
    fetchUsers();
  
  }, []);

  const args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'move'
  };


  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  //handle action
  const handleWithdraw = () => {
    UserService.getBalance(AuthService.getCurrentUser().id).then(
      response => {
        if(response.status == 'fail') {
          MySwal.fire({
            title: 'Alarm',
            icon: 'warning',
            text: response.message
          })
        } else {
          if(response.length == 0 || response == null || response == undefined || response.balance < 1000) {
            MySwal.fire({
              title: 'Alarm',
              icon: 'warning',
              text: 'You should have available balance more than 1.000 to withraw'
            })
          }else if(response.balance >= 1000) {
            MySwal.fire({
              title: 'Withdraw',
              html:
                    '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Avaliable balance : '+currencyFormatter.format(response.balance, { code: 'BRL', symbol: '' })+'</h2>' +
                    '<input type="text" id="swal_withdraw_value" value="" class="swal2-input" style="max-width: 100%;" placeHolder="1,000">', 
              showCancelButton: true,
              preConfirm: (value) => {
                if( SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value').value) < 0 
                || SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value').value) == '' 
                || SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value').value) > response.balance) {
                  MySwal.showValidationMessage('You should put correct value')
                }
              },
              onOpen: () => {
                const input = document.getElementById('swal_withdraw_value')
                SimpleMaskMoney.setMask(input, args);
                input.oninput = () => {
  
                }
              }
            }).then(function (result) {
              if (result.dismiss === MySwal.DismissReason.cancel) {
                return;
              }else if(result.value){
                WithdrawService.add({
                  withdraw_value: SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value').value),
              }).then(
                  response => {
                    MySwal.fire({
                      title: 'Success',
                      text: response.message
                    })
                    window.location.reload();
                  },
                  error => {
                    console.log(error)
                  }
                );
              }
              
            })  
          }
        }
       
      },
      error => {
        console.log(error)
      }
    )
  }
  async function is_exist_cpf() {
    const cpf_response = await UserService.check_cpf_user(document.getElementById('swal_withdraw_cpf').value)
    if(cpf_response.cpf_user == null) {
      return false;
    }else {
      return true
    }
  }
  const  handleThrought = () => {
    UserService.getBalance(AuthService.getCurrentUser().id).then(
      response => {
        if(response.status == 'fail') {
          MySwal.fire({
            title: 'Alarm',
            icon: 'warning',
            text: response.message
          })
        } else {
          if(response.length == 0 || response == null || response == undefined || response.balance < 1000) {
            MySwal.fire({
              title: 'Alarm',
              icon: 'warning',
              text: 'You should have available balance more than 1.000 to transfer'
            })
          }else if(response.balance >= 1000) {
            MySwal.fire({
              title: 'Transfer to people',
              html:
                    '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Avaliable balance : '+currencyFormatter.format(response.balance, { code: 'BRL', symbol: '' })+'</h2>' +
                    '<input type="text" id="swal_withdraw_value1" value="" class="swal2-input" style="max-width: 100%;" placeHolder="1,000">' + 
                    '<input type="text" id="swal_withdraw_cpf" value="" class="swal2-input" style="max-width: 100%;" placeHolder="">', 
              showCancelButton: true,
              preConfirm: (value) => {
                
                
                const cpfRegex = RegExp(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)
                if( SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value1').value) < 0 
                || SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value1').value) == '' 
                || SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value1').value) > response.balance) {
                  MySwal.showValidationMessage('You should put correct value')
                }else if(!cpfRegex.test(document.getElementById('swal_withdraw_cpf').value)){
                  MySwal.showValidationMessage('You should put correct cpf')
                }else {
                  
                }
              },
              onOpen: (el) => {
                const input = document.getElementById('swal_withdraw_value1')
                const cpf_input = document.getElementById('swal_withdraw_cpf')
                SimpleMaskMoney.setMask(input, args)
                $('#swal_withdraw_cpf').mask('000.000.000-00')
              }
            }).then(function (result) {
              if (result.dismiss === MySwal.DismissReason.cancel) {
                return;
              }else if(result.value){
                UserService.check_cpf_user(document.getElementById('swal_withdraw_cpf').value).then(cpf_response => {
                  if(cpf_response.cpf_user == null) {
                    MySwal.fire({
                      title: 'Fail',
                      icon: 'warning',
                      text: "This cpf don't exist in user account"
                    })
                  }else {
                    WithdrawService.transfer({
                      cpf: document.getElementById('swal_withdraw_cpf').value,
                      withdraw_value: SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value1').value),
                  }).then(
                      response => {
                        MySwal.fire({
                          title: 'Success',
                          text: response.message
                        })
                        window.location.reload();
                      },
                      error => {
                        console.log(error)
                      }
                    );
                  }
                })
                
              }
              
            })  
          }
        }
       
      },
      error => {
        console.log(error)
      }
    )
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
          subheader="You can add your withdraw"
          title="Withdraw List"
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar>
          <div className={classes.inner}>
          <div className={classes.margin}>
          <Button variant="outlined" color="inherit" onClick={handleWithdraw.bind()}>
              Withdraw
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleThrought.bind()}>
              Throught Accounts
          </Button>
          </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{color: '#212a37'}} className="blackText">Request Date</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Approve Date</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Value</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>CPF</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.slice(0, rowsPerPage).map(item => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{moment(item.createdAt).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{moment(item.updatedAt).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{currencyFormatter.format(item.value, { code: 'BRL', symbol: '' })}</TableCell>
                    <TableCell>{item.cpf}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
        </CardContent>
        <Divider />
        <CardActions>
          <TablePagination
            component="div"
            count={plans.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </form>
    </Card>
  );
};

WithdrawList.propTypes = {
  className: PropTypes.string
};

export default WithdrawList;

