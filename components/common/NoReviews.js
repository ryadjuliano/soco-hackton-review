import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements-light';
import PropTypes from 'prop-types';
//
const WithLocalSvg = React.lazy(() =>
  import('@/components/common/WithLocalSvg'),
);
import { purpleSmall } from '@/components/styles/buttons';
import Colors from '@/components/Colors';
//
const iconNoReviews = require('@/assets/images/my-reviews/icon-no-reviews.svg');

const NoReviews = (props) => {
  const { onPress } = props;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <WithLocalSvg style={styles.icon} asset={iconNoReviews} />
        <Text style={styles.message}>Belum ada produk untuk direview</Text>
        <ThemeProvider theme={purpleSmall}>
          <Button title="Continue shopping" onPress={onPress} />
        </ThemeProvider>
      </View>
    </View>
  );
};

NoReviews.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  message: {
    color: Colors.grey17,
    fontFamily: 'satoshi-medium',
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 12,
  },
});
export default NoReviews;
