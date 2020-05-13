import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: "#222b3d",
    light: colors.indigo[100]
  },
  checkbox: {
    main: "#7b8087",
    lightGreen: "#4d84ff"
  },
  secondary: {
    contrastText: white,
    dark: "#4d84ff",
    main: "#222b3d",
    light: "#4d84ff"
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.grey[50],
    secondary: "#7b8087",
    link: "#4d84ff"
  },
  background: {
    default: "#212a37",
    paper: "#212a37"
  },
  icon: colors.blueGrey[600],
  divider: "#212a37"
};
