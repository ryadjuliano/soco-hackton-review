import React from 'react';
import PropTypes from 'prop-types';

const RenderIf = ({ children, condition }) => {
  return condition ? children : false;
};

RenderIf.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.bool,
};

RenderIf.defaultProps = {
  children: <></>,
  condition: false,
};

export default RenderIf;
