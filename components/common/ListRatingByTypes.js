/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { generatedRatingTypeName } from '@/components/helpers';
import { isWeb } from '@/components/screens';

const ListRatingByTypes = (props) => {
  const { averageRatingByTypes, isDetail } = props;
  const listRatingByTypes = (() => {
    const list = [];
    let item = {};
    Object.entries(averageRatingByTypes).map(([name, value], key) => {
      const nameReplaced = generatedRatingTypeName(name);
      const valueReplaced = Math.floor(value);
      item = { name: nameReplaced, value: valueReplaced };
      list.push(item);
    });
    return list;
  })();

  return (
    <>
      {isDetail ? (
        <View style={styles.row}>
          {(listRatingByTypes || []).map((rating, key) => (
            <View style={styles.ratingTypesCol} key={key}>
              <View style={[styles.ratingTypes, {backgroundColor: '#FFFFFF' , alignItems: 'flex-start', paddingHorizontal: 0}]}>
                <Text style={styles.ratingTypesText}>
                  {rating.name}{' '}
                  <Text style={styles.ratingTypesTextBolder}>
                    {rating.value}/5
                  </Text>
                 
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {(listRatingByTypes || []).map((rating, key) => (
            <View style={styles.ratingTypes} key={key}>
              <Text style={styles.ratingTypesText}>
                <Text style={styles.ratingTypesTextBolder}>
                  {rating.value}/5
                </Text>{' '}
                {rating.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  ratingTypes: {
    borderRadius: 13.5,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 8,
    justifyContent: 'center',
    ...(isWeb
      ? {
          height: 31,
          width: 'max-content',
          marginBottom: 12,
        }
      : {
          marginRight: 8,
          height: 27,
          alignItems: 'center',
        }),
  },
  ratingTypesCol: {
    paddingHorizontal: 6,
    ...(isWeb
      ? {
          display: 'inline-block',
        }
      : {
          width: '50%',
        }),
  },
  ratingTypesText: {
    color: '#404040',
    letterSpacing: 0,
    fontFamily: 'satoshi-bold',
    ...(isWeb
      ? {
          fontSize: 12,
          lineHeight: 16,
        }
      : {
          fontSize: 11,
          lineHeight: 15,
        }),
  },
  ratingTypesTextBolder: {
    color: '#F384A7',
    fontFamily: 'satoshi-black',
  },
  row: {
    ...(isWeb
      ? {
          display: 'block',
        }
      : {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -6,
        }),
  },
});

export default ListRatingByTypes;
