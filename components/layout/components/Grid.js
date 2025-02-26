import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';

import config, { DIMENSION_NAMES } from '../config';

const StyleGrid = styled.View`
  margin-right: auto;
  margin-left: auto;
  padding-right: ${(p) =>
    p.outerMargin ? p.outerMargin : config(p).outerMargin}px;
  padding-left: ${(p) =>
    p.outerMargin ? p.outerMargin : config(p).outerMargin}px;

  ${(p) =>
    !p.fluid &&
    css`
      ${DIMENSION_NAMES.map(
        (t) =>
          config(p).container[t] &&
          config(p).media[t]`
        width: ${(p) => config(p).container[t]}px;
      `,
      )}
    `}

  ${(p) =>
    p.cssStyle &&
    css`
      ${p.cssStyle};
    `}
`;

const Grid = (props) => {
  return <StyleGrid {...props}>{props.children}</StyleGrid>;
};

Grid.displayName = 'Grid';

Grid.propTypes = {
  fluid: PropTypes.bool,
  outerMargin: PropTypes.string,
  cssStyle: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
