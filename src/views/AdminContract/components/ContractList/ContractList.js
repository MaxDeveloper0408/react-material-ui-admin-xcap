import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
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

const ContractList = props => {
  //basic setting
  const classes = useStyles();
  const { className, UserService, AuthService, PlanService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchContracts = async () => {
        try {
          const response = await UserService.getContractPDFAll({invest_type: 'FLEXIVEL'});
          setPlans(response.data);
        } catch (e) {
            setPlans([]);
        }
    };
    fetchContracts();
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
  const handleUpload = (id, user_id,invest_type) => {
    MySwal.fire({
      title: 'Upload do Contrato ',
      text: 'Entre com o aporte',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      html: '<input type="file" id="swal_admin_cpf" name="admin_pdf" class="swal2-input" style="max-width: 100%;" placeHolder="">',
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
        console.log(file)
        formData.append("id", id);
        formData.append("userId", user_id);

        if(invest_type == 0){
          formData.append('pdf_field', "admin_pdf")
        }else {
          formData.append('pdf_field', "admin_pdf2")
        }
        formData.append("admin_pdf", file)


        UserService.uploadAdminContract(formData).then(
          response => {
            if(response.status == 'success') {
              MySwal.fire({
                title: 'Uploaded successfully',
                icon: 'success',
                text: response.message
              })
            }else if(response.status == 'fail') {
              MySwal.fire({
                title: 'Falha',
                icon: 'warning',
                text: response.message
              })
            }
          },
          error => {
            console.log(error)
          }
        );
      }
    })
  }
  const handleDownload = (user_pdf) => {
    UserService.downloadContract(user_pdf).then(
      response => {
      },
      error => {
        console.log(error)
      }
    );
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
          subheader="Lista de todos os contratos dos planos: flexível."
          title="Flexível Contratos"
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
                <TableCell className="blackText" style={{color: '#212a37'}}>Flexível Download</TableCell>
                <TableCell className="blackText" style={{color: '#212a37'}}>Flexível Upload</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map(item => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                  >
                    <TableCell>{item.user? item.user.full_name: ''}</TableCell>
                    <TableCell>{item.user? item.user.email: ''}</TableCell>
                    <TableCell>
                      { !item.user || item.user_pdf == '' || item.user_pdf == null? (''):(
                        <Button variant="contained" color="secondary" style={{marginLeft: '10px'}} onClick={handleDownload.bind(this, item.user_pdf)}>
                          Download
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                        <Button variant="contained" color="secondary" onClick={handleUpload.bind(this, item.contract_id, item.user_id,0)}>
                          Upload
                        </Button>
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

ContractList.propTypes = {
  className: PropTypes.string
};

export default ContractList;
