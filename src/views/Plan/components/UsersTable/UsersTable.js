import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';



import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button
} from '@material-ui/core';

import { getInitials } from 'helpers';
import userService from 'services/user.service';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  blackText: {
    color: '#212a37!important'
  },
  head: {
    color: '#212a37'
  },
  th: {
    color: '#212a37!important'
  }

}));

const UsersTable = props => {
  const { className, users, history, ...rest } = props;
  const classes = useStyles();

  const [message, setMessage] = useState('');
  const [hactive_status, setHactive_status] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {

    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleActive = (userId, active, investment) => {
    if(active == "NO") {
      MySwal.fire({
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          userService.setActive(userId, active, investment).then(
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
        } else if (result.dismiss === MySwal.DismissReason.cancel) {

        }
      });
    }else {
      const { value: select_investment } =  MySwal.fire({
        title: 'Aprovar a conta do cliente',
        text: 'Entre com o investimento',
        input: 'text',
        inputValue: '',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value != null) {
              resolve()
            }
          })
        }
      }).then(function (result) {
        if (result.dismiss === MySwal.DismissReason.cancel) {
          alert('dd')
        }else {
          userService.setActive(userId, active, result.value).then(
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
  }

  const handleEdit = (userId) => {
    MySwal.fire({
      title: "Ir para edição de dados deste usuário",
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      if (result.value) {
        history.push("/useredit/" + userId);
      } else if (result.dismiss === MySwal.DismissReason.cancel) {

      }
    });

  }
  const handleDelete = (userId) => {
    MySwal.fire({
      title: "Confirma a exclusão permanentemente?",
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      if (result.value) {
        userService.delete(userId).then(
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
      } else if (result.dismiss === MySwal.DismissReason.cancel) {

      }
    });
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell style={{color: '#212a37'}} className="blackText">Name</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>CPF</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Celular</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Plano</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Investimento</TableCell>
                  <TableCell className="blackText" style={{color: '#212a37'}}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{user.full_name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.cpf}</TableCell>
                    <TableCell>{user.cellphone}</TableCell>
                    <TableCell>
                      {user.investment_type}
                    </TableCell>
                    <TableCell>
                      {user.investment}
                    </TableCell>
                    {/* <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell> */}
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={handleEdit.bind(this, user.id)}>
                        Editar
                      </Button>
                      <Button variant="contained" color="secondary" onClick={handleDelete.bind(this, user.id)}>
                         Deletar
                      </Button>
                      <Button variant="contained" color="secondary" onClick={handleActive.bind(this, user.id, 'YES',user.investment)}>
                         Aprovar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
  history: PropTypes.object
};

export default UsersTable;
