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
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography, IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

const DepositList = props => {
  const classes = useStyles();
  const { className, userId, UserService, AuthService,DepositService, PlanService,WithdrawService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await DepositService.get_deposit({user_id: userId });
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


  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return plans.length > 0 ? (
      <Card
          {...rest}
          className={clsx(classes.root, className)}
      >
        <form
            autoComplete="off"
            noValidate
        >
          <CardHeader
              subheader=""
              title="Aprovação Depósitos"
          />
          <Divider />
          <CardContent>
            <PerfectScrollbar>
              <div className={classes.margin}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="blackText" style={{color: '#212a37'}}>Data de Aprovação</TableCell>
                      <TableCell className="blackText" style={{color: '#212a37'}}>Valor</TableCell>
                      <TableCell className="blackText" style={{color: '#212a37'}}>Plano</TableCell>
                      <TableCell className="blackText" style={{color: '#212a37'}}>Status</TableCell>
                      <TableCell className="blackText" style={{color: '#212a37'}}>Tipo de ação</TableCell>
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
                              <Typography variant="body1">{moment(item.updatedAt).format('DD/MM/YYYY')}</Typography>
                            </div>
                          </TableCell>
                          <TableCell>{currencyFormatter.format(item.admin_value, { code: 'BRL', symbol: '' })}</TableCell>
                          <TableCell>{item.invest_type}</TableCell>
                          <TableCell>{item.status == 'concluído' ? 'Aprovação' : 'Solicitação' }</TableCell>
                          <TableCell>Depósitos</TableCell>
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
  ):('');
};

DepositList.propTypes = {
  className: PropTypes.string
};

export default DepositList;
