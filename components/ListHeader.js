/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, {Suspense, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import ListRatingByTypes from '@/components/common/ListRatingByTypes';
const starSource = require('@/assets/images/star-filled.svg');
import { useSelector } from 'react-redux';
const $get = require('lodash.get');
const ListHeader = (props) => {
  const product = useSelector((state) => state.hackathon.productPicked)

  const averageRating = $get(product, 'review_stats.average_rating', 0);
  const averageRatingByTypes = $get(
    product,
    'review_stats.average_rating_by_types',
    {},
  );

  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    <View style={styles.head}>
    
      <View style={styles.ratingAverage}>
        
        <View style={styles.starWrapper}>
          <Image source={starSource} style={styles.star} />
        </View>
        <Text style={styles.ratingAverageText}>{averageRating.toFixed(1)}</Text>
      </View>

      <Suspense fallback={<></>}>
        <ListRatingByTypes averageRatingByTypes={averageRatingByTypes} isDetail={true} />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    minHeight: 60,
    position: 'relative',
    padding: 16,
  },
  ratingAverage: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 999,
    borderRadius: 16,
    height: 27,
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: '#ffdce8',
    flexDirection: 'row',
  },
  ratingAverageText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#231f20',
    fontFamily: 'satoshi-bold',
    letterSpacing: 0,
  },
  starWrapper: {
    alignItems: 'center',
    marginRight: 4,
    justifyContent: 'center',
  },
  star: {
    width:  12,
    height: 12,
  },
});

export default ListHeader;
