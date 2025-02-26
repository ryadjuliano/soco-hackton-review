/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Colors from '@/components/Colors';
import WithLocalSvg from '@/components/common/WithLocalSvg';
import { getAttributesName } from '@/components/helpers';

const ModalBundleInfo = ({ products, onClose }) => {
  const { detail, is_pack, pack_detail } = products;

  const attributes = getAttributesName(detail?.combination?.attributes || []);

  return (
    <View style={styles.modal}>
      <View style={styles.containerHeader}>
        <Text style={[styles.modalTitle, { marginBottom: 19 }]}>Bundles</Text>
        <Pressable style={{ cursor: 'pointer' }} onPress={onClose}>
          <WithLocalSvg
            height={20}
            asset={require('@/assets/images/common/modal-dismiss.svg')}
          />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <Image
          source={{ uri: detail.image.url }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{detail.brand.name}</Text>
          <Text style={styles.productDesc}>{detail.name}</Text>
          <View style={styles.containerBundles}>
            <Text style={styles.bundlePackName}>Bundle Pack:</Text>
            {attributes.length > 0 &&
              attributes.map((attr, index) => (
                <Text key={index} style={styles.bundleDesc}>
                  {attr}
                </Text>
              ))}
            {is_pack &&
              pack_detail.map((pack, index) => (
                <View
                  key={`${pack.detail.name}_${index}`}
                  style={styles.containerPackDetail}>
                  <Text style={styles.bundleDesc}>{pack.detail.name}</Text>
                  <Text style={styles.bundleDesc}>{pack.quantity} Pcs</Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    marginBottom: -4,
    width: '100%',
  },
  modalTitle: {
    color: '#25182E',
    fontSize: 16,
    fontFamily: 'satoshi-bold',
    lineHeight: 24,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    borderRadius: 8,
    marginRight: 12,
    width: 64,
    height: 64,
  },
  productName: {
    color: '#A774C8',
    fontSize: 12,
    fontFamily: 'satoshi-black',
    lineHeight: 16,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  productDesc: {
    color: '#25182E',
    fontSize: 14,
    fontFamily: 'satoshi-medium',
    lineHeight: 20,
    marginBottom: 3,
  },
  containerBundles: {
    marginTop: 12,
  },
  bundlePackName: {
    color: '#A774C8',
    fontSize: 14,
    fontFamily: 'satoshi-bold',
    lineHeight: 20,
    marginBottom: 6,
  },
  bundleDesc: {
    color: '#78707E',
    fontSize: 14,
    fontFamily: 'satoshi-medium',
    lineHeight: 20,
  },
  containerPackDetail: {
    marginBottom: 6,
  },
});

export default ModalBundleInfo;
