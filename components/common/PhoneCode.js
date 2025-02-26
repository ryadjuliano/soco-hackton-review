/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from '@/components/common/Image';
import {
  formGroup,
  formGroupAddonPhone,
  formAddOn,
  formAddOnText,
} from '~assets/styles/formStyles';
import WithLocalSvg from '@/components/common/WithLocalSvg';
import { isWeb } from '@/components/screens';

const PhoneCode = (props) => {
  const { selectedCountry } = props;
  return (
    <View style={[formGroup, formGroupAddonPhone, styles.countryWrapper]}>
      <View style={[formAddOn, styles.PhoneCodeContainer]}>
        <Image
          style={styles.flagCountry}
          source={
            selectedCountry
              ? { uri: selectedCountry?.flag }
              : require('@/assets/images/common/indonesia-flag.png')
          }
        />
        <Text style={formAddOnText}>
          {selectedCountry ? selectedCountry?.phone_code : '+62'}
        </Text>
        {
          <WithLocalSvg
            style={styles.arrow}
            asset={require('@/assets/images/common/arrow-down-filled.svg')}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flagCountry: {
    width: 20,
    height: 14,
    marginRight: 6,
  },
  countryWrapper: {
    marginRight: 0,
    paddingRight: 0,
  },
  PhoneCodeContainer: {
    width: isWeb ? 85 : 80,
  },
  arrow: {
    left: 4,
  },
});

export default PhoneCode;
