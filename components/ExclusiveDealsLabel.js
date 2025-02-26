import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';
import { isWeb } from '@/components/screens';

const ExclusiveDealsLabel = ({ layoutStyle, textStyle }) => {
  return (
    <>
      <View style={[styles.productLabelWrapper, layoutStyle]}>
        <Text style={[styles.productLabelWhiteText, textStyle]}>
          EXCLUSIVE DEALS
        </Text>
      </View>
    </>
  );
};

ExclusiveDealsLabel.propTypes = {
  layoutStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  productLabelWrapper: {
    backgroundColor: '#F05868',
    paddingHorizontal: isWeb ? 12 : 6,
    paddingTop: isWeb ? 4 : 3,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    height: isWeb ? 22 : 16,
  },
  productLabelWhiteText: {
    fontFamily: 'satoshi-bold',
    fontSize: isWeb ? 10 : 8,
    color: 'white',
  },
});

export default ExclusiveDealsLabel;
