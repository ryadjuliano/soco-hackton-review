import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import WithLocalSvg from '@/components/common/WithLocalSvg';
import { isCustomWidth } from '@/components/screens';

const PreOrderDeliveryDate = ({
  date,
  noBackground,
  layoutStyle,
  textStyle,
}) => {
  return (
    <>
      {Boolean(date) && (
        <View
          style={[
            styles.preOrderDelivDateWrapper,
            isCustomWidth(412) ? styles.smallScreenStyles : {},
            noBackground ? {} : styles.backgroundLabel,
            layoutStyle,
          ]}>
          <WithLocalSvg
            width={isCustomWidth(412) ? 14 : 18}
            height={isCustomWidth(412) ? 14 : 18}
            asset={require('@/assets/images/product/pre-order-cart-icon.svg')}
          />
          <Text style={[styles.preOrderDelivText, textStyle]}>
            Product pre-order dikirim pada tanggal {date}
          </Text>
        </View>
      )}
    </>
  );
};

PreOrderDeliveryDate.propTypes = {
  date: PropTypes.string,
  noBackground: PropTypes.bool,
  layoutStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  preOrderDelivDateWrapper: {
    justifyContent: 'center',
    marginHorizontal: isCustomWidth(412) ? 8 : 16,
    marginTop: 5,
    borderRadius: isCustomWidth(412) ? 10 : 14,
    paddingVertical: isCustomWidth(412) ? 4 : 6,
    flexDirection: 'row',
  },
  preOrderDelivText: {
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
});

export default PreOrderDeliveryDate;
