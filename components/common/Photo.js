/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  // Platform
} from 'react-native';
import Image from '@/components/common/Image';
// const Input = React.lazy(() => import( '@/components/form/Input'));
// import { formGroup, formWrapper } from '~assets/styles/formStyles';
import { useSelector, useDispatch } from 'react-redux';
import { CropIcon } from '@/components/common/microComponent';

const Photo = ({ userPhoto, onEdit, index }) => {
  const dispatch = useDispatch();
  const { listPhotosBeforeUploaded } = useSelector((state) => state.addPhoto);

  const updateHandler = (key, value) => {
    dispatch({
      type: 'addPhoto/setState',
      name: 'listPhotosBeforeUploaded',
      value: listPhotosBeforeUploaded.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    });
  };
  const editPhotoHandler = () => {
    if (onEdit) {
      onEdit({ event: 'crop', value: index });
    }
  };

  return (
    <View style={styles.photo}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: userPhoto.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <CropIcon
          editPhotoHandler={editPhotoHandler}
          styles={styles.iconPosition}></CropIcon>
      </View>
      {/*
      <View style={styles.captionContainer}>
        <View style={[styles.rowSpaceBetween, { marginBottom: 8 }]}>
          <Text style={styles.captionText}>
            Say something about your photo (optional)
          </Text>
          <Text style={styles.captionTextBolder}>
            {userPhoto.caption.length}/100
          </Text>
        </View>
        <View style={formWrapper}>
          <View style={[formGroup, { position: 'relative' }]}>
            <Input
              placeholder="e.g. : My favourite product ever!"
              renderErrorMessageControl={false}
              onChangeText={(caption) => updateHandler('caption', caption)}
              defaultValue={userPhoto.caption}
              inputContainerStyle={styles.inputContainerStyle}
              labelStyle={styles.labelStyle}
              validate={{
                presence: {
                  allowEmpty: false,
                  message: 'Data belum diisi',
                },
                length: {
                  maximum: 100,
                  message: 'Review harus terdiri dari 100 karakter',
                },
              }}
            />
          </View>
        </View>
      </View>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  // captionContainer: {},
  // captionText: {
  //   fontFamily: 'satoshi-medium',
  //   fontSize: 12,
  //   lineHeight: 21,
  //   color: '#25182E',
  // },
  // captionTextBolder: {
  //   fontFamily: 'satoshi-bold',
  //   fontSize: 12,
  //   lineHeight: 21,
  //   color: '#6F6F6F',
  // },
  image: {
    height: 329,
    width: '100%',
    borderRadius: 4,
  },
  // labelStyle: {
  //   color: '#25182E',
  // },
  imageContainer: {
    borderRadius: 4,
    height: 329,
    width: '100%',
    marginBottom: 18,
  },
  // inputContainerStyle: {
  //   backgroundColor: '#FBFAFF',
  // },
  photo: {
    // marginBottom: 24,
  },
  // rowSpaceBetween: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  iconPosition: {
    position: 'absolute',
    bottom: 30,
    right: 0,
  },
});

export default Photo;
