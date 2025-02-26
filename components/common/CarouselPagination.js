/* eslint-disable react/prop-types */
// Web component only
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '@/components/Colors';

const CarouselPagination = (props) => {
  const {
    dotsLength = 0,
    activeDotIndex = 0,
    containerStyle = {},
    dotContainerStyle = {},
    dotStyle = {},
    inactiveDotStyle = { backgroundColor: Colors.grey0 },
    onChange = () => {},
  } = props;

  const lists = [];
  if (dotsLength) {
    for (let i = 0; i < dotsLength; i++) {
      lists.push(i);
    }
  }

  return lists?.length ? (
    <View style={[styles.containerStyle, containerStyle]}>
      {lists.map((item) => (
        <View style={dotContainerStyle} key={item}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.dotStyle,
              dotStyle,
              activeDotIndex != item ? inactiveDotStyle : {},
            ]}
            onPress={() => onChange(item)}
          />
        </View>
      ))}
    </View>
  ) : (
    false
  );
};

CarouselPagination.propTypes = {
  dotsLength: PropTypes.number,
  activeDotIndex: PropTypes.number,
  containerStyle: PropTypes.object,
  dotContainerStyle: PropTypes.object,
  dotStyle: PropTypes.object,
  inactiveDotStyle: PropTypes.object,
  onChange: PropTypes.func,
};

CarouselPagination.defaultProps = {
  dotsLength: 0,
  activeDotIndex: 0,
  containerStyle: {},
  dotContainerStyle: {},
  dotStyle: {},
  inactiveDotStyle: { backgroundColor: Colors.grey0 },
  onChange: () => {},
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: Colors.purple4,
  },
});

export default CarouselPagination;
