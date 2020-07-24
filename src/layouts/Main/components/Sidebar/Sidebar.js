import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import RotateIcon from '@material-ui/icons/RotateRight';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBoxOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PageViewIcon from '@material-ui/icons/PageviewOutlined';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: "#222b3d",
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, AuthService, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,

    },
    {
      title: 'Solicitações',
      href: '/users',
      icon: <AccountBoxIcon />,
      subpages: [
        {
          title: 'Lista de solicitações de não clientes',
          href: '/users',
          icon: <RotateIcon />,
        },
        {
          title: 'Lista de clientes',
          href: '/active_users',
          icon: <RotateIcon />,
        }
      ]
    },
    {
      title: 'Plan',
      href: '/adminplan',
      icon: <DashboardIcon />,
    },
    
    {
      title: 'Deposit',
      href: '/admindeposit',
      icon: <DashboardIcon />,
    },
    {
      title: 'Withdraw',
      href: '/adminwithdraw',
      icon: <DashboardIcon />,
    },
    {
      title: 'Contract',
      href: '/admincontract',
      icon: <DashboardIcon />,
    },
    {
      title: 'Transferir',
      href: '/products',
      icon: <Rotate90DegreesCcwIcon />,

    },
    {
      title: 'Extrato',
      href: '/sign-in',
      icon: <PageViewIcon />,

    },
    {
      title: 'Contrato',
      href: '/typography',
      icon: <InsertDriveFileIcon />,

    },
    {
      title: 'Projeção',
      href: '/icons',
      icon: <InsertChartIcon />,

    },
    {
      title: 'Minha Conta',
      href: '/account',
      icon: <AccountBoxIcon />,

    },
    {
      title: 'Configuração',
      href: '/settings',
      icon: <SettingsIcon />,

    }
  ];
  const user_pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,

    },
    {
      title: 'Solicitações',
      href: '/userpersonal',
      icon: <AccountBoxIcon />,
      subpages: [
        {
          title: 'Dados cadastrais',
          href: '/userpersonal',
          icon: <RotateIcon />,
        },
        {
          title: 'Conta bancária',
          href: '/userbank',
          icon: <RotateIcon />,
        },
        {
          title: 'Alteração de senha',
          href: '/userpassword',
          icon: <RotateIcon />,
        }
      ]
    },
    {
      title: 'Plan',
      href: '/userplan',
      icon: <DashboardIcon />,
    },
    {
      title: 'Deposit',
      href: '/userdeposit',
      icon: <DashboardIcon />,
    },
    {
      title: 'Withdraw',
      href: '/userwithdraw',
      icon: <DashboardIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />

        <SidebarNav
          className={classes.nav}
          pages={AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") ? pages : user_pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
