/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from '@/components/common/Image';
import RatingStar from '@/components/RatingStar';
import flex from '@/components/styles/flex';
import Colors from '@/components/Colors';

const verifiedIconSource = require('@/assets/images/product-detail/verified-icon.png');

const CardReviewRating = (props) => {
  const {
    averageRating,
    review,
    // productTotalReview,
    column = false,
    style = {},
  } = props;

  const containerStyle = column ? styles.column : styles.container;
  return (
    <View style={[containerStyle, style]}>
      <View style={styles.ratingStar}>
        <View style={{ marginRight: 5 }}>
          <RatingStar
            rating={averageRating}
            starWidth={18}
            starHeight={17}
            count={averageRating}
            ratingText={styles.ratingText}
          />
        </View>
        {/*
        <Text style={styles.displayProductTotalReview}>
          {productTotalReview}
        </Text>
        */}
      </View>
      {review.is_verified_purchase && (
        <View
          style={[
            styles.trustedReview,
            ...(column ? [{ marginTop: 10 }] : []),
          ]}>
          <Image
            source={verifiedIconSource}
            style={styles.verifiedIcon}
            resizeMode="cover"
          />
          <Text style={styles.textTrusted}>TRUSTED REVIEW</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  ratingStar: { ...flex.flexRow, ...flex.alignItemsCenter },
  ratingText: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'satoshi-black',
    color: Colors.purple7,
  },
  trustedReview: {
    borderRadius: 8,
    backgroundColor: Colors.grey8,
    paddingVertical: 2,
    paddingHorizontal: 4,
    ...flex.flexRow,
  } /*
  displayProductTotalReview: {
    color: Colors.grey1,
    fontFamily: 'satoshi-medium',
    fontSize: 12,
    // lineHeight: 13,
  },*/,
  textTrusted: {
    fontFamily: 'satoshi-black',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.83,
    color: Colors.purple7,
  },
  verifiedIcon: {
    height: 12,
    width: 14,
    marginRight: 6,
  },
});

export default CardReviewRating;
