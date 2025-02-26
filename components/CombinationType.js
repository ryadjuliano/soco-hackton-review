/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CombinationType = ({ combination }) => {
  const isCombinationTypeNotShade = ['size', 'variant'].includes(
    combination.type,
  );

  const isShadeImage = /https/ig.test(combination.value)

  return (
    <View
      style={
        isCombinationTypeNotShade
          ? {}
          : { justifyContent: 'center', height: 20 }
      }>
      {isCombinationTypeNotShade ? (
        <View style={styles.combination}>
          <Text style={styles.combinationText}>{combination.name}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.combinationShade,
            {
              backgroundColor: combination?.value
                ? combination.value
                : '#F5F5F5',
            },
          ]}>
            { isShadeImage ?
              <Image
                source={{uri: combination.value}}
                style={styles.combinationShade}
              />
          :
          null
          }
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  combination: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderColor: '#E4E3E6',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  combinationText: {
    fontSize: 10,
    lineHeight: 16,
    fontFamily: 'satoshi-medium',
    color: '#78707E',
  },
  combinationShade: {
    width: 12,
    height: 12,
    marginRight: 4,
    borderRadius: 6,
  },
});

export default CombinationType;
