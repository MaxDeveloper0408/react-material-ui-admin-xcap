import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import $ from 'jquery';
import SimpleMaskMoney from 'simple-mask-money';
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
    Typography
} from '@material-ui/core';


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
    const { className, UserService, AuthService, PlanService, Constants, MySwal, ...rest } = props;
    //handle table
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await PlanService.getAllByInvestType({ invest_type: 'CRESCIMENTO' });
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
    const handleAdd = () => {
        MySwal.fire({
            title: 'Adicionar Crescimento',
            html:
                '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Mínimo de: '+currencyFormatter.format(5000, { code: 'BRL', symbol: '' })+'</h2>' +
                '<input type="text" id="swal_plan_value" value="" class="swal2-input" style="max-width: 100%;" placeHolder="5,000">' +
                '<input type="text" id="swal_user_cpf" value="" class="swal2-input" style="max-width: 100%;" placeHolder="CPF">' +
                '<select id="swal_percent" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 1.125em;padding: .975em .625em;">' +
                '<option value="20">20%</option><option value="19">19%</option><option value="18">18%</option><option value="17">17%</option><option value="16">16%</option><option value="15">15%</option>' +
                '</select>',
            showCancelButton: true,
            preConfirm: (value) => {
                const cpfRegex = RegExp(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)
                if( SimpleMaskMoney.formatToNumber(document.getElementById('swal_plan_value').value) < 5000
                    || SimpleMaskMoney.formatToNumber(document.getElementById('swal_plan_value').value) == '') {
                    MySwal.showValidationMessage('Mínimo de 5.000,00')
                }else if(!cpfRegex.test(document.getElementById('swal_user_cpf').value)){
                    MySwal.showValidationMessage('CPF é inválido ou não existe no sistema')
                }else {

                }
            },
            onOpen: (el) => {
                const input = document.getElementById('swal_plan_value')
                const cpf_input = document.getElementById('swal_user_cpf')
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
                })
                $('#swal_user_cpf').mask('000.000.000-00')
            }
        }).then(function (result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {
                return;
            }else if(result.value){
                const swal_plan_value = document.getElementById('swal_plan_value').value
                const swal_percent = document.getElementById('swal_percent').value
                UserService.check_cpf_user(document.getElementById('swal_user_cpf').value).then(cpf_response => {
                    if(cpf_response.cpf_user == null) {
                        MySwal.fire({
                            title: 'Fail',
                            icon: 'warning',
                            text: "CPF inválido ou não existe no sistema"
                        })
                    }else{
                        PlanService.addPlanAdmin({
                            user_id: cpf_response.cpf_user.id,
                            open_value: SimpleMaskMoney.formatToNumber(swal_plan_value),
                            investment_type: 'CRESCIMENTO',
                            percent: swal_percent
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
                        )
                    }
                })

            }

        })
    }
    const handleApprove = (plan_id) => {
        MySwal.fire({
            title: 'Confirmar',
            icon: 'warning',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true
        })
            .then((result) => {
                if (result.value) {
                    PlanService.setApprove(plan_id).then(
                        response => {
                            MySwal.fire({
                                title: 'Sucesso',
                                text: response.message
                            });
                            window.location.reload();
                        },
                        error => {
                            console.log(error);
                        }
                    );
                } else if (result.dismiss === MySwal.DismissReason.cancel) {

                }
            });

    };
    const handleDelete = (plan_id) => {
        MySwal.fire({
            title: 'Confirma a exclusão permanentemente?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        })
            .then((result) => {
                if (result.value) {
                    PlanService.delete({ id: plan_id }).then(
                        response => {
                            MySwal.fire({
                                title: 'Success',
                                text: response.message
                            });
                            window.location.reload();
                        },
                        error => {
                            console.log(error);
                        }
                    );
                } else if (result.dismiss === MySwal.DismissReason.cancel) {

                }
            });
    };
    const handleUpload = (id, user_id) => {
        MySwal.fire({
            title: 'Upload do Contrato ',
            text: 'Entre com o aporte',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            html: '<input type="file" id="swal_admin_cpf" name="admin_pdf" class="swal2-input" style="max-width: 100%;" placeHolder="">',
            preConfirm: (value) => {
                if (document.getElementById('swal_admin_cpf').files.length == 0) {
                    MySwal.showValidationMessage('O contrato precisa estar em formato .PDF');
                }
            },
            onOpen: () => {
                $('#swal_admin_cpf').change(function(e) {
                    console.log(e);
                    var reader = new FileReader();
                    reader.readAsDataURL(this.files[0]);
                });
            }
        }).then(function(result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {
                return;
            } else if (result.value) {
                var formData = new FormData();
                var file = $('#swal_admin_cpf')[0].files[0];
                formData.append('id', id);
                formData.append('userId', user_id);
                formData.append('pdf_field', 'admin_pdf2');
                formData.append('admin_pdf', file);

                UserService.uploadAdminContract(formData).then(
                    response => {
                        if (response.status == 'success') {
                            MySwal.fire({
                                title: 'Uploaded successfully',
                                icon: 'success',
                                text: response.message
                            });
                        } else if (response.status == 'fail') {
                            MySwal.fire({
                                title: 'Falha',
                                icon: 'warning',
                                text: response.message
                            });
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    };
    const handleEdit = (id, profit_percent) => {
        MySwal.fire({
            title: 'Selecione abaixo:',
            text: '',
            input: 'select',
            inputOptions: Constants.CRESC_PERCENT_SELECT,
            inputValue: profit_percent == null || profit_percent == '' ? 20 : profit_percent,
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value != null) {
                        resolve();
                    }
                });
            }
        }).then(function(result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {
            } else if (result.value) {
                PlanService.plan_percent_add({ contract_id: id, percent: result.value,investment_type: 'CRESCIMENTO' }).then(
                    response => {
                        MySwal.fire({
                            title: 'Success',
                            text: response.message
                        });
                        window.location.reload();
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
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                    subheader="Histórico de solicitação de planos."
                    title="Planos"
                />
                <Divider/>
                <CardContent>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <div className={classes.margin}>
                                <Button variant="outlined" color="inherit" onClick={handleAdd.bind()}>
                                    Adicionar Plano
                                </Button>
                            </div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: '#212a37' }} className="blackText">Nome
                                            Completo</TableCell>
                                          <TableCell style={{ color: '#212a37' }} className="blackText">Telefone</TableCell>
                                        <TableCell style={{ color: '#212a37' }} className="blackText">Data de
                                            Início</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Data de
                                            Término</TableCell>
                                          <TableCell className="blackText" style={{ color: '#212a37' }}>Aporte</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Profit</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Status</TableCell>
                                        <TableCell className="blackText" style={{ color: '#212a37' }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plans.slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map(item => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={item.id}
                                        >
                                            <TableCell>{item.user.full_name}</TableCell>
                                            <TableCell>{item.user.cellphone}</TableCell>
                                            <TableCell>
                                                <div className={classes.nameContainer}>
                                                    <Typography
                                                        variant="body1">{moment(item.start_date).format('DD/MM/YYYY')}</Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell>{moment(item.end_date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{currencyFormatter.format(item.open_value, {
                                                code: 'BRL',
                                                symbol: ''
                                            })}</TableCell>
                                            <TableCell>
                                                {item.percent + '%'}
                                            </TableCell>
                                            <TableCell>
                                                {item.status}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    item.status == 'pendente' ? (
                                                        <Button variant="contained" color="secondary"
                                                                onClick={handleApprove.bind(this, item.id)}>
                                                            Aprovar
                                                        </Button>
                                                    ) : (
                                                        <div>
                                                            {item.status != 'concluído' ? (
                                                                <div>
                                                                <Button variant="contained" color="secondary"
                                                                        onClick={handleDelete.bind(this, item.id)}>
                                                                    Excluir
                                                                </Button>
                                                                <Button variant="contained" color="secondary"
                                                                        onClick={handleEdit.bind(this, item.id, item.percent)}>
                                                                    Editar
                                                                </Button>
                                                                <Button variant="contained" color="secondary"
                                                                onClick={handleUpload.bind(this, item.id, item.user.email)}>
                                                                Upar
                                                                </Button>
                                                                </div>
                                                            ) : ('')
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </TableCell>
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
