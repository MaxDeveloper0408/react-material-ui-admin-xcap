import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      { ...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '} 2020 - XCapital Inv.
      </Typography>
      <Typography variant="caption">
      Alguma dúvida do quanto o seu dinheiro pode render com a XCapital?
      +55 (48) 9 9123-1919 - Segunda à Sexta | 08:00h às 18:00h
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
