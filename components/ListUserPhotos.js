/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { Suspense } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
const ActivityIndicator = React.lazy(() =>
  import('@/components/common/ActivityIndicator'),
);
import { imageCdn } from '@/components/helpers';
import { isWeb } from '@/components/screens';
const defaultImage = require('@/assets/images/dummy_product.png');

const ListUserPhotos = (props) => {
  const maxTotalPhoto = isWeb ? 7 : 3;
  const userPhotos = [];
  const userPhotosFiltered = (userPhotos || []).filter(
    (photo, key) => key < maxTotalPhoto,
  );
  const statusApiUserPhotos = 'succeeded'
  const totalUserPhotos = 0;

  const showModalUserPhotos = (photo, index) => {

  };

  const imageSource = (image) => {
    return imageCdn({ config: 'w=100', image });
  };

  if (statusApiUserPhotos === 'pending') {
    return (
      <View style={styles.container}>
        <Suspense fallback={<></>}>
          <ActivityIndicator
            activityIndicatorContainerStyle={{ marginVertical: 8 }}
          />
        </Suspense>
      </View>
    );
  }

  return (
    <>
      {Boolean(statusApiUserPhotos === 'succeeded' && userPhotos.length) && (
        <View style={styles.container}>
          <View style={[styles.row, { marginLeft: -4, marginRight: -4 }]}>
            {(userPhotosFiltered || []).map((photo, key) => (
              <TouchableOpacity
                onPress={() => showModalUserPhotos(photo, key)}
                style={[
                  styles.column,
                  { width: isWeb ? '12.5%' : '25%', paddingHorizontal: 4 },
                ]}
                key={`userPhotos${key}`}>
                <Image
                  source={
                    photo.image_url
                      ? { uri: imageSource(photo.image_url) }
                      : defaultImage
                  }
                  style={styles.userProductPhoto}
                  resizeMode="cover"
                  defaultSource={defaultImage}
                />
              </TouchableOpacity>
            ))}

            {totalUserPhotos > maxTotalPhoto ? (
              <TouchableOpacity
                style={[
                  styles.column,
                  { width: isWeb ? '12.5%' : '25%', paddingHorizontal: 4 },
                ]}
                onPress={() => showModalUserPhotos(userPhotos[0], 0)}>
                <View
                  style={[
                    styles.userProductPhoto,
                    styles.userProductPhotoMore,
                  ]}>
                  <Text style={styles.userProductPhotoMoreText}>
                    See all Photos
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  column: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  userProductPhoto: {
    width: '100%',
    height: 76,
    borderRadius: 8,
  },
  userProductPhotoMore: {
    alignItems: 'center',
    justifyContent: 'center',
    ...(isWeb
      ? {
          backgroundColor: '#FFFFFF',
        }
      : {
          backgroundColor: '#F3F0FC',
        }),
  },
  userProductPhotoMoreText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#A775C8',
    fontFamily: 'satoshi-black',
    textAlign: 'center',
    ...(isWeb
      ? {
          paddingHorizontal: 15,
        }
      : {}),
  },
});

export default ListUserPhotos;
