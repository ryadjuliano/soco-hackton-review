/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Image from '@/components/common/Image';
import {
  CheckBox,
  Input,
  ThemeProvider,
  Badge,
} from 'react-native-elements-light';
import WithLocalSvg from '@/components/common/WithLocalSvg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formLabel } from '~assets/styles/formStyles';
import { grey } from '@/components/styles/input';
import { purple as purpleCheckBox } from '@/components/styles/checkbox';
import { useDispatch } from 'react-redux';
import Colors from '@/components/Colors';
import { formatDate, getImageData } from '@/components/helpers';
import * as ImagePicker from 'expo-image-picker';
import * as uploaderActions from '~store/uploader/actions/uploader';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/form/Button';
import { getFormatedDate } from 'react-native-modern-datepicker-dayjs';
import ModalizeBase from '@/components/modals/ModalizeBase';

const ChildForm = (props) => {
  const platform = Platform.OS;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const modalizeRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isOpenModal, setIsOpenModal] = useState(false);

  const imageChildProfile =
    props.image && !props?.image.includes('svg')
      ? { uri: props.image }
      : require('@/assets/images/common/add-photo.png');

  useEffect(() => {
    if (isOpenModal) {
      modalizeRef.current.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isOpenModal]);

  const handleClose = () => {
    datePickerHandler(false);
  };

  const selectPhoto = async () => {
    // Get the permission to access the camera roll
    const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // If they said yes then launch the image picker
    if (response.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });
      // Check they didn't cancel the picking
      if (!pickerResult.canceled) {
        const selectedAsset = pickerResult.assets[0];
        photoChangeHandler(selectedAsset);
      }
    } else {
      // If not then alert the user they need to enable it
      Alert.alert(
        'Please enable camera roll permissions for this app in your settings.',
      );
    }
  };

  const photoChangeHandler = async (pickerResult) => {
    const { uri, filename, type } = getImageData(pickerResult);
    const url = await dispatch(
      uploaderActions.uploadImage(uri, filename, type),
    );
    if (url) {
      props.handleChange('image', url);
    } else {
      console.log('Unable to update');
    }
  };

  const dateChangeHandler = (e, date) => {
    if (!date) {
      return datePickerHandler(false);
    }
    setShowPicker(false);
    props.handleChange(
      'date_of_birth',
      getFormatedDate(new Date(date), 'YYYY-MM-DD'),
    );
    setDate(date);
    // return datePickerHandler(false)
  };

  const datePickerHandler = (value) => {
    if (value && props?.dateOfBirth) {
      setDate(new Date(props?.dateOfBirth));
    }
    if (platform == 'ios') {
      value ? setIsOpenModal(true) : setIsOpenModal(false);
    } else {
      setShowPicker(value);
    }
  };

  //...view
  return (
    <>
      <View style={styles.container}>
        <Badge
          containerStyle={{ position: 'absolute', top: -9, right: 15 }}
          value={props?.number_of_children}
          badgeStyle={{ backgroundColor: Colors.purple1 }}
          textStyle={{ color: Colors.purple0, fontWeight: 'bold' }}
        />
        <Pressable
          onPress={selectPhoto}
          style={{ marginBottom: 20, alignSelf: 'center' }}>
          <Image
            style={{ height: 110, width: 110, borderRadius: 5 }}
            source={imageChildProfile}
            resizeMode="cover"></Image>
          <Text style={[formLabel, { marginTop: 5 }]}>
            Foto Anak{' '}
            <Text style={{ fontFamily: 'satoshi-medium-italic' }}>
              (optional)
            </Text>{' '}
          </Text>
        </Pressable>
        {Boolean(props?.index == undefined) && (
          <ThemeProvider theme={purpleCheckBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: -10,
                marginBottom: 15,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  title={'Laki-Laki'}
                  checked={props.gender == 'male'}
                  onPress={() => props.handleChange('gender', 'male')}
                />
                <CheckBox
                  title={'Perempuan'}
                  checked={props.gender == 'female'}
                  onPress={() => props.handleChange('gender', 'female')}
                />
              </View>
            </View>
          </ThemeProvider>
        )}
        <ThemeProvider theme={grey}>
          <Input
            value={props?.name}
            label="Nama Anak"
            labelStyle={{ marginBottom: 10 }}
            inputContainerStyle={{
              backgroundColor: props?.name?.length ? Colors.white : '',
            }}
            onChangeText={(name) => props.handleChange('name', name)}
          />
          <Pressable
            style={{ height: 80, marginBottom: 20 }}
            onPress={() => datePickerHandler(true)}>
            <Input
              label="Tanggal Lahir"
              labelStyle={{ marginBottom: 10 }}
              inputContainerStyle={{
                backgroundColor: props.dateOfBirth?.length ? Colors.white : '',
              }}
              rightIcon={
                <WithLocalSvg
                  style={{ marginRight: 10 }}
                  asset={require('@/assets/images/common/icon-calendar.svg')}
                />
              }
              editable={false}
              value={formatDate(Date.parse(props.dateOfBirth))}
            />
          </Pressable>
        </ThemeProvider>
        {props?.index !== undefined && (
          <ThemeProvider theme={purpleCheckBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  title={'Laki-Laki'}
                  checked={props.gender == 'male'}
                  onPress={() => props.handleChange('gender', 'male')}
                />
                <CheckBox
                  title={'Perempuan'}
                  checked={props.gender == 'female'}
                  onPress={() => props.handleChange('gender', 'female')}
                />
              </View>
              {/* {props.index === 0 && */}
              <TouchableOpacity
                style={styles.actionDeleteWrapper}
                onPress={() => {
                  props.delete(props.index);
                }}>
                <Image
                  style={{ height: 16, width: 14, marginRight: 8 }}
                  source={require('@/assets/images/icon-trash.png')}
                  resizeMode="cover"></Image>
                <Text style={styles.actionDeleteText}>Hapus</Text>
              </TouchableOpacity>
              {/* } */}
            </View>
          </ThemeProvider>
        )}
      </View>

      <ModalizeBase
        ref={modalizeRef}
        childrenStyle={{ marginBottom: insets.bottom }}
        onClose={handleClose}>
        <View style={styles.modalCalendar}>
          <Text style={styles.modalCalendarText}>TANGGAL LAHIR</Text>
          <Pressable style={styles.modalClose} onPress={handleClose}>
            <WithLocalSvg
              width={14}
              height={14}
              asset={require('@/assets/images/product/icon-close.svg')}
            />
          </Pressable>
          <View style={{ paddingHorizontal: 16 }}>
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={dateChangeHandler}
            />
            <View style={{ marginTop: 20 }}>
              <Button
                title="Save"
                onPress={() => {
                  datePickerHandler(false);
                }}
              />
            </View>
          </View>
        </View>
      </ModalizeBase>

      {showPicker && platform == 'android' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          maximumDate={new Date()}
          onChange={dateChangeHandler}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  actionDeleteText: {
    fontFamily: 'satoshi-medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#6F6F6F',
  },
  actionDeleteWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderColor: Colors.grey0,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalCalendarText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'satoshi-black',
    color: Colors.black0,
    paddingLeft: 20,
  },
  modalCalendar: {
    paddingTop: 22,
    // height: 410,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 12,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChildForm;
