import React from 'react';
import WithLocalSvg from '@web-components/common/WithLocalSvg';
import { isNative } from '~global/screens';
import Colors from '@/components/Colors';

const grey = {
  Input: {
    autoCapitalize: 'none',
    autoCorrect: false,
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputContainerStyle: {
      // borderColor: 'red', borderWidth: 1,
      backgroundColor: Colors.grey3,
      borderColor: Colors.grey3,
      borderRadius: 8,
      borderWidth: 1,
    },
    inputStyle: {
      color: Colors.black0,
      fontSize: 14,
      fontFamily: 'satoshi-medium',
      // lineHeight: 22,
    },
    labelStyle: {
      color: Colors.grey2,
      fontSize: 12,
      fontFamily: 'satoshi-medium',
      lineHeight: 21,
    },
    errorStyle: {
      color: Colors.red1,
      fontSize: 12,
      fontFamily: 'satoshi-medium',
      lineHeight: 21,
    },
    style: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
  },
};

const search = {
  Input: {
    containerStyle: { paddingHorizontal: 0 },
    inputContainerStyle: {
      backgroundColor: Colors.grey3,
      borderColor: Colors.grey3,
      borderRadius: 18,
      borderWidth: 1,
      height: 36,
    },
    inputStyle: {
      color: Colors.purple7,
      fontSize: 13,
      fontFamily: 'satoshi-medium',
      // lineHeight: 18,
      ...(!isNative && { outline: 0 }),
    },
    style: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginRight: 15,
    },
    autoCapitalize: 'none',
    leftIcon: (
      <WithLocalSvg asset={require('~assets/img/common/icon-search.svg')} />
    ),
    leftIconContainerStyle: { paddingLeft: 10 },
    rightIconContainerStyle: { paddingRight: 10 },
    renderErrorMessage: false,
  },
};

const searchBabyRegistry = {
  Input: {
    containerStyle: { paddingHorizontal: 0, width: 'auto' },
    inputContainerStyle: {
      backgroundColor: Colors.grey3,
      borderColor: Colors.grey3,
      borderRadius: 18,
      borderWidth: 1,
      height: 36,
      width: 397,
    },
    inputStyle: {
      color: Colors.purple7,
      fontSize: 13,
      fontFamily: 'satoshi-medium',
      // lineHeight: 18,
      ...(!isNative && { outline: 0 }),
    },
    style: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginRight: 15,
    },
    autoCapitalize: 'none',
    leftIcon: (
      <WithLocalSvg
        asset={require('~assets/img/baby-registry/icon-search.svg')}
      />
    ),
    leftIconContainerStyle: { paddingLeft: 10 },
    rightIconContainerStyle: { paddingRight: 10 },
    renderErrorMessage: false,
  },
};

const searchHelp = {
  Input: {
    containerStyle: { paddingHorizontal: 0 },
    inputContainerStyle: {
      elevation: 1,
      shadowColor: Colors.black,
      shadowOffset: { height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      backgroundColor: Colors.white,
      borderColor: Colors.grey3,
      borderRadius: 8,
      borderWidth: 1,
      height: 44,
    },
    inputStyle: {
      color: Colors.grey2,
      fontSize: 15,
      fontFamily: 'satoshi-medium',
      // lineHeight: 20,
      ...(!isNative && { outline: 'none' }),
    },
    style: {
      padding: 12,
    },
    autoCapitalize: 'none',
    autoCorrect: false,
    rightIconContainerStyle: { paddingRight: 12 },
    renderErrorMessage: false,
  },
};

export { grey, search, searchHelp, searchBabyRegistry };
