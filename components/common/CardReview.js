/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import RatingStar from '@/components/RatingStar';
// import { useDispatch, useSelector } from 'react-redux';
// import { reviewLike } from '~store/product-detail/thunks';
// import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import ListRatingByTypes from '@/components/common/ListRatingByTypes';
import { ucfirst, productParams, imageCdn, formatDate } from '@/components/helpers';
import ParsedText from 'react-native-parsed-text';
import { isWeb, isMobileWeb } from '@/components/screens';
import CardReviewProduct from '@/components/common/CardReviewProduct';
import CardReviewRating from '@/components/common/CardReviewRating';

const imageSource = (image, width = 100) => {
  return imageCdn({ config: `w=${width}`, image });
};

const trustedReviewIcon = require('@/assets/images/shopper-review.png');
const likeSource = require('@/assets/images/product-detail/like.png');
const likeActiveSource = require('@/assets/images/product-detail/like-active.png');
const iconDropdownActionSource = require('@/assets/images/common/icon-dropdown-action.png');
const iconArrowDownSource = require('@/assets/images/ArrowDown.png');
const iconArrowUpSource = require('@/assets/images/ArrowUp.png');
const iconReportSource = require('@/assets/images/common/icon-report.png');
const $get = require('lodash.get');
const CardReview = (props) => {
  let productImageSource = false;
  let regexVariant = '';
  let brandName = false;
  let productName = false;
  let productReviewStar = false;
  let productTotalReview = false;
  let showIconAddToBag = false;
  const navigation = useNavigation();
  const user = {};
  const {
    review,
    showProduct = false,
    showListRatingType = true,
    showRecommendation = true,
    cardReviewContainer,
  } = props;
  const { defaultAvatarSource, defaultProductImage } = global;
  const averageRating = $get(review, 'average_rating', 0);
  const owner = $get(review, 'owner', {});
  const [isReviewOwner] = useState(user._id === owner.id);
  const [processing, setProcessing] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const totalLikes = review.total_likes ? `(${review.total_likes})` : '';
  const ageRange = $get(review, 'user.age_range', null);
  const reviewDate = formatDate(review.review?.created_at || review.created_at);
  const editedDate = formatDate(review.review?.updated_at || review.updated_at);
  const ownerId = owner._id ?? owner.id;
  const displayHelpful = Boolean(ownerId !== user._id);
  const isLoggedIn = false;
  const averageRatingByTypes = (() => {
    const ratings = {};
    Object.entries(review).map(([name, value], index) => {
      if (/star_/gi.test(name)) {
        ratings[name] = value;
      }
    });
    return ratings;
  })();

  const productVariant = (() => {
    let variantName = '';

    if (review?.product?.combination) {
      for (const attributeName in review.product.combination.attribute) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          review.product.combination.attribute.hasOwnProperty(attributeName) &&
          attributeName !== 'non_specify'
        ) {
          if (variantName) {
            variantName += ' - ';
          }
          if (regexVariant) {
            regexVariant += '|';
          }
          variantName += ucfirst(attributeName) + ' : ';
          variantName +=
            review.product.combination.attribute[attributeName].name;
          regexVariant +=
            review.product.combination.attribute[attributeName].name;
        }
      }
    }
    return variantName;
  })();

  regexVariant = regexVariant ? new RegExp(regexVariant, 'ig') : '';

  if (showProduct) {
    const image = $get(
      review,
      'product.default_combination.images[0].url',
      null,
    );
    productImageSource = image
      ? { uri: imageSource(image, 100) }
      : defaultProductImage;
    brandName = $get(review, 'product.brand.name', false);
    productName = $get(review, 'product.name', false);
    productReviewStar = $get(review, 'product.review_star', 0)
      ? review.product.review_star.toFixed(1)
      : false;
    productTotalReview = $get(review, 'product.counter_review_user', 0);
    showIconAddToBag = (() => {
      const product = $get(review, 'product', null);
      if (
        product &&
        product.url_sociolla &&
        product.is_active_in_lulla &&
        product.available_for_order &&
        product.is_in_stock
      ) {
        return true;
      }
      return false;
    })();
  }

  const sourceAvatar = owner.image
    ? { uri: imageSource(owner.image, 100) }
    : defaultAvatarSource;

  const showModalActionReview = () => {
    
  };

  const showModalReportReview = () => {
   
  };

  const toggleLikeHandler = async () => {
    
  };

  const toggleExpandHandler = useCallback(() => {
    setIsExpand(!isExpand);
  }, [isExpand]);

  const showModalUserPhotos = (photo, index) => {

  };

  const redirectToDetailProduct = () => {
    navigation.navigate('ProductDetailScreen', {
      id: review.product.id,
      name: review.product.name,
      slug: review.product.slug,
      ...productParams(review.product),
    });
  };

  const addToBag = () => {
    
  };

  const productProps = {
    redirectToDetailProduct,
    showIconAddToBag,
    addToBag,
    productImageSource,
    brandName,
    productName,
    productReviewStar,
    productTotalReview,
  };
  return (
    <>
      {isWeb ? (
        <View style={[styles.cardReviewContainer, cardReviewContainer]}>
          <View style={styles.row}>
            <View style={[styles.col, styles.col3]}>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={[styles.row, { marginBottom: 20 }]}>
                  <Image
                    source={sourceAvatar}
                    style={styles.profilePhoto}
                    defaultSource={defaultAvatarSource}
                    resizeMode="cover"
                  />
                  <View style={styles.boxInfoUser}>
                    <Text style={styles.userFullname}>{owner.name}</Text>
                    <Text style={styles.ageRange}>
                      {reviewDate} · {ageRange}
                    </Text>
                  </View>
                </View>
              </View>
              <View stylel={styles.row}>
                {showProduct && <CardReviewProduct {...productProps} />}
              </View>

              {showListRatingType && (
                <ListRatingByTypes
                  averageRatingByTypes={averageRatingByTypes}
                />
              )}
            </View>

            <View
              style={[
                styles.col,
                showRecommendation ? styles.col6 : styles.col9,
              ]}>
              <CardReviewRating
                {...{ averageRating, review, productTotalReview }}
                style={{ marginBottom: 15 }}
                column={showProduct}
              />

              <View style={[styles.row, { marginBottom: 12 }]}>
                {Boolean(productVariant) && (
                  <ParsedText
                    style={styles.textExpandVariant}
                    childrenProps={{ allowFontScaling: false }}>
                    {productVariant}
                  </ParsedText>
                )}
              </View>

              <View style={styles.row}>
                <Text style={styles.textReview}>{review.details}</Text>
              </View>

              {Array.isArray(review.images) && review.images.length ? (
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={{ marginBottom: 12 }}
                  showsHorizontalScrollIndicator={false}>
                  {(review.images || []).map((photo, key) => (
                    <TouchableOpacity
                      onPress={() => showModalUserPhotos(photo, key)}
                      style={{ marginRight: 8 }}
                      key={`userPhotos${key}`}>
                      <Image
                        source={
                          photo.name
                            ? { uri: imageSource(photo.name, 152) }
                            : defaultProductImage
                        }
                        style={styles.userProductPhoto}
                        resizeMode="cover"
                        defaultSource={defaultProductImage}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : null}

              <View
                style={[
                  styles.footer,
                  { flexDirection: displayHelpful ? 'row' : 'row-reverse' },
                ]}>
                {displayHelpful && isLoggedIn && (
                  <TouchableOpacity
                    style={styles.row}
                    onPress={toggleLikeHandler}
                    disabled={processing}>
                    <Image
                      source={review?.has_liked ? likeActiveSource : likeSource}
                      style={styles.helpfull}
                      resizeMode="cover"
                    />

                    <Text
                      style={[
                        styles.helpfullText,
                        review.has_liked ? styles.helpfullTextActive : {},
                      ]}>
                      Helpful {totalLikes}
                    </Text>
                  </TouchableOpacity>
                )}
                {isReviewOwner ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {!review?.is_editable && (
                      <Text style={styles.textEdited}>
                        Edited at {editedDate}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={showModalActionReview}
                      style={styles.iconDropdownActionContainer}>
                      <Image
                        source={iconDropdownActionSource}
                        style={styles.iconDropdownAction}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    {isLoggedIn && (
                      <TouchableOpacity
                        onPress={showModalReportReview}
                        style={styles.iconReportContainer}>
                        <Image
                          source={iconReportSource}
                          style={styles.iconReport}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>

            {showRecommendation && (
              <View
                style={[styles.col, styles.col3, isWeb && { paddingLeft: 40 }]}>
                <View>
                  <View style={styles.boxInfo}>
                    <Text style={styles.boxInfoText}>Recommend</Text>
                    <Text
                      style={[styles.boxInfoText, styles.boxInfoTextBolder]}>
                      {review.is_recommended}
                    </Text>
                  </View>
                  <View style={styles.boxInfo}>
                    <Text style={styles.boxInfoText}>Repurchase</Text>
                    <Text
                      style={[styles.boxInfoText, styles.boxInfoTextBolder]}>
                      {review.is_repurchase}
                    </Text>
                  </View>
                  <View style={[styles.boxInfo, styles.boxInfoLastChild]}>
                    <Text style={styles.boxInfoText}>Usage Period</Text>
                    <Text
                      style={[styles.boxInfoText, styles.boxInfoTextBolder]}>
                      {review.duration_of_used}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={[styles.cardReviewContainer, cardReviewContainer]}>
          {showProduct && <CardReviewProduct {...productProps} />}

          <View style={styles.head}>
            <TouchableOpacity
              style={[styles.row, { alignItems: 'center' }]}
              onPress={toggleExpandHandler}>
              <RatingStar
                rating={averageRating}
                starWidth={18}
                starHeight={17}
                count={averageRating}
                ratingText={{
                  fontSize: 16,
                  lineHeight: 20,
                  fontFamily: 'satoshi-black',
                  color: '#25182E',
                }}
              />
              <View style={{ marginLeft: 5 }}>
                <Image
                  source={isExpand ? iconArrowUpSource : iconArrowDownSource}
                  style={styles.iconArrowDown}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>

            {review.is_verified_purchase && (
              <View
                style={[
                  styles.row,
                  {
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                  },
                ]}>
                <Image
                  source={trustedReviewIcon}
                  style={styles.trustedReviewIcon}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>

          <View
            style={[
              styles.expandContainer,
              { display: isExpand ? 'flex' : 'none' },
            ]}>
            <ListRatingByTypes averageRatingByTypes={averageRatingByTypes} />
            <View style={[styles.row, { marginTop: 12, marginBottom: 16 }]}>
              <View style={styles.boxInfo}>
                <Text style={styles.boxInfoText}>Recommend</Text>
                <Text style={[styles.boxInfoText, styles.boxInfoTextBolder]}>
                  {review.is_recommended}
                </Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.boxInfoText}>Repurchase</Text>
                <Text style={[styles.boxInfoText, styles.boxInfoTextBolder]}>
                  {review.is_repurchase}
                </Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.boxInfoText}>Usage Period</Text>
                <Text style={[styles.boxInfoText, styles.boxInfoTextBolder]}>
                  {review.duration_of_used}
                </Text>
              </View>
            </View>

            {Boolean(productVariant) && (
              <ParsedText
                style={styles.textExpandVariant}
                parse={[
                  {
                    pattern: regexVariant,
                    style: styles.textExpandVariantBolder,
                  },
                ]}
                childrenProps={{ allowFontScaling: false }}>
                {productVariant}
              </ParsedText>
            )}
          </View>

          <View style={styles.body}>
            <Text style={styles.textReview}>{review.details}</Text>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{ marginBottom: 12 }}
              showsHorizontalScrollIndicator={false}>
              {(review.images || []).map((photo, key) => (
                <TouchableOpacity
                  onPress={() => showModalUserPhotos(photo, key)}
                  style={{ marginRight: 8 }}
                  key={`userPhotos${key}`}>
                  <Image
                    source={
                      photo.name
                        ? { uri: imageSource(photo.name, 152) }
                        : defaultProductImage
                    }
                    style={styles.userProductPhoto}
                    resizeMode="cover"
                    defaultSource={defaultProductImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <View style={styles.row}>
                <Image
                  source={sourceAvatar}
                  style={styles.profilePhoto}
                  defaultSource={defaultAvatarSource}
                  resizeMode="cover"
                />
                <Text style={styles.userFullname}>{owner.name}</Text>
                <Text style={styles.ageRange}> · {ageRange}</Text>
              </View>
              <View>
                <Text style={styles.ageRange}>{reviewDate}</Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.footer,
              { flexDirection: displayHelpful ? 'row' : 'row-reverse' },
            ]}>
            {displayHelpful && isLoggedIn && (
              <TouchableOpacity
                style={styles.row}
                onPress={toggleLikeHandler}
                disabled={processing}>
                <Image
                  source={review?.has_liked ? likeActiveSource : likeSource}
                  style={styles.helpfull}
                  resizeMode="cover"
                />

                <Text
                  style={[
                    styles.helpfullText,
                    review.has_liked ? styles.helpfullTextActive : {},
                  ]}>
                  Helpful {totalLikes}
                </Text>
              </TouchableOpacity>
            )}

            {isReviewOwner ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {!review?.is_editable && (
                  <Text style={styles.textEdited}>Edited at {editedDate}</Text>
                )}

                <TouchableOpacity
                  onPress={showModalActionReview}
                  style={styles.iconDropdownActionContainer}>
                  <Image
                    source={iconDropdownActionSource}
                    style={styles.iconDropdownAction}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {isLoggedIn && isMobileWeb && (
                  <TouchableOpacity
                    onPress={showModalReportReview}
                    style={styles.iconReportContainer}>
                    <Image
                      source={iconReportSource}
                      style={styles.iconReport}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ageRange: {
    fontFamily: 'satoshi-medium',
    color: '#6F6F6F',
    ...(isWeb
      ? {
          fontSize: 12,
          lineHeight: 16,
        }
      : {
          fontSize: 11,
          lineHeight: 14,
          marginLeft: 4,
        }),
  },
  textExpandVariant: {
    fontFamily: 'satoshi-bold',
    color: '#25182E',
    letterSpacing: 0,
    ...(isWeb
      ? {
          fontSize: 15,
          lineHeight: 21,
        }
      : {
          fontSize: 11,
          lineHeight: 15,
        }),
  },
  textExpandVariantBolder: {
    fontFamily: 'satoshi-black',
  },
  boxInfo: {
    ...(isWeb
      ? {
          paddingBottom: 16,
        }
      : {
          marginRight: 24,
        }),
  },
  boxInfoLastChild: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  boxInfoText: {
    fontFamily: 'satoshi-bold',
    fontSize: 12,
    lineHeight: 20,
    color: '#6F6F6F',
    textTransform: 'capitalize',
  },
  boxInfoTextBolder: {
    fontFamily: 'satoshi-black',
    ...(isWeb ? { color: '#A775C8' } : { color: '#212121' }),
  },
  col: {
    paddingHorizontal: 15,
  },
  col3: { flex: 3 },
  col6: { flex: 6 },
  col9: { flex: 9 },
  expandContainer: {
    marginBottom: 12,
  },
  userFullname: {
    fontFamily: 'satoshi-bold',
    color: '#25182E',
    ...(isWeb
      ? {
          fontSize: 14,
          lineHeight: 18,
          marginBottom: 6,
        }
      : {
          fontSize: 11,
          lineHeight: 15,
        }),
  },
  body: {
    paddingBottom: 12,
  },
  cardReviewContainer: {
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    ...(isWeb
      ? {
          paddingVertical: 30,
          backgroundColor: '#FFFFFF',
        }
      : {
          paddingVertical: 12,
          paddingHorizontal: 16,
        }),
  },
  footer: {
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpfull: {
    width: 13,
    height: 12,
    marginRight: 6,
  },
  helpfullText: {
    fontFamily: 'satoshi-medium',
    fontSize: 11,
    lineHeight: 15,
    color: '#25182E',
  },
  helpfullTextActive: {
    color: '#A775C8',
  },
  iconArrowDown: {
    width: 11,
    height: 6,
  },
  iconDropdownAction: {
    height: 4,
    width: 16,
  },
  iconDropdownActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 24,
    width: 30,
  },
  iconReport: {
    height: 12,
    width: 12,
  },
  profilePhoto: {
    ...(isWeb
      ? {
          height: 40,
          width: 40,
          marginRight: 16,
          borderRadius: 20,
        }
      : {
          height: 18,
          width: 18,
          marginRight: 6,
          borderRadius: 9,
          borderWidth: 0.5,
          borderColor: '#A775C8',
        }),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textEdited: {
    fontFamily: 'satoshi-medium',
    fontStyle: 'italic',
    fontSize: 11,
    lineHeight: 15,
    color: '#6F6F6F',
    marginRight: 4,
  },
  textReview: {
    fontFamily: 'satoshi-medium',
    ...(isWeb
      ? {
          fontSize: 16,
          lineHeight: 26,
          maxWidth: 580,
        }
      : {
          fontSize: 14,
          lineHeight: 22,
        }),
    color: '#25182E',
    marginBottom: 10,
  },
  userProductPhoto: {
    width: 76,
    height: 76,
    borderRadius: 8,
  },
  trustedReviewIcon: {
    height: 20,
    width: 118,
    marginRight: 6,
  },
});

export default CardReview;
