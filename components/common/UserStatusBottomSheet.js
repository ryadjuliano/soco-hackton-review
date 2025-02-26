/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-case-declarations */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import { formGroup, formWrapper } from '~assets/styles/formStyles';
import ModalizeBase from '@/components/modals/ModalizeBase';
import Sheet0 from '@/components/lilla-profiling/partial/Sheet0';
import ChildForm from '@/components/common/ChildForm';
import ChildBirthModal from '@/components/profile/ChildBirthModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeProvider } from 'react-native-elements-light';
import Radio from '@/components/form/Radio';
const Button = React.lazy(() => import('@/components/form/Button'));
import * as authActions from '~store/user/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '@/components/Colors';
import { purple } from '@/components/styles/buttons';
import Toast from 'react-native-toast-message';
import ModalDialog from '@/components/modals/ModalDialog';
import { phaseList, stateTitle } from '~global/constants';
import { getChildData } from '@/components/helpers';

const UserStatusBottomSheet = (props) => {
  const platform = Platform.OS;
  const dispatch = useDispatch();
  const modalizeRef = useRef(null);
  const userData = useSelector((state) => state.auth.user);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const {
    showState,
    setShowState,
    profile,
    status,
    screen,
    handleStatus,
    onResetStatus,
  } = props;
  const [showPicker, setShowPicker] = useState(false);
  const showStateList = [
    'change-delivery-status',
    'birth-confirmation',
    'change-status',
    'change-detail',
    'add-child',
    'add-prediction',
    'update-prediction',
  ];
  const [child, setChild] = useState({
    name: '',
    date_of_birth: new Date(),
    gender: 'female',
    image: '',
    phase_of_mother: '',
    birthday: '',
  });

  const changeStatusHandler = (newStatus) => {
    handleStatus(newStatus);
  };

  const newChildHandler = (value) => {
    setChild({ ...child, ...value });
  };

  const dateChangeHandler = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    if (platform === 'android') {
      setShowPicker(false);
      selectedDate && setSelectedDate(selectedDate);
    }
    setDate(currentDate);
  };

  const handleSaveDate = () => {
    setShowPicker(false);
    setSelectedDate(date);
  };

  const datePickerHandler = (value) => {
    setShowPicker(value);
  };

  const statusUpdateHandler = async (data) => {
    const payload = {
      lilla_profiling: { children: profile?.children ?? [] },
    };
    let childData = {
      phase_of_mother: status.value,
    };

    function addNewChild() {
      payload?.lilla_profiling?.children.push(childData);
    }

    function updateChildStatus() {
      payload.lilla_profiling.children.map((child) => {
        let data = child;
        if (['expecting', 'no'].indexOf(child.phase_of_mother) > -1) {
          data = Object.assign(child, childData);
        }
        return data;
      });
    }

    // to change/create expecting child data
    function setPrediction(isNewChild = false) {
      childData.prediction = data.prediction;
      // childData.date_of_birth = data.prediction.birth_date
      isNewChild ? addNewChild() : updateChildStatus();
      return;
    }

    if (['toddler', 'breastfeeding', 'three_year_kid'].includes(status.value)) {
      switch (showState) {
        case 'add-child':
          // let childDetail = getChildData(child.date_of_birth, true)
          // child.phase_of_mother = childDetail.phase_of_mother
          if (profile?.children?.length) {
            payload.lilla_profiling.children = [...profile.children, child];
            payload.lilla_profiling.no_of_children =
              userData.total_children + 1;
          } else {
            payload.lilla_profiling.children = [child];
            payload.lilla_profiling.no_of_children = 1;
          }
          break;
        case 'change-detail':
          setShowState('add-prediction');
          return;
        case 'add-prediction':
          childData.phase_of_mother = 'expecting';
          setPrediction(true);
          break;
        default:
          setShowState('add-child');
          return;
      }
    } else if (status.value == 'expecting') {
      switch (showState) {
        case 'change-status':
          setShowState('add-prediction');
          setSelectedDate('');
          return;
        case 'add-prediction':
          setPrediction(true);
          break;
        case 'update-prediction':
          setPrediction();
          break;
        case 'add-child':
          const childDetail = getChildData(child.date_of_birth, true);
          child.phase_of_mother = childDetail.phase_of_mother;
          child.birthday = childDetail.birthDate;
          setShowState('child-birth-greet');
          return;
        case 'child-birth-greet':
          childData = Object.assign(childData, child);
          updateChildStatus();
          break;
        case 'stop-tracking':
          childData.phase_of_mother = 'no';
          childData.date_of_birth = '';
          childData.prediction = {};
          childData.is_track = false;
          updateChildStatus();
          break;
      }
    }

    const res = await dispatch(authActions.updateUser(userData._id, payload));
    if (res) {
      const successMessage = {
        'stop-tracking': 'Tracker stopped successfully',
        'add-prediction': 'HPL berhasil diupdate',
      };
      const message = successMessage[showState];
      setShowState('');
      setChild({
        name: '',
        image: '',
        gender: 'female',
        date_of_birth: new Date(),
      });
      Toast.show({ text1: message ? message : 'Update Succeed' });

      if (screen === 'tracker') {
        onResetStatus(); // reload tracking screen
      } else {
        props.onUpdateStatus(); // emit to parent
      }
    }
  };

  const closeBottomSheet = () => {
    setShowState('');
    setShowPicker(false);
  };

  useEffect(() => {
    if (showStateList.includes(showState)) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
      setShowState(showState);
    }
  }, [showState]);

  return (
    // .........Bottom .....Sheet
    <>
      <ModalizeBase
        ref={modalizeRef}
        withInsetsBottom
        onClose={closeBottomSheet}>
        <View>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.selectTitle}>{stateTitle[showState]}</Text>
            {/* <Icon name="close" onPress={closeBottomSheet} /> */}
          </View>

          {/* ..........change mother phase status....... */}
          {showState === 'change-status' && (
            <View style={styles.container}>
              <View style={formWrapper}>
                {phaseList.map((phase) => (
                  <View style={formGroup} key={phase.value}>
                    <Radio
                      title={phase.title}
                      checked={phase.value === status?.value}
                      onPress={() => changeStatusHandler(phase)}
                    />
                  </View>
                ))}
              </View>
              <ThemeProvider theme={purple}>
                <Button title="Update" onPress={statusUpdateHandler} />
              </ThemeProvider>
            </View>
          )}
          {/* .................ADD/ UPDATE PREDICTION...... */}
          {['add-prediction', 'update-prediction'].indexOf(showState) > -1 && (
            <View style={styles.container}>
              {(platform == 'android' ||
                (!showPicker && platform == 'ios')) && (
                <Sheet0
                  selectedDate={selectedDate}
                  onShowPicker={() => datePickerHandler(true)}
                  onSubmit={(data) => statusUpdateHandler(data)}></Sheet0>
              )}
              {showPicker && (
                <>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    onChange={dateChangeHandler}
                  />
                  {platform == 'ios' && (
                    <ThemeProvider theme={purple}>
                      <Button title="Simpan" onPress={handleSaveDate} />
                    </ThemeProvider>
                  )}
                </>
              )}
            </View>
          )}

          {/* .................Delivery Status........ */}
          {showState === 'change-delivery-status' && (
            <View style={[styles.container, { paddingBottom: 30 }]}>
              {screen !== 'tracker' && (
                <Pressable onPress={() => setShowState('add-child')}>
                  <Text style={styles.menu}>Konfirmasi Kelahiran</Text>
                </Pressable>
              )}
              <Pressable onPress={() => setShowState('stop-tracking')}>
                <Text style={styles.menu}>Hentikan Tracker Kehamilan</Text>
              </Pressable>
              <Pressable onPress={() => setShowState('update-prediction')}>
                <Text style={styles.menu}>Hitung Ulang HPL</Text>
              </Pressable>
            </View>
          )}

          {/* ..............change status....... */}
          {showState === 'change-detail' && (
            <View style={[styles.container, { paddingBottom: 30 }]}>
              <Pressable onPress={statusUpdateHandler}>
                <Text style={styles.menu}>Ganti Status Menjadi Hamil</Text>
              </Pressable>
              {screen == 'tracker' && (
                <Pressable onPress={() => setShowState('edit-child')}>
                  <Text style={styles.menu}>Edit Data Anak</Text>
                </Pressable>
              )}
            </View>
          )}

          {/* ....................ADD Child............. */}
          {showState === 'add-child' && (
            <View style={styles.container}>
              <ChildForm
                number_of_children={1}
                name={child.name || ''}
                gender={child.gender || ''}
                handleChange={(key, value) => newChildHandler({ [key]: value })}
                image={child.image}
                dateOfBirth={child.date_of_birth || ''}></ChildForm>
              <ThemeProvider theme={purple}>
                <Button
                  title="Submit"
                  onPress={statusUpdateHandler}
                  disabled={
                    !(child.name && child.gender && child.date_of_birth)
                  }
                />
              </ThemeProvider>
            </View>
          )}
        </View>
      </ModalizeBase>

      {/* ....................Child Birth Success Message ............. need adjustment on web
      <Modal visible={showState === 'child-birth-greet'} transparent>
        <View style={styles.modalOverlay}>
          <ChildBirthModal
            child={child}
            handleSubmit={statusUpdateHandler}></ChildBirthModal>
        </View>
      </Modal>*/}

      {/* ................stop tracking......... need adjustment on web
      <ModalDialog
        visible={showState === 'stop-tracking'}
        title="Hentikan Tracker"
        content="Apakah kamu yakin ingin menghentikan tracker kehamilan?"
        leftButtonTitle="Cancel"
        rightButtonTitle="Proceed"
        onLeftButtonPress={() => setShowState('')}
        onRightButtonPress={statusUpdateHandler}
        closeModal={() => setShowState('')}
      />*/}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  rowSpaceBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  selectTitle: {
    color: Colors.black0,
    fontSize: 14,
    fontFamily: 'satoshi-black',
    lineHeight: 20,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    fontFamily: 'satoshi-medium',
    paddingVertical: 15,
    color: '#404040',
    fontSize: 14,
  },
});

export default UserStatusBottomSheet;
