const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'precisam estar checados';
  }
};
export default {
  checked
};
