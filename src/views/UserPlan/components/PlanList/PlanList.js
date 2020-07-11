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

const useStyles = makeStyles(() => ({
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{color: '#212a37'}} className="blackText">Start Date</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>End Date</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Plan Type</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Investimento</TableCell>
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
