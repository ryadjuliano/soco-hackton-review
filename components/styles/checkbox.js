import React from 'react';
//
import Colors from '@/components/Colors';
import WithLocalSvg from '@web-components/common/WithLocalSvg';

const purple = {
  CheckBox: {
    containerStyle: {
      borderColor: 'red',
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
    },
    textStyle: {
      color: Colors.grey2,
      fontSize: 14,
      fontFamily: 'satoshi-medium',
      lineHeight: 19,
    },
    checkedIcon: (
      <WithLocalSvg
        height={20}
        asset={require('~assets/img/common/radio-full-active.svg')}
      />
    ),
    uncheckedIcon: (
      <WithLocalSvg
        height={20}
        asset={require('~assets/img/common/radio-v2.svg')}
      />
    ),
  },
};

export { purple };
