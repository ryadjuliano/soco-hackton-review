import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
//
const WithLocalSvg = React.lazy(() =>
  import('@/components/common/WithLocalSvg'),
);
import { isWeb } from '@/components/screens';
import Colors from '@/components/Colors';

const ListEmptyComponent = (props) => {
  const { status } = props;
  const width = isWeb ? 106 : 65;
  const height = isWeb ? 90 : 56;
  return (
    <View style={styles.container}>
      {status && (
        <>
          <WithLocalSvg
            asset={require('@/assets/images/empty-product.svg')}
            style={[styles.svg, { width, height }]}
          />

          <Text style={styles.text}>Maaf tidak ada produk yang ditemukan</Text>
        </>
      )}
    </View>
  );
};

ListEmptyComponent.propTypes = {
  status: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  svg: {
    marginBottom: 16,
  },
  text: {
    fontFamily: 'satoshi-bold',
    color: Colors.grey2,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },
});

export default ListEmptyComponent;
