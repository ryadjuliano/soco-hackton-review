import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
//
const TextHighlight = (props) => {
  const { children, highlightStyle, keyword } = props;
  const result = [];
  const parts = children.split(new RegExp(keyword, 'i'));
  //
  if (keyword) {
    parts.forEach((item, index) => {
      result.push(item);
      index + 1 < parts.length &&
        result.push(
          <Text key={index} {...(highlightStyle && { style: highlightStyle })}>
            {keyword}
          </Text>,
        );
    });
  } else {
    result.push(parts);
  }
  //
  return <Text {...props}>{result}</Text>;
};

TextHighlight.propTypes = {
  highlightStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  keyword: PropTypes.string,
};

export default TextHighlight;
