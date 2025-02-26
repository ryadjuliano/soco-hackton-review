/* eslint-disable react/prop-types */
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
// import { CirclesLoader } from 'react-native-indicator'; unsupported on web

// eslint-disable-next-line react/display-name
export default (props) => {
  return (
    <View
      style={[
        styles.activityIndicatorContainer,
        props.activityIndicatorContainerStyle,
      ]}>
      <ActivityIndicator {...props} color="#FFDCE8" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
