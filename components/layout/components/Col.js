import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import config, { DIMENSION_NAMES } from '../config';

const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.bool]);

const offsetProps = DIMENSION_NAMES.map((d) => d + 'Offset');
const DimensionPropTypes = DIMENSION_NAMES.reduce((propTypes, dimension) => {
  propTypes[dimension] = ModificatorType;
  propTypes[dimension + 'Offset'] = PropTypes.number;
  return propTypes;
}, {});

const ColStyled = styled.View`
  flex: 0 0 auto;
  padding-right: ${(p) =>
    p.gutterWidth || p.gutterWidth === 0
      ? p.gutterWidth / 2
      : config(p).gutterWidth / 2}px;
  padding-left: ${(p) =>
    p.gutterWidth || p.gutterWidth === 0
      ? p.gutterWidth / 2
      : config(p).gutterWidth / 2}px;

  ${(p) =>
    p.reverse &&
    `
    flex-direction: column-reverse;
  `}

  ${(p) =>
    Object.keys(p)
      .filter((k) => ~DIMENSION_NAMES.indexOf(k))
      .sort(
        (k1, k2) => DIMENSION_NAMES.indexOf(k1) - DIMENSION_NAMES.indexOf(k2),
      )
      .map(
        (k) =>
          config(p).media[k]`${
            Number.isInteger(p[k])
              ? // Integer value
                `
          flex-basis: ${(100 / config(p).gridSize) * p[k]}%;
          max-width: ${(100 / config(p).gridSize) * p[k]}%;
          display: flex;
        `
              : // Boolean
              p[k]
              ? // Auto-width
                `
          flex-grow: 1;
          flex-basis: 0;
          max-width: 100%;
          display: flex;
        `
              : // Hide element
                'display: none;'
          }`,
      )}

  ${(p) =>
    Object.keys(p)
      .filter((k) => ~offsetProps.indexOf(k))
      .map(
        (k) =>
          config(p).media[k.replace(/Offset$/, '')]`
        margin-left: ${(100 / config(p).gridSize) * p[k]}%;
      `,
      )}

  ${(p) =>
    p.cssStyle &&
    css`
      ${p.cssStyle};
    `}
`;

const Col = (props) => {
  return <ColStyled {...props}>{props.children}</ColStyled>;
};

Col.displayName = 'Col';

Col.propTypes = {
  ...DimensionPropTypes,
  reverse: PropTypes.bool,
  gutterWidth: PropTypes.number,
  cssStyle: PropTypes.string,
  children: PropTypes.node,
};

export default Col;
