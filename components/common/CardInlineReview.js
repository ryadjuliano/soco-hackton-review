/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Image from '@/components/common/Image';
import RatingStar from '@/components/RatingStar';
// import { Image } from 'react-native-elements-light';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { isWeb } from '@/components/screens';
import Colors from '@/components/Colors';
import { getCombinationInfo } from '@/components/helpers';

const iconVerifiedSrouce = require('@/assets/images/product-detail/verified-icon.png');
const $get = require('lodash.get');
const CardInlineReview = (props) => {
  const { review, containerStyle, type, showCount, productType, navigation } =
    props;
  const dispatch = useDispatch();
  const productImage = $get(review, 'images[0].url', 'none');
  const brandName = $get(review, 'brand.name', '');
  const productName = $get(review, 'name', '');
  const averageRating = $get(review, 'review_stats.average_rating', 0);
  const totalReviews = $get(review, 'review_stats.total_reviews', 0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigations = navigation ? navigation : useNavigation();

  const starWidth = type === 'select_product' ? 13 : 18;
  const starHeight = type === 'select_product' ? 12 : 17;
  const countRatingStar = type === 'select_product' ? totalReviews : 0;
  const redirectToCreateReview = () => {
    dispatch({ type: 'createReview/setSelectedProduct', data: review });
    dispatch({
      type: 'createReview/setState',
      name: 'productReviewType',
      value: 'recentlyBought',
    });
    navigations.navigate('CreateReviewScreenDesktop', {
      id: review.id,
    });
  };
  const { combinationName } = getCombinationInfo(
    review?.default_combination?.attributes,
  );
  return (
    <View
      style={[
        styles.cardInlineReviewContainer,
        containerStyle,
        type === 'select_product' ? { height: 'auto', padding: 12 } : {},
      ]}>
      <View style={styles.row}>
        <View style={styles.cardInlineReviewImage}>
          <Image
            source={{ uri: productImage }}
            style={[
              styles.productImage,
              type === 'select_product' ? { borderWidth: 0 } : {},
            ]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardInlineReviewContent}>
          <Text style={styles.brandName} numberOfLines={2} ellipsizeMode="tail">
            {brandName}
          </Text>
          <Text
            style={styles.productName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName}
          </Text>
          <Text style={styles.combinationName}>{combinationName}</Text>
          <View style={type === 'select_product' ? {} : { marginBottom: 9 }}>
            <RatingStar
              rating={averageRating}
              starWidth={starWidth}
              starHeight={starHeight}
              count={countRatingStar}
              showCount={showCount}
              ratingText={{
                fontSize: 11,
                lineHeight: 12,
                fontFamily: 'satoshi-medium',
                color: '#8C8582',
              }}
            />
          </View>

          {type !== 'select_product' && (
            <TouchableOpacity onPress={redirectToCreateReview}>
              <Text style={styles.textLink}>Write Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {productType === 'recently_bought' && (
        <View style={styles.iconVerifiedContainer}>
          <Image source={iconVerifiedSrouce} style={styles.iconVerified} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingBottom: 12,
    ...(!isWeb && {
      borderBottomWidth: 1,
      borderBottomColor: Colors.grey0,
    }),
  },
  brandName: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1,
    color: Colors.purple7,
    fontFamily: 'satoshi-black',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardInlineReviewContent: {
    flexShrink: 1,
  },
  cardInlineReviewImage: {
    marginRight: 12,
  },
  cardInlineReviewContainer: {
    borderColor: Colors.purple1,
    borderWidth: 0.3,
    borderRadius: 8,
    padding: 16,
    width: 294,
    // height: 112,
    ...(isWeb && { boxShadow: '2px 5px 5px 0 rgba(0,0,0,.1)' }),
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  productName: {
    fontSize: 13,
    lineHeight: 16,
    color: Colors.grey2,
    fontFamily: 'satoshi-medium',
    marginBottom: 6,
  },
  combinationName: {
    color: Colors.grey17,
    fontFamily: 'satoshi-medium',
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
  },
  textLink: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.purple4,
    fontFamily: 'satoshi-black',
  },
  iconVerified: {
    width: 16,
    height: 14,
  },
  iconVerifiedContainer: {
    position: 'absolute',
    top: 12,
    right: 18,
  },
});

export default CardInlineReview;
