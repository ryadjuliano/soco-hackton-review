/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { isWeb, isMobileWeb } from '@/components/screens';
const AddToBagButton = (props) => {
  const {
    productData,
    isEgiftProduct,
    isSpecialPrice,
    showAddToBag,
    isPackContent,
    addToBagHandler,
    addToBagBabyRegistryHandler,
    isInStock,
    isProductBabyRegistry,
    isFlashSaleStillAvailable,
    isFlashSaleProduct,
  } = props;

  if (isPackContent) {
    return null;
  }

  const buttonText =
    isInStock || (!isFlashSaleStillAvailable && isFlashSaleProduct)
      ? isEgiftProduct
        ? 'Custom E-Gift'
        : 'Add to Bag'
      : 'Notify Me';

  return (
    <>
      {isSpecialPrice ? (
        <>
          {productData.is_special_price_applicable ? (
            <Pressable
              activeOpacity={0.8}
              style={showAddToBag ? styles.productActionWrapperWeb : {}}
              onPress={addToBagHandler}>
              <View
                style={
                  productData.is_in_stock
                    ? styles.productAction
                    : [styles.productAction, styles.notifyMe]
                }>
                <Text
                  style={
                    productData.is_in_stock
                      ? styles.textActionButton
                      : [styles.textActionButton, styles.notifyMeText]
                  }>
                  {buttonText}
                </Text>
              </View>
            </Pressable>
          ) : null}
        </>
      ) : (
        <View style={styles.productActionWrapper}>
          <Pressable
            style={[
              styles.productActionColumnLeft,
              showAddToBag ? styles.productActionWrapperWeb : {},
            ]}
            onPress={addToBagHandler}>
            <View
              style={
                isInStock
                  ? styles.productAction
                  : [styles.productAction, styles.notifyMe]
              }>
              <Text
                style={
                  isInStock
                    ? styles.textActionButton
                    : [styles.textActionButton, styles.notifyMeText]
                }>
                {buttonText}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  actionButtonRegistry: {
    backgroundColor: isWeb ? '#100915' : '#FFE884',
    ...(isMobileWeb && {
      height: 24,
      width: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 6,
    }),
  },
  productActionWrapper: {
    ...(isWeb
      ? {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 99,
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 8,
        }),
  },
  productActionColumnLeft: {
    ...(isMobileWeb && {
      flex: 1,
      width: '75%',
    }),
  },
  productActionColumnRight: {
    ...(isMobileWeb && {
      width: 30,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    }),
  },
  productActionWrapperWeb: {
    width: 160,
    marginBottom: 6,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  productAction: {
    backgroundColor: '#da2a52',
    width: '100%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  textActionButton: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'satoshi-bold'
  },
  notifyMe: {
    // backgroundColor: Colors.grey0,
    // borderColor: Colors.grey0
  },
  notifyMeText: {
    color: '#FFFFFF',
  },
});

export default AddToBagButton;
