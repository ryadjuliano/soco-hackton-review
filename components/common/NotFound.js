/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from '@/components/common/Image';
const iconNotFound = require('@/assets/images/not-found/icon-not-found.png');
const Button = React.lazy(() => import('@/components/form/Button'));
import { useNavigation } from '@react-navigation/native';
import { isMobileWeb } from '@/components/screens';
import Layout from '@/components/common/Layout';

const NotFound = (props) => {
  const navigation = useNavigation();
  const redirect = () => {
    navigation.navigate('HomeScreen');
  };
  return (
    <Layout.Container
      containerStyle={styles.container}
      showHomeHeader
      isFullWidth
      isNoFooter>
      <View style={isMobileWeb ? styles.containerMobile : {}}>
        <View style={[styles.content, isMobileWeb ? styles.contentMobile : {}]}>
          <Image
            source={iconNotFound}
            style={[
              styles.iconNotFound,
              isMobileWeb ? styles.iconNotFoundMobile : {},
            ]}
            resizeMode="cover"
          />

          <Text
            style={[styles.heading, isMobileWeb ? styles.headingMobile : {}]}>
            Upps, Something Went Wrong!
          </Text>
          <Text style={[styles.text, isMobileWeb ? styles.textMobile : {}]}>
            It looks like the page you enter doesn’t exist. You can find what
            your looking for below
          </Text>

          <Button
            title="Back to Home"
            onPress={redirect}
            buttonStyle={[
              styles.button,
              isMobileWeb ? styles.buttonMobile : {},
            ]}
          />
        </View>
      </View>
    </Layout.Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 240,
  },
  buttonMobile: {
    width: 200,
  },
  container: {
    backgroundColor: '#FAF8FC',
    minHeight: '100%',
    width: '100%',
  },
  containerMobile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 90,
    width: 636,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentMobile: {
    width: '100%',
    marginTop: 0,
  },
  heading: {
    fontFamily: 'satoshi-black',
    fontSize: 24,
    lineHeight: 36,
    color: '#25182E',
    marginBottom: 24,
  },
  headingMobile: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  iconNotFound: {
    width: 392,
    height: 280,
    marginBottom: 64,
  },
  iconNotFoundMobile: {
    width: 224,
    height: 160,
    marginBottom: 24,
  },
  text: {
    fontFamily: 'satoshi-bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#5C5263',
    marginBottom: 32,
  },
  textMobile: {
    fontSize: 12,
    lineHeight: 18,
    width: 290,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default NotFound;
