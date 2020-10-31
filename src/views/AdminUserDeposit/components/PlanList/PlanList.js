import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import SimpleMaskMoney from 'simple-mask-money/lib/simple-mask-money';
import $ from 'jquery';
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
    TablePagination, IconButton
} from '@material-ui/core';
import userService from '../../../../services/user.service';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {},
    colorWhite: {
        color: 'white!important'
    },
    disableButton: {
        '&:disabled': {
            color: 'rgb(206, 191, 191)!important',
            backgroundColor: 'rgb(107, 110, 128)!important'
        }
    },
    margin: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

const PlanList = props => {
    //basic setting
    const classes = useStyles();
    const { className, UserService, AuthService, PlanService, DepositService, MySwal, userId, useHistory, ...rest } = props;
    //handle table
    const [plans, setPlans] = useState([]);
    const [sel_user, setSel_user] = useState({});
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await DepositService.get_deposit({user_id: userId, type: 1});
                setPlans(response.data);
                const user_response = await UserService.getOneUser(userId);
                setSel_user(user_response.data)
            } catch (e) {
                setPlans([]);
            }
        };
        fetchUsers();
    }, []);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    }
    const handlePageChange = (event, page) => {
        setPage(page);
        console.log(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(event.target.value);
    };
    const handleDeposit = () => {
        MySwal.fire({
            html:
                '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Insira um valor (min. R$5.000,00)</h2>' +
                '<input id="swal_open_value" type="text" min="5000" class="swal2-input" style="max-width:100%;" placeHolder="5.000,00">' +
                '<select id="swal_investment_type" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 16px;padding: .975em .625em;"><option value="FLEXIVEL">FLEXIVEL</option><option value="CRESCIMENTO">CRESCIMENTO</option></select>' +
                '<select id="swal_percent" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 1.125em;padding: .975em .625em;">' +
                '<option value="10">10%</option><option value="5">5%</option><option value="6">6%</option><option value="7">7%</option><option value="8">8%</option><option value="15">15%</option><option value="16">16%</option><option value="17">17%</option><option value="18">18%</option><option value="19">19%</option><option value="20">20%</option>' +
                '</select>',
            title: 'Aprovar Depósito',
            showCancelButton: true,
            preConfirm: (value) => {
                if (SimpleMaskMoney.formatToNumber(document.getElementById('swal_open_value').value) < 5000) {
                    MySwal.showValidationMessage('Mínimo de 5.000,00');
                }
            },
            onOpen: () => {
                const input = document.getElementById('swal_open_value');
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
                };
            }
        }).then(function(result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {

            } else if (result.value) {
                let params = {
                    user_id: sel_user.id,
                    invest_type:  document.getElementById('swal_investment_type').value,
                    percent: document.getElementById('swal_percent').value,
                    open_value: SimpleMaskMoney.formatToNumber(document.getElementById('swal_open_value').value)
                };
                userService.admin_deposit_to_user(params).then(
                    response => {
                        DepositService.get_deposit({user_id: userId, type: 1}).then(
                            response1 => {
                                setPlans(response1.data);
                            }
                        );
                        MySwal.fire({
                            title: 'Success',
                            text: response.message
                        });
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    };

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <IconButton onClick={gotoBack}>
                <ArrowBackIcon />
            </IconButton>
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                    subheader="Histórico de depósitos solicitados."
                    title={sel_user.full_name + "("+ sel_user.cpf+"): Lista de Depósitos"}
                />
                <Divider/>
                <CardContent>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <div className={classes.margin}>
                                <Button variant="outlined" color="inherit" onClick={handleDeposit.bind()}>
                                    ADICIONAR FUNDOS
                                </Button>
                            </div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Data</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Valor</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Profit</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Plano</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plans.slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map(item => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={item.id}
                                        >
                                            <TableCell>{moment(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{currencyFormatter.format(item.admin_value, {
                                                code: 'BRL',
                                                symbol: ''
                                            })}</TableCell>
                                            <TableCell>{item.percent}</TableCell>
                                            <TableCell>{item.invest_type}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <Divider/>
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
