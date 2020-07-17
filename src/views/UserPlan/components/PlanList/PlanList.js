import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  const { className, UserService, AuthService, PlanService, MySwal, ...rest } = props;
  //handle table
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await PlanService.getPlanByUser(AuthService.getCurrentUser().id);
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
  const submit = () => {
  }

  const handleAddPlan = () => {
    UserService.getBalance(AuthService.getCurrentUser().id).then(
      response => {
        if(response.length == 0 || response == null || response == undefined || response.balance < 5000) {
          MySwal.fire({
            title: 'Alarm',
            text: 'You should have available balance more than 5000 to add new plan'
          })
        }else if(response.balance >= 5000) {
          MySwal.fire({
            title: 'New Contract Plan',
            html:
                  '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Avaliable balance : ' + response.balance + '</h2>' +
                  '<h2 class="swal2-title" id="swal2-title" style="font-size: 1.3em;font-weight: 400">Insert Desired Value(min 5,000)</h2>' + 
                  '<input id="swal_open_value" type="number" min="5000" class="swal2-input" style="max-width:100%;" placeHolder="5,000">' +
                  '<h2 class="swal2-title" id="swal2-title" style="font-size: 1.3em;font-weight: 400">Select Plan<h2>' +
                  '<select id="swal_investment_type" class="swal2-select" style="border-color: #d9d9d9;display: flex;width: 100%; font-size: 0.6em;padding: .975em .625em;"><option value="FLEXIVEL">FLEXIVEL</option><option value="CRESCIMENTO">CRESCIMENTO</option></select>',
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                alert(document.getElementById('swal_open_value').value)
                if (document.getElementById('swal_open_value').value < 5000) {
                  resolve()
                }else {
                  return;
                }
              })
            }
          }).then(function (result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {
              return;
            }else if(result.value){
              PlanService.addPlan(
                {
                  open_value: document.getElementById('swal_open_value').value,
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
  const handleWithdraw = () => {
    UserService.getBalance(AuthService.getCurrentUser().id).then(
      response => {
        if(response.length == 0 || response == null || response == undefined || response.balance < 5000) {
          MySwal.fire({
            title: 'Alarm',
            text: 'You should have available balance more than 5000 to withraw'
          })
        }else if(response.balance >= 5000) {
          MySwal.fire({
            title: 'Withdraw',
            html:
                  '<h2 class="swal2-title" id="swal2-title" style="margin-bottom: 1.5em; font-size: 1.4em">Avaliable balance : '+response.balance+'</h2>' +
                  '<input id="swal_withdraw_value" class="swal2-input" placeHolder="5,000">', 
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                console.log(value);
                if (value != null) {
                  resolve()
                }
              })
            }
          }).then(function (result) {
            if (result.dismiss === MySwal.DismissReason.cancel) {
              return;
            }else if(result.value){
              PlanService.withdraw().then(
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
          subheader="You can add your plan"
          title="Plan List"
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar>
          <div className={classes.inner}>
          <div className={classes.margin}>
          <Button variant="outlined" color="inherit" onClick={handleAddPlan.bind()}>
              Add Plan
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleWithdraw.bind()}>
              Withdraw
          </Button>
          </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{color: '#212a37'}} className="blackText">Start Date</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>End Date</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Open Value</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Profit Value</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Total Value</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Plan Type</TableCell>
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
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{item.start_date}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{item.end_date}</TableCell>
                    <TableCell>{item.open_value}</TableCell>
                    <TableCell>{item.invest_type=='FLEXIVEL' ? item.open_value*10/100 : item.open_value*30/100}</TableCell>
                    <TableCell>{item.invest_type=='FLEXIVEL' ? (Number(item.open_value) + Number(item.open_value*10/100)) : (Number(item.open_value) + Number(item.open_value*30/100)) }</TableCell>
                    <TableCell>{item.invest_type}</TableCell>
                    <TableCell>
                      {item.status}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary">
                         Contract
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

PlanList.propTypes = {
  className: PropTypes.string
};

export default PlanList;
