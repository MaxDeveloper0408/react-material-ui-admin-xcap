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
  const { className, UserService, AuthService, PlanService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  const [is_both, setIs_both] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await PlanService.getPlanByUserIT(AuthService.getCurrentUser().id, 'FLEXIVEL');
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
  const handleUpload = () => {
    let is_both_invest_type = false
    let f_count = 0
    let c_count = 0
    plans.map(item => {
      if(item.invest_type == 'FLEXIVEL') {
        f_count = f_count + 1;
      }else if(item.invest_type == 'CRESCIMENTO'){
        c_count = c_count + 1;
      }
    })

    if(f_count > 0 && c_count > 0) {
      is_both_invest_type = true
    }
    var select_html = ''
    if(is_both_invest_type) {
      select_html = '<select id="swal_investment_type" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 16px;padding: .975em .625em;"><option value="FLEXIVEL">FLEXIVEL</option><option value="CRESCIMENTO">CRESCIMENTO</option></select>'
    }

    MySwal.fire({
      title: 'Upload do Contrato',
      text: '',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      html: '<input type="file" id="swal_admin_cpf" name="admin_pdf" class="swal2-input" style="max-width: 100%;" placeHolder="">' + select_html,
      preConfirm: (value) => {
        if(document.getElementById("swal_admin_cpf").files.length == 0) {
          MySwal.showValidationMessage('O contrato precisa estar em formato .PDF')
        }
      },
      onOpen: () => {
        $("#swal_admin_cpf").change(function (e) {
            console.log(e);
            var reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
        });
      }
    }).then(function (result) {
      if (result.dismiss === MySwal.DismissReason.cancel) {
        return
      }else if(result.value){
        var formData = new FormData();
        var file = $('#swal_admin_cpf')[0].files[0];


        let user_pdf = "user_pdf"

        if(f_count > 0 && c_count == 0) {
          user_pdf = "user_pdf"
        }else if(f_count == 0 && c_count > 0){
          user_pdf = "user_pdf2"
        }else if(f_count > 0 && c_count > 0) {
          if(document.getElementById("swal_investment_type").value == "FLEXIVEL") {
            user_pdf = "user_pdf"
          }else {
            user_pdf = "user_pdf2"
          }
        }

        formData.append('user_pdf', file)
        formData.append('pdf_field', user_pdf)
        UserService.getContractPDFByUser(AuthService.getCurrentUser().id).then(cp_res => {
          let cp_res_data = cp_res.data;
          let is_exist = false;
          let admin_is_exist = false;

          if(cp_res_data == null || cp_res_data.length == 0) {
            admin_is_exist = false;
          }else {

            if(user_pdf == "user_pdf") {
              if(!cp_res_data.admin_pdf || 0 === cp_res_data.admin_pdf.length ) {
                admin_is_exist = false;
              }else {
                admin_is_exist = true;
              }
            }else {
              if(!cp_res_data.admin_pdf2 || 0 === cp_res_data.admin_pdf2.length ) {
                admin_is_exist = false;
              }else {
                admin_is_exist = true;
              }
            }

            if(user_pdf == "user_pdf") {
              if(!cp_res_data.user_pdf || 0 === cp_res_data.user_pdf.length ) {
                is_exist = false;
              }else {
                is_exist = true;
              }
            }else {
              if(!cp_res_data.user_pdf2 || 0 === cp_res_data.user_pdf2.length ) {
                is_exist = false;
              }else {
                is_exist = true;
              }
            }

          }

          if(admin_is_exist) {
            if(!is_exist){
              UserService.uploadUserContract(formData).then(
                response => {
                  if(response.status == 'success') {
                    MySwal.fire({
                      title: 'Uploaded successfully',
                      icon: 'success',
                      text: response.message
                    })
                  }else if(response.status == 'fail') {
                    MySwal.fire({
                      title: 'Fail',
                      icon: 'warning',
                      text: response.message
                    })
                  }
                },
                error => {
                  console.log(error)
                }
              );
            }else {
              let alarm_string = user_pdf == 'user_pdf' ? 'You already uploaded Flexible contract' : 'You already uploaded Crescimento contract'
              MySwal.fire({
                title: 'Alarm',
                text: alarm_string
              })
            }
          }else {
            MySwal.fire({
              title: 'Alarm',
              text: 'Nenhum contrato disponível no momento'
            })
          }
        })
      }
    })
  }
  const handleDownload = (user_pdf) => {
    let is_both_invest_type = false
    let f_count = 0
    let c_count = 0
    plans.map(item => {
      if(item.invest_type == 'FLEXIVEL') {
        f_count = f_count + 1;
      }else if(item.invest_type == 'CRESCIMENTO'){
        c_count = c_count + 1;
      }
    })

    if(f_count > 0 && c_count > 0) {
      is_both_invest_type = true
    }
    var select_html = ''
    UserService.getContractPDFByUser(AuthService.getCurrentUser().id).then(cp_res => {
      let cp_res_data = cp_res.data;
      let is_exist = false;
      let admin_is_exist = false;


      if(is_both_invest_type) {
        select_html = '<select id="swal_investment_type" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 16px;padding: .975em .625em;"><option value="FLEXIVEL">FLEXIVEL</option><option value="CRESCIMENTO">CRESCIMENTO</option></select>'

        MySwal.fire({
          allowOutsideClick: false,
          title: 'Download Contrato',
          text: 'Entre com o aporte',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          html: select_html,
          preConfirm: (value) => {

          },
          onOpen: () => {

          }
        }).then(function (result) {
          if (result.dismiss === MySwal.DismissReason.cancel) {
            return
          }else if(result.value){
            let invest_type_value = document.getElementById('swal_investment_type').value
            if(cp_res_data == null || cp_res_data.length == 0) {
              admin_is_exist = false;
            }else {
              if(invest_type_value == "FLEXIVEL") {
                if(!cp_res_data.admin_pdf || 0 === cp_res_data.admin_pdf.length ) {
                  admin_is_exist = false;
                }else {
                  admin_is_exist = true;
                }
              }else {
                if(!cp_res_data.admin_pdf2 || 0 === cp_res_data.admin_pdf2.length ) {
                  admin_is_exist = false;
                }else {
                  admin_is_exist = true;
                }
              }
            }
            if(admin_is_exist) {
              UserService.downloadUserContract(document.getElementById('swal_investment_type').value).then(
                response => {

                },
                error => {
                  console.log(error)
                }
              );
            }else {
              MySwal.fire({
                title: 'Alarm',
                text: 'Nenhum contrato disponível no momento'
              })
            }
          }
        })
      }else {
        let investment_type = "FLEXIVEL"

        if(f_count > 0 && c_count == 0) {
          investment_type = "FLEXIVEL"

        }else if(f_count == 0 && c_count > 0){
          investment_type = "CRESCIMENTO"
        }

        if(cp_res_data == null || cp_res_data.length == 0) {
          admin_is_exist = false;
        }else {
          if(investment_type == "FLEXIVEL") {
            if(!cp_res_data.admin_pdf || 0 === cp_res_data.admin_pdf.length ) {
              admin_is_exist = false;
            }else {
              admin_is_exist = true;
            }
          }else {
            if(!cp_res_data.admin_pdf2 || 0 === cp_res_data.admin_pdf2.length ) {
              admin_is_exist = false;
            }else {
              admin_is_exist = true;
            }
          }
        }
        if(admin_is_exist) {
          UserService.downloadUserContract(investment_type).then(
            response => {

            },
            error => {
              console.log(error)
            }
          );
        }else {
          MySwal.fire({
            title: 'Alarm',
            text: 'Nenhum contrato disponível no momento'
          })
        }
      }
    });



  }

  const handleAddPlan = () => {
    UserService.getBalance(AuthService.getCurrentUser().id).then(
      response => {
        if(response.length == 0 || response == null || response == undefined || response.balance < 5000) {
          MySwal.fire({
            title: 'Alarm',
            text: 'You should have available balance more than 5.000 to add new plan'
          })
        }else if(response.balance >= 5000) {
          MySwal.fire({
            title: 'New Contract Plan',
            html:
                  '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Saldo atual: ' + currencyFormatter.format(response.balance, { code: 'BRL', symbol: '' }) + '</h2>' +
                  '<h2 class="swal2-title" id="swal2-title" style="font-size: 1.3em;font-weight: 400">Insira o valor desejado (min. R$5.000,00)</h2>' +
                  '<input id="swal_open_value" type="text" min="5000" class="swal2-input" style="max-width:100%;" placeHolder="5.000,00">' +
                  '<h2 class="swal2-title" id="swal2-title" style="font-size: 1.3em;font-weight: 400">Selecione o Plano<h2>' +
                  '<select id="swal_investment_type" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 0.6em;padding: .975em .625em;"><option value="FLEXIVEL">FLEXIVEL</option><option value="CRESCIMENTO">CRESCIMENTO</option></select>',
            showCancelButton: true,
            preConfirm: (value) => {
              if( SimpleMaskMoney.formatToNumber(document.getElementById('swal_open_value').value) < 5000) {
                MySwal.showValidationMessage('Mínimo de 5.000,00')
              }
            },
            onOpen: () => {
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

              PlanService.addPlan(
                {
                  open_value: SimpleMaskMoney.formatToNumber(document.getElementById('swal_open_value').value),
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
          subheader="Histórico de planos ativos e expirados."
          title="Plano Flexível"
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar>
          <div className={classes.inner}>
          <div className={classes.margin}>
          {/* <Button variant="outlined" color="inherit" onClick={handleAddPlan.bind()}>
              Add Plan
          </Button> */}
          {plans.length > 0 ? (
            <div>
              <Button variant="outlined" color="inherit" onClick={handleDownload.bind()}>
                  Download do Contrato
              </Button>
               <Button variant="outlined" color="inherit" onClick={handleUpload.bind()}>
                  Upload Contrato
              </Button>
            </div>
          ):('')}
          </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{color: '#212a37'}} className="blackText">Data de Início</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Data de Término</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Aporte</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Total</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Status</TableCell>
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
                        <Typography variant="body1">{moment(item.start_date).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{moment(item.end_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{currencyFormatter.format(item.open_value, { code: 'BRL', symbol: '' })}</TableCell>
                    <TableCell>{currencyFormatter.format((Number(item.open_value) + Number(item.open_value*item.percent/100)), { code: 'BRL', symbol: '' }) }</TableCell>
                    <TableCell>
                      {item.status}
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
