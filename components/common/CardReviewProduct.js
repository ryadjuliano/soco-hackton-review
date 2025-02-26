/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Image from '@/components/common/Image';
import { Button } from 'react-native-elements-light';
import RatingStar from '@/components/RatingStar';
import { isWeb, isMobileWeb } from '@/components/screens';
// import { purpleSmall } from 'native/styles/buttons';
import Colors from '@/components/Colors';
const iconAddToBagSource = require('@/assets/images/common/icon-add-to-bag.png');

const CardReviewProduct = function (props) {
  const {
    redirectToDetailProduct,
    showIconAddToBag,
    addToBag,
    productImageSource,
    brandName,
    productName,
    productReviewStar,
    productTotalReview,
  } = props;

  return (
    <Pressable style={styles.displayProduct} onPress={redirectToDetailProduct}>
      {isMobileWeb && showIconAddToBag && (
        <Pressable style={styles.iconAddToBagContainer} onPress={addToBag}>
          <Image
            source={iconAddToBagSource}
            style={styles.iconAddToBag}
            resizeMode="cover"
          />
        </Pressable>
      )}

      <View style={styles.displayProductImageContainer}>
        <Image
          source={productImageSource}
          style={styles.displayProductImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.displayProductContent}>
        {brandName && (
          <Text
            style={styles.displayProductBrandName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {brandName}
          </Text>
        )}

        {productName && (
          <Text
            style={styles.displayProductName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName}
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <View>
            <RatingStar
              rating={productReviewStar}
              starWidth={15}
              starHeight={14}
              count={productReviewStar}
              ratingText={{
                fontSize: 12,
                lineHeight: 14,
                fontFamily: 'satoshi-black',
                color: '#25182E',
              }}
            />
          </View>

          <Text style={styles.displayProductTotalReview}>
            ({productTotalReview})
          </Text>
        </View>

        {isWeb && showIconAddToBag && (
          <Button
            title="Add to Bag"
            onPress={addToBag}
            // {...purpleSmall.Button}
            containerStyle={{ alignSelf: 'stretch' }}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  displayProduct: {
    ...(isWeb && { alignItems: 'strecth' }),
    marginBottom: 12,
    flexDirection: isWeb ? 'column' : 'row',
    position: 'relative',
    ...(isWeb
      ? {
          borderRadius: 8,
          borderColor: Colors.grey0,
          borderWidth: 1,
          paddingVertical: 12,
          paddingHorizontal: 10,
        }
      : {
          borderBottomColor: Colors.grey16,
          borderBottomWidth: 1,
          paddingBottom: 15,
        }),
  },
  displayProductBrandName: {
    fontFamily: isWeb ? 'satoshi-bold' : 'satoshi-black',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.42,
    color: isWeb ? Colors.purple4 : Colors.purple7,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  displayProductContent: {
    ...(isWeb && { alignItems: 'center' }),
    flex: 1,
  },
  displayProductImageContainer: {
    ...(isWeb ? { marginBottom: 12 } : { marginRight: 12 }),
  },
  displayProductImage: {
    width: 50,
    height: 50,
    ...(isWeb && {
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
  },
  displayProductName: {
    fontFamily: isWeb ? 'satoshi-medium' : 'satoshi-bold',
    fontSize: 13,
    lineHeight: 16,
    color: isWeb ? Colors.purple7 : Colors.grey2,
    marginBottom: 7,
    textAlign: isWeb ? 'center' : 'left',
  },
  displayProductTotalReview: {
    color: Colors.grey1,
    fontFamily: 'satoshi-medium',
    fontSize: 12,
    marginLeft: 4,
  },
  iconAddToBag: {
    width: 22,
    height: 25,
  },
  iconAddToBagContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 30,
    height: 30,
    top: 0,
    right: 0,
    zIndex: 90,
  },
});

export default CardReviewProduct;
