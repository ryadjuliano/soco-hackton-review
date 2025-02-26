/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// const defaultImage = require('@/assets/images/dummy_product.png');
import { LazyLoadImage } from 'react-lazy-load-image-component';
const ImageDefault = (props) => {
  const { resizeMode, source, style } = props;
  const url = source?.uri ? source.uri : source;

  const finalStyle = StyleSheet.flatten([
    style,
    ...(resizeMode ? [{ objectFit: resizeMode }] : []),
  ]);

  return (
    <LazyLoadImage
      src={url}
      style={finalStyle}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        // currentTarget.src = defaultImage;
      }}
    />
  );
};

ImageDefault.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default ImageDefault;
