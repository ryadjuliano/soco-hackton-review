/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, {Suspense} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import ListRatingByTypes from '@/components/common/ListRatingByTypes';
import ActivityIndicator from '@/components/common/ActivityIndicator';
const starSource = require('@/assets/images/star-filled.svg');
import { useSelector } from 'react-redux';
const $get = require('lodash.get');
const ListHeader = (props) => {
  const product = useSelector((state) => state.hackathon.productPicked);
  const effects = useSelector((state) => state.hackathon.effects);
  const summary = useSelector((state) => state.hackathon.summary);
  const averageRating = $get(product, 'review_stats.average_rating', 0);
  const averageRatingByTypes = $get(
    product,
    'review_stats.average_rating_by_types',
    {},
  );
  return (
    <View>
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
      <View style={{paddingHorizontal: 10, marginBottom: 20}}>
        {Array.isArray(effects) && effects.length ?
        <View style={styles.effectsContainer}>
          <Image source={require('@/assets/images/AI_icon-removebg-preview-1.png')}  style={styles.ai} />
          {effects.map((effect) => (
            <Text style={styles.ratingAverageTextLight}>{effect}</Text>
          ))}
        </View>
        : 
          <ActivityIndicator />
        }
      
      </View>


      <View style={{paddingHorizontal: 10, marginBottom: 20}}>
      <Text style={[styles.ratingAverageText, {marginBottom: 5}]}>Bestie Say:</Text>
        {Array.isArray(effects) && effects.length ?
        <View style={styles.effectsContainer}>
          <Text style={styles.ratingAverageTextLight}>{summary}</Text>
        </View>
        : 
          <ActivityIndicator />
        }
      
      </View>
     
    </View>

  );
};

const styles = StyleSheet.create({
  ai: {
    width: 36,
    height: 32,
    marginBottom: 4,
  },
  effectsContainer: {
    backgroundColor: '#FED8E5',
    borderRadius: 15,
    padding: 16,
  },
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
  ratingAverageTextLight: {
    fontSize: 12,
    lineHeight: 16,
    color: '#231f20',
    fontFamily: 'satoshi-medium',
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
