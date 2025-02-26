import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ImageBackgroundDefault = (props) => {
  const { children, source, style } = props;
  const url = source.uri || source;
  const backgroundStyle = StyleSheet.flatten([
    styles.background,
    {
      backgroundImage: `url(${url})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'cover',
    },
  ]);

  return (
    <div style={StyleSheet.flatten([style, styles.container])}>
      <div style={backgroundStyle}></div>
      {children}
    </div>
  );
};

ImageBackgroundDefault.propTypes = {
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export default ImageBackgroundDefault;
