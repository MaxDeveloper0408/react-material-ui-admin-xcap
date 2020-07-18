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
          const response = await PlanService.getAll();
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

  const handleApprove = (plan_id) => {
    MySwal.fire({
      icon: 'warning',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.value) {
        PlanService.setApprove(plan_id).then(
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
          subheader=""
          title="Plan List"
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
                <TableCell style={{color: '#212a37'}} className="blackText">User Name</TableCell>
                <TableCell style={{color: '#212a37'}} className="blackText">User Email</TableCell>
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
                    <TableCell>{item.user.full_name}</TableCell>
                    <TableCell>{item.user.email}</TableCell>
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
                      {
                      item.status == 'pending' ? (
                        <Button variant="contained" color="secondary" onClick={handleApprove.bind(this, item.id)}>
                         Approve
                      </Button>
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

PlanList.propTypes = {
  className: PropTypes.string
};

export default PlanList;
