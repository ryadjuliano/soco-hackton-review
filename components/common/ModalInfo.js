/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ListsPrefixesRenderers } from '@/components/common/microComponent';
import { paragraphStyles } from '~assets/styles/formStyles';
import Colors from '@/components/Colors';
const Button = React.lazy(() => import('@/components/form/Button'));
import HTML from 'react-native-render-html';
import { isWeb } from '@/components/screens';
import Image from '@/components/common/Image';

const dimension = Dimensions.get('window');
const screenWidth = dimension.width;

const ModalInfo = ({
  type,
  modalTitle,
  buttonTitle,
  onClose,
  voucherInfo,
  modalStyle,
  onPress,
  buttonStyle,
  buttonWrapper,
}) => {
  const data = {
    shipping: [
      'User only allowed to pick x gift from the minimum purchase one time',
      'Maximum x products to pick the gift',
      'Promotion valid while stock lasts',
    ],
    gainSocoPoints:
      'Kumpulkan SOCO Points setiap kelipatan belanja Rp50.000 dan gunakan SOCO Points untuk potongan belanjamu berikutnya.',
    shippingBabyRegistry: [
      'Pengiriman dilakukan pada hari Senin s.d. Jumat (08.00-17.00 WIB)',
      'Tidak ada pengiriman di hari Sabtu, Minggu, dan Libur Nasional',
      'Pemesanan setelah pukul 17.00 akan diproses di hari kerja berikutnya',
      'Pemesanan dengan %Reguler Shipping% akan diproses 3-5 hari kerja setelah tanggal konfirmasi pembayaran atau pembayaran sukses',
      'Pemesanan dengan %Same Day Delivery% akan diproses di hari yang sama setelah pembayaran terverifikasi',
      'Pemesanan dengan %Pickup at Store% siap diambil di store 3-5 hari kerja setelah tanggal konfirmasi pembayaran atau pembayaran sukses',
    ],
  };
  const contentWidth = useWindowDimensions().width;
  const info = data[type];

  return (
    <View style={[styles.modal, modalStyle]}>
      <View style={styles.headerWrapper}>
        <Text style={[styles.modalTitle, { marginBottom: 19 }]}>
          {modalTitle}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require('@/assets/images/icon-close-black.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {type == 'gift' ? (
          <View>
            <HTML
              baseFontStyle={{ fontSize: 12 }}
              tagsStyles={paragraphStyles}
              source={{ html: voucherInfo.tnc }}
              contentWidth={contentWidth}
              listsPrefixesRenderers={ListsPrefixesRenderers}
            />
          </View>
        ) : (
          <>
            {type === 'gainSocoPoints' ? (
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text
                  style={[
                    styles.textDescSocoPoint,
                    { flex: 1, marginLeft: 0 },
                  ]}>
                  {data[type]}
                </Text>
              </View>
            ) : type == 'location-permissions' ? (
              <>
                <Image
                  style={{ width: 56, height: 56, alignSelf: 'center' }}
                  source={require('@/assets/images/common/icon-pin-point-2xl.png')}
                  resizeMode="contain"
                />
                <Text style={styles.textLocationService}>
                  Enable your location service
                </Text>
                <Text style={styles.textDescLocationService}>
                  Mengaktifkan lokasi dapat membantu kamu mencari lokasi pin
                  point!
                </Text>
              </>
            ) : type == 'shippingBabyRegistry' ? (
              info.map((item, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <Text style={[styles.textDesc, { color: '#5C5263' }]}>•</Text>
                  <Text
                    style={[styles.textDesc, { flex: 1, color: '#5C5263' }]}>
                    {item.split('%').map((item, index) =>
                      index % 2 === 0 ? (
                        <Text
                          key={index}
                          style={{ fontFamily: 'satoshi-medium' }}>
                          {item}
                        </Text>
                      ) : (
                        item
                      ),
                    )}
                  </Text>
                </View>
              ))
            ) : (
              info.map((item, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <View style={styles.dotsShape} />
                  <Text style={[styles.textDesc, { flex: 1 }]}>{item}</Text>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
      {buttonTitle && (
        <View style={[styles.buttonWrapper, buttonWrapper]}>
          <Button
            title={buttonTitle}
            onPress={onPress || onClose}
            buttonStyle={[styles.buttonStyles, buttonStyle]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: isWeb ? 420 : screenWidth,
  },
  modalTitle: {
    color: '#25182E',
    fontSize: 16,
    fontFamily: 'satoshi-bold',
    lineHeight: 24,
  },
  textDesc: {
    color: Colors.grey1,
    fontSize: 14,
    fontFamily: 'satoshi-bold',
    lineHeight: 20,
    marginLeft: 10,
    marginTop: -2,
  },
  textDescSocoPoint: {
    fontFamily: 'satoshi-medium',
    fontSize: 14,
    color: '#5C5263',
    lineHeight: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLocationService: {
    color: '#25182E',
    fontSize: 16,
    fontFamily: 'satoshi-bold',
    lineHeight: 24,
    textAlign: 'center',
  },
  textDescLocationService: {
    color: '#89828E',
    fontSize: 14,
    fontFamily: 'satoshi-medium',
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonStyles: {
    width: 'auto',
    height: 36,
    paddingHorizontal: 46,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: isWeb ? 'center' : 'flex-end',
    marginTop: 20,
  },
});

export default ModalInfo;
