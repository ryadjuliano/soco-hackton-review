import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Image from '@/components/common/Image';
//
import { isWeb } from '@/components/screens';

const ScrollToTop = (props) => {
  return (
    <Pressable style={styles.scrollUp} {...props}>
      <Image
        source={{ uri: require('@/assets/images/web/scroll-up.png') }}
        style={styles.scrollUpImage}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scrollUp: {
    alignSelf: 'flex-end',
    ...(isWeb && { cursor: 'pointer' }),
  },
  scrollUpImage: {
    width: 40,
    height: 40,
  },
});

export default ScrollToTop;
