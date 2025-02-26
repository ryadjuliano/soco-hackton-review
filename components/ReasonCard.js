/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { currencyFormat } from '@/components/helpers';

const ReasonCard = (props) => {
  const { productData, type } = props;

  const isProductReson =
    productData.reason &&
    productData.reason[type] &&
    productData.reason[type].length > 0;

  if (!isProductReson) {
    return null;
  }

  return (
    <View style={styles.containerCard}>
      <Text style={styles.error}>
        Min. purchase{' '}
        {productData.reason.min_qty
          ? `${productData.reason.min_qty} items`
          : // eslint-disable-next-line no-undef
            currencyFormat(productData.reason.min_oder)}{' '}
      </Text>
      <Text style={[styles.error, { marginTop: 4 }]}>
        {type !== 'products' ? type : ''}
        {type !== 'products'
          ? productData.reason[type].map((item, index) => (
              <Text key={index + item.name}> {item.name}</Text>
            ))
          : ' Any propducts'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: '#F6F6F7',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  error: {
    color: '#89828E',
    fontSize: 12,
    fontFamily: 'satoshi-medium',
    lineHeight: 18,
  },
});

export default ReasonCard;
