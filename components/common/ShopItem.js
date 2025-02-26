/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Image from '@/components/common/Image';
//
import { currencyFormat, getAttributesName, imageCdn } from '@/components/helpers';
import Colors from '@/components/Colors';

const ShopItem = (props) => {
  const { detail, quantity } = props.item;
  const hasDiscount =
    detail.combination.price !== detail.combination.price_after_discount;
  const attributes = getAttributesName(detail?.combination?.attributes || []);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageCdn({ config: 'w=120', image: detail.image.url }) }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.productBrand}>{detail.brand.name}</Text>
        <Text style={styles.productName}>{detail.name}</Text>
        {attributes.length > 0 &&
          attributes.map((item, index) => (
            <Text key={index} style={styles.variant}>
              {item[1]}
            </Text>
          ))}
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text
            style={[
              styles.priceAfterDiscount,
              hasDiscount && { color: Colors.red2 },
            ]}>
            {currencyFormat(detail.combination.price_after_discount)}
          </Text>
          {hasDiscount && (
            <Text style={[styles.priceBeforeDiscount, { marginLeft: 5 }]}>
              {currencyFormat(detail.combination.price)}
            </Text>
          )}
        </View>
      </View>
      {quantity > 1 && (
        <Text style={styles.productQuantity}>{quantity} Pcs</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  productImage: {
    borderRadius: 8,
    marginRight: 12,
    width: 60,
    height: 60,
  },
  productBrand: {
    color: Colors.purple4,
    fontSize: 12,
    fontFamily: 'satoshi-black',
    lineHeight: 15,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  productName: {
    color: Colors.purple7,
    fontSize: 13,
    fontFamily: 'satoshi-medium',
    lineHeight: 16,
    marginBottom: 3,
  },
  variant: {
    color: Colors.grey2,
    fontSize: 12,
    fontFamily: 'satoshi-medium',
    lineHeight: 15,
    marginBottom: 6,
  },
  priceAfterDiscount: {
    color: Colors.purple7,
    fontSize: 13,
    fontFamily: 'satoshi-black',
    lineHeight: 18,
  },
  priceBeforeDiscount: {
    color: Colors.purple7,
    fontSize: 11,
    fontFamily: 'satoshi-black',
    lineHeight: 14,
    textDecorationLine: 'line-through',
  },
  productQuantity: {
    color: Colors.grey2,
    fontSize: 12,
    fontFamily: 'satoshi-medium',
    lineHeight: 15,
  },
});

export default ShopItem;
