/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
const starPurpleSource = require('@/assets/images/star-filled.svg');

const ProductGridRating = (props) => {
  const { rating } = props;
  const formatAverageRating = rating?.toFixed(1);
  return (
    <View style={styles.ratingArea}>
      {Boolean(props.count || props.showCount) && (
        <>
          <View style={styles.starWrapper}>
            <Image source={starPurpleSource} style={styles.star} />
          </View>

          <Text style={styles.averageRating}>
            {formatAverageRating}
            <Text style={styles.ratingText}>{`(${props.count})`}</Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  averageRating: {
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: 'satoshi-black',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
  },
  ratingArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starWrapper: {
    marginRight: 4,
    justifyContent: 'center',
    marginBottom: Platform.OS === 'windows' ? 4 : 0,
  },
  star: {
    width:  12,
    height: 12,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'satoshi-medium',
    color: '#89828E',
    marginLeft: 4,
  },
});

export default memo(ProductGridRating);
