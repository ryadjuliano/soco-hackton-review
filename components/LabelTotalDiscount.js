import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';
import WithLocalSvg from '@/components/common/WithLocalSvg';
import { isWeb } from '@/components/screens';

const LabelTotalDiscount = ({ totalDiscount }) => {
  return (
    <View style={styles.hematWrapper}>
      <WithLocalSvg
        width={16}
        height={16}
        asset={require('@/assets/images/home/icon-promotion-v2.svg')}
        style={styles.iconPromotion}
      />

      <Text style={styles.hematText}>
        Hemat{' '}
        <Text style={styles.hematAmount}>
          {''} {totalDiscount}
        </Text>
      </Text>
    </View>
  );
};

LabelTotalDiscount.propTypes = {
  discountPrice: PropTypes.string,
};

const styles = StyleSheet.create({
  hematWrapper: {
    alignItems: 'center',
    marginTop: isWeb ? 0 : 10,
    marginLeft: isWeb ? 8 : 0,
    backgroundColor: '#FEF3F4',
    borderRadius: 12,
    padding: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  hematText: {
    fontSize: 12,
    fontFamily: 'satoshi-medium',
    color: '#A775C8',
  },
  hematAmount: {
    fontSize: 12,
    fontFamily: 'satoshi-black',
    color: '#905EB2',
  },
  iconPromotion: {
    marginRight: 6,
    width: 12.9,
    height: 8.7,
  },
});

export default LabelTotalDiscount;
