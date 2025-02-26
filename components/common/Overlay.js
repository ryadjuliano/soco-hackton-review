import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
//
import Colors from '@/components/Colors';

const Overlay = (props) => {
  const { absolute, transparent, onPress } = props;
  const position = absolute ? 'absolute' : 'fixed';
  const backgroundColor = transparent ? Colors.transparent : Colors.overlay;

  return (
    <Pressable
      style={[styles.overlay, { backgroundColor, position }]}
      onPress={onPress}
    />
  );
};

Overlay.propTypes = {
  absolute: PropTypes.bool,
  transparent: PropTypes.bool,
  onPress: PropTypes.func,
};

Overlay.defaultProps = {
  absolute: false,
  transparent: false,
};

const styles = StyleSheet.create({
  overlay: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default Overlay;
