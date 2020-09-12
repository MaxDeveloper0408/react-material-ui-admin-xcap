import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import SimpleMaskMoney from 'simple-mask-money/lib/simple-mask-money'
import $ from 'jquery'
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

const PlanList = props => {
  //basic setting
  const classes = useStyles();
  const { className, UserService, AuthService, PlanService, DepositService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await DepositService.getAll();
          setPlans(response.data);
        } catch (e) {
            setPlans([]);
        }
    };
    fetchUsers();
  }, []);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
    console.log(page)
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  //handle action
  const submit = () => {
  }

  const handleApprove = (user_id, deposit_id, user_value, invest_type) => {
          MySwal.fire({
            title: 'Aprovar Depósito',
            html:
                '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Cliente solicitou: ' + currencyFormatter.format(user_value, { code: 'BRL', symbol: '' }) + '</h2>' +
                  '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Insira um valor (min. R$5.000,00)</h2>' +
                  '<input id="swal_open_value" type="text" min="5000" class="swal2-input" style="max-width:100%;" placeHolder="5.000,00">' +
                  '<select id="swal_investment_type" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 16px;padding: .975em .625em;"><option value="FLEXIVEL">FLEXIVEL</option><option value="CRESCIMENTO">CRESCIMENTO</option></select>',
            showCancelButton: true,
            preConfirm: (value) => {
              if( SimpleMaskMoney.formatToNumber(document.getElementById('swal_open_value').value) < 5000) {
                MySwal.showValidationMessage('You should put more than 5.000')
              }
            },
            onOpen: () => {
              $('#swal_investment_type').val(invest_type)
              const input = document.getElementById('swal_open_value')
              SimpleMaskMoney.setMask(input, {
                allowNegative: false,
                negativeSignAfter: false,
                prefix: '',
                suffix: '',
                fixed: true,
                fractionDigits: 2,
                decimalSeparator: ',',
                thousandsSeparator: '.',
                cursor: 'move'
              });
              input.oninput = () => {

              }
            }
          }).then(function (result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {
              return;
            }else if(result.value){
              DepositService.setApprove(
                {
                  user_id: user_id,
                  id: deposit_id,
                  admin_value: SimpleMaskMoney.formatToNumber(document.getElementById('swal_open_value').value),
                  investment_type: document.getElementById('swal_investment_type').value,
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
          subheader="Histórico de depósitos solicitados."
          title="Lista de Depósitos"
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar>
          <div className={classes.inner}>
          <div className={classes.margin}>
          </div>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell className="blackText" style={{color: '#212a37'}}>Nome Completo</TableCell>
                <TableCell className="blackText" style={{color: '#212a37'}}>E-mail</TableCell>
                <TableCell className="blackText" style={{color: '#212a37'}}>Celular</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Valor Informado</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Valor Aprovado</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Plano</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Status</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.slice(0, rowsPerPage).map(item => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                  >
                    <TableCell>{item.user.full_name}</TableCell>
                    <TableCell>{item.user.email}</TableCell>
                    <TableCell>{item.user.cellphone}</TableCell>
                    <TableCell>{currencyFormatter.format(item.user_value, { code: 'BRL', symbol: '' })}</TableCell>
                    <TableCell>{currencyFormatter.format(item.admin_value, { code: 'BRL', symbol: '' })}</TableCell>
                    <TableCell>{item.invest_type}</TableCell>
                    <TableCell>
                      {item.status}
                    </TableCell>
                    <TableCell>
                      {item.status != 'concluído' ? (
                        <Button variant="contained" color="secondary" onClick={handleApprove.bind(this, item.user_id, item.id, item.user_value, item.invest_type)}>
                        Aprovar
                        </Button>
                      ): ('')}
                    </TableCell>
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

PlanList.propTypes = {
  className: PropTypes.string
};

export default PlanList;
