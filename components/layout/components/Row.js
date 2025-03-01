import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import config, { DIMENSION_NAMES } from '../config';
const ModificatorType = PropTypes.oneOf(DIMENSION_NAMES);

const RowStyled = styled.View`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: ${(p) =>
    p.gutterWidth || p.gutterWidth === 0
      ? (p.gutterWidth / 2) * -1
      : (config(p).gutterWidth / 2) * -1}px;
  margin-left: ${(p) =>
    p.gutterWidth || p.gutterWidth === 0
      ? (p.gutterWidth / 2) * -1
      : (config(p).gutterWidth / 2) * -1}px;
  ${(p) =>
    p.reverse &&
    `
    flex-direction: row-reverse;
  `}

  ${(p) =>
    p.start &&
    config(p).media[p.start]`
    justify-content: flex-start;
  `}

  ${(p) =>
    p.center &&
    config(p).media[p.center]`
    justify-content: center;
  `}

  ${(p) =>
    p.end &&
    config(p).media[p.end]`
    justify-content: flex-end;
  `}

  ${(p) =>
    p.top &&
    config(p).media[p.top]`
    align-items: flex-start;
  `}

  ${(p) =>
    p.middle &&
    config(p).media[p.middle]`
    align-items: center;
  `}

  ${(p) =>
    p.bottom &&
    config(p).media[p.bottom]`
    align-items: flex-end;
  `}

  ${(p) =>
    p.around &&
    config(p).media[p.around]`
    justify-content: space-around;
  `}

  ${(p) =>
    p.between &&
    config(p).media[p.between]`
    justify-content: space-between;
  `}

  ${(p) =>
    p.first &&
    config(p).media[p.first]`
    order: -1;
  `}

  ${(p) =>
    p.last &&
    config(p).media[p.last]`
    order: 1;
  `}

  ${(p) =>
    p.cssStyle &&
    css`
      ${p.cssStyle};
    `}
`;

const Row = (props) => {
  return <RowStyled {...props}>{props.children}</RowStyled>;
};

Row.displayName = 'Row';

Row.propTypes = {
  reverse: PropTypes.bool,
  start: ModificatorType,
  center: ModificatorType,
  end: ModificatorType,
  top: ModificatorType,
  middle: ModificatorType,
  bottom: ModificatorType,
  around: ModificatorType,
  between: ModificatorType,
  first: ModificatorType,
  last: ModificatorType,
  gutterWidth: PropTypes.number,
  cssStyle: PropTypes.string,
  children: PropTypes.node,
};

export default Row;
