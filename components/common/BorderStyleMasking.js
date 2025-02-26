/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';

const BorderStyleMasking = (props) => {
  const { value, borderStyle, containerStyle, maskingColor } = props;
  return (
    <View style={containerStyle}>
      {props.children}
      <View style={styles.borderStyleContainer}>
        <View
          style={[
            styles.borderStyle,
            { borderStyle: value, ...borderStyle },
          ]}></View>
        <View
          style={[
            styles.borderStyleMask,
            maskingColor ? { backgroundColor: maskingColor } : {},
          ]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  borderStyleMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 1,
    height: 9,
    backgroundColor: '#FFFFFF',
    zIndex: 5,
  },
  borderStyle: {
    height: 10,
    width: '100%',
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
});

export default BorderStyleMasking;
