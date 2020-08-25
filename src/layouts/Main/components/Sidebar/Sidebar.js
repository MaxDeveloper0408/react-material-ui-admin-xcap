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
import LocalAtmIcon from '@material-ui/icons/LocalAtmOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

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
          title: 'Solicitações de não clientes',
          href: '/users',
      icon: <ArrowForwardIosOutlinedIcon />,
        },
        {
          title: 'Lista de clientes',
          href: '/active_users',
      icon: <ArrowForwardIosOutlinedIcon />,
        }
      ]
    },
    {
      title: 'Planos',
      href: '/adminplan',
      icon: <Rotate90DegreesCcwIcon />,
    },

    {
      title: 'Depósitos',
      href: '/admindeposit',
      icon: <AccountBalanceWalletOutlinedIcon />,
    },
    {
      title: 'Saques',
      href: '/adminwithdraw',
      icon: <LocalAtmIcon />,
    },
    {
      title: 'Contrato',
      href: '/admincontract',
      icon: <InsertDriveFileIcon />,
    },
    {
      title: 'Extrato',
      href: '/dashboard',
      icon: <PageViewIcon />,

    },
    {
      title: 'Projeção',
      href: '/dashboard',
      icon: <InsertChartIcon />,

    },
    {
      title: 'Configurações',
      href: '/userpassword',
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
      title: 'Planos',
      href: '/userplan_flexible',
      icon: <Rotate90DegreesCcwIcon />,
      subpages: [
        {
          title: 'Flexible Plan',
          href: '/userplan_flexible',
          icon: <Rotate90DegreesCcwIcon />,
        },
        {
          title: 'Crescimento Plan',
          href: '/userplan_crescimento',
          icon: <Rotate90DegreesCcwIcon />,
        }
      ]
    },
    {
      title: 'Rendimentos',
      href: '/userincome',
      icon: <Rotate90DegreesCcwIcon />,
    },
    {
      title: 'Depósitos',
      href: '/userdeposit',
      icon: <AccountBalanceWalletOutlinedIcon />,
    },
    {
      title: 'Saques',
      href: '/userwithdraw',
      icon: <LocalAtmIcon />,
    },
    {
      title: 'Rendimentos',
      href: '/dashboard',
      icon: <PageViewIcon />,

    },
    {
      title: 'Projeção',
      href: '/dashboard',
      icon: <InsertChartIcon />,

    },
    {
      title: 'Configurações',
      href: '/userpersonal',
      icon: <AccountBoxIcon />,
      subpages: [
        {
          title: 'Dados cadastrais',
          href: '/userpersonal',
          icon: <ArrowForwardIosOutlinedIcon />,
        },
        {
          title: 'Conta bancária',
          href: '/userbank',
          icon: <ArrowForwardIosOutlinedIcon />,
        },
        {
          title: 'Alteração de senha',
          href: '/userpassword',
          icon: <ArrowForwardIosOutlinedIcon />,
        }
      ]
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
