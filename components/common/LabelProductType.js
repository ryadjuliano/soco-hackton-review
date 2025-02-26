import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '@/components/Colors';
import WithLocalSvg from '@/components/common/WithLocalSvg';
import { isWeb } from '@/components/screens';

const starWhiteSource = require('@/assets/images/common/star-white.svg');

const LabelProductType = (props) => {
  const { product } = props;
  const isBundle =
    ['bundle_virtual', 'bundle_physical'].indexOf(product.classification) > -1;
  const color = isBundle ? Colors.white : Colors.purple7;
  const labelText = [styles.labelText, { color }];
  //
  return (
    <View style={styles.labelContainer}>
      {product.is_exclusive && (
        <View style={styles.labelBackgroundContainer}>
          <WithLocalSvg
            key="star"
            width={16}
            height={13}
            style={styles.starIcon}
            asset={starWhiteSource}
          />
          <Text style={labelText}>Exclusive at Lilla</Text>
        </View>
      )}

      {product.is_limited && (
        <View style={styles.labelBackgroundContainer}>
          <Text style={labelText}>LIMITED</Text>
        </View>
      )}

      {Boolean(product.is_active_in_lulla && product.is_online) && (
        <View style={styles.labelBackgroundContainer}>
          <Text style={labelText}>ONLINE ONLY</Text>
        </View>
      )}

      {!product.is_exclusive && isBundle ? (
        <View
          style={[
            styles.labelBackgroundContainer,
            { backgroundColor: Colors.blue0 },
          ]}>
          <Text style={labelText}>BUNDLES</Text>
        </View>
      ) : null}
    </View>
  );
};

LabelProductType.propTypes = {
  product: PropTypes.object,
  defaultCombination: PropTypes.object,
};

const styles = StyleSheet.create({
  labelBackgroundContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow2,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  labelText: {
    fontFamily: 'satoshi-bold',
    fontSize: 16,
    letterSpacing: 0,
  },
  labelContainer: {
    top: isWeb ? 0 : 5,
    // position: 'absolute',
    alignSelf: 'center',
    zIndex: 9,
  },
  starIcon: {
    marginRight: 7,
  },
});

export default LabelProductType;
