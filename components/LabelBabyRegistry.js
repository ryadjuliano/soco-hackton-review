/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { isCustomWidth } from '@/components/screens';

const LabelBabyRegistry = ({ noBackground, layoutStyle, textStyle }) => {
  return (
    <View
      style={[
        styles.containerWrapper,
        isCustomWidth(412) ? styles.smallScreenStyles : {},
        noBackground ? {} : styles.backgroundLabel,
        layoutStyle,
      ]}>
      <Image
        source={require('@/assets/images/baby-registry/icon-address-registry2.png')}
        style={styles.imageRegistry}
      />
      <Text style={[styles.mainText, textStyle]}>
        Product from Baby Registry
      </Text>
    </View>
  );
};

LabelBabyRegistry.propTypes = {
  noBackground: PropTypes.bool,
  layoutStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  containerWrapper: {
    justifyContent: 'center',
    marginHorizontal: isCustomWidth(412) ? 8 : 16,
    marginTop: 5,
    borderRadius: isCustomWidth(412) ? 10 : 14,
    paddingVertical: isCustomWidth(412) ? 4 : 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontFamily: 'satoshi-bold',
    fontSize: isCustomWidth(412) ? 10 : 12,
    color: '#905EB2',
    marginLeft: isCustomWidth(412) ? 5 : 7,
  },
  backgroundLabel: {
    backgroundColor: '#F9F5FB',
  },
  smallScreenStyles: {
    marginHorizontal: 6,
  },
  imageRegistry: {
    width: 12,
    height: 12,
  },
});

export default LabelBabyRegistry;
