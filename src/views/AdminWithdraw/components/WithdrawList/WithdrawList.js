import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

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
  const classes = useStyles();
  const { className, UserService, AuthService, PlanService,WithdrawService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await WithdrawService.getAll();
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
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  //handle action
  const handleDelete = (withdraw_id, withdraw_value) => {
    MySwal.fire({
      title: 'Confirm',
      text: 'Please delete',
      icon: 'warning',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.value) {
        WithdrawService.delete(withdraw_id, withdraw_value).then(
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
        )
      } else if (result.dismiss === MySwal.DismissReason.cancel) {

      }
    });
  }
  const handleApprove = (withdraw_id) => {
    MySwal.fire({
      title: 'Autorizar Saque',
      text: 'Deseja aprovar este saque?',
      icon: 'warning',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.value) {
        WithdrawService.setApprove(withdraw_id).then(
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
        )
      } else if (result.dismiss === MySwal.DismissReason.cancel) {

      }
    });

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
          subheader="Histórico de saques e transferências realizadas."
          title="Saques/Transferências"
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
                  <TableCell style={{color: '#212a37'}} className="blackText">Data de Solicitação</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Data de Aprovação</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Valor</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Transf. CPF</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Tipo</TableCell>
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
                    <TableCell>
                      {item.cpf == "" || item.cpf == null ? 'Withdraw':'Transfer'}
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {
                      item.status == 'pendente' ? (
                        <div>
                        <Button variant="contained" color="secondary" onClick={handleApprove.bind(this, item.id)}>
                         Aprovar
                        </Button>
                        <Button variant="contained" color="secondary" style={{marginLeft: '10px'}} onClick={handleDelete.bind(this, item.id, item.value)}>
                        Recusar
                        </Button>
                        </div>
                      ) : ('')
                      }
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

WithdrawList.propTypes = {
  className: PropTypes.string
};

export default WithdrawList;
