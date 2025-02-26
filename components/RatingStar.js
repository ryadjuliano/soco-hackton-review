/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { isWeb } from '@/components/screens';
const starGraySource = isWeb
  ? require('@/assets/images/Star-Gray.png')
  : require('@/assets/images/Star.png');
const starPurpleSource = require('@/assets/images/Star.png');

const RatingStar = (props) => {
  const { starWidth, starHeight } = props;
  const starStyleCustom = props.starStyleCustom ? props.starStyleCustom : {};
  const starStyle = { ...StyleSheet.flatten(styles.star), ...starStyleCustom };
  const maxRating = [1, 2, 3, 4, 5];
  let rating =
    props.rating * starWidth + Math.floor(props.rating) * starStyle.marginRight;
  rating = starWidth * props.rating + Math.floor(props.rating) * 5;
  

  return (
    <View style={styles.ratingArea}>
      {Boolean(
        props.count || props.onProductDetailScreen || props.showCount,
      ) && (
        <>
          <View style={[styles.starArea, { height: props.starHeight }]}>
            <View>
              <View style={styles.starWrapper}>
                {maxRating.map((item) => (
                  <Image
                    source={starGraySource}
                    style={{
                      ...styles.itemRating,
                      width: props.starWidth,
                      height: props.starHeight,
                    }}
                    key={`starGray${item}`}
                  />
                ))}
              </View>
              <View
                style={[
                  styles.starWrapper,
                  styles.starWrapperOverlay,
                  { width: rating },
                ]}>
                {maxRating.map((item) => (
                  <Image
                    source={starPurpleSource}
                    style={{
                      ...styles.itemRating,
                      width: starWidth,
                      height: starHeight,
                    }}
                    key={`starPurple${item}`}
                  />
                ))}
              </View>
            </View>
          </View>

          <Text style={[styles.ratingText, props.ratingText]}>
            {`(${props.count})`}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingArea: {
    flexDirection: 'row',
    alignItems: isWeb ? 'center' : 'baseline',
    ...(isWeb ? { marginRight: 5 } : {}),
  },
  starArea: {
    // marginRight: 2,
  },
  starWrapper: {
    flexDirection: 'row',
    marginRight: 5,
    zIndex: 1,
    overflow: 'hidden',
  },
  starWrapperOverlay: {
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  star: {
    ...(isWeb
      ? {
          marginRight: 1,
        }
      : {
          marginRight: 2,
        }),
  },
  ratingText: {
    fontSize: 11,
    lineHeight: 12,
    fontFamily: 'satoshi-medium',
    color: '#8C8582',
  },
  itemRating: {
    ...(isWeb
      ? {
          marginRight: 5,
        }
      : {
          marginRight: 2,
        }),
  },
});

export default memo(RatingStar);
