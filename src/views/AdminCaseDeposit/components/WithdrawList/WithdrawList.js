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
   const classes = useStyles();
  const { className, UserService, AuthService, PlanService,WithdrawService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await UserService.getAllCaseDeposit();
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
  const  handleThrought = () => {
            MySwal.fire({
              title: 'Depositar para cliente',
              html:
                    '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Mínimo de: '+currencyFormatter.format(5000, { code: 'BRL', symbol: '' })+'</h2>' +
                    '<input type="text" id="swal_withdraw_value1" value="" class="swal2-input" style="max-width: 100%;" placeHolder="5,000">' +
                    '<input type="text" id="swal_withdraw_cpf" value="" class="swal2-input" style="max-width: 100%;" placeHolder="CPF">',
              showCancelButton: true,
              preConfirm: (value) => {
                const cpfRegex = RegExp(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)
                if( SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value1').value) < 5000
                || SimpleMaskMoney.formatToNumber(document.getElementById('swal_withdraw_value1').value) == '') {
                  MySwal.showValidationMessage('Mínimo de 5.000,00')
                }else if(!cpfRegex.test(document.getElementById('swal_withdraw_cpf').value)){
                  MySwal.showValidationMessage('CPF é inválido ou não existe no sistema')
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
                const swql_withdraw_value1 = document.getElementById('swal_withdraw_value1').value
                const swal_withdraw_cpf = document.getElementById('swal_withdraw_cpf').value
                UserService.check_cpf_user(document.getElementById('swal_withdraw_cpf').value).then(cpf_response => {
                  if(cpf_response.cpf_user == null) {
                    MySwal.fire({
                      title: 'Fail',
                      icon: 'warning',
                      text: "CPF inválido ou não existe no sistema"
                    })
                  }else {
                    UserService.addFund({
                      user_id: cpf_response.cpf_user.id,
                      cpf: swal_withdraw_cpf,
                      amount: SimpleMaskMoney.formatToNumber(swql_withdraw_value1),
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
          subheader="Histórico de depósitos realizados por Adm."
          title="Depositar"
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar>
          <div className={classes.inner}>
          <div className={classes.margin}>
          <Button variant="outlined" color="inherit" onClick={handleThrought.bind()}>
              Adicionar fundos
          </Button>
          </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{color: '#212a37'}} className="blackText">Data</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Valor</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>CPF do Destinatário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map(item => (
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
                    <TableCell>{currencyFormatter.format(item.amount, { code: 'BRL', symbol: '' })}</TableCell>
                    <TableCell>{item.user?item.user.cpf:''}</TableCell>
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
