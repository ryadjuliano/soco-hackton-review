/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-color-literals */
import React, { forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import Product from '@/components/Product';

const ProductRecomendation = (props, ref) => {
  const { products } = props;
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.productContainer} key={`productProductRecomendation${index}`}>
        <Product productData={item} isShowRating={true} isShowAddToBag={true} />
      </View>
    );
  };

  const keyExtractor = (item, index) => `extractor${index}`;

  if (Array.isArray(products) && products.length) {
    return (
      <View ref={ref} style={styles.container}>
        <ImageBackground
          style={styles.body}
          source={require('@/assets/images/background-best-seller.png')}>
          <View style={styles.head}>
            <View style={styles.row}>
              <Text style={styles.textHeading}>Product Recomendation</Text>
            </View>

          </View>

          <View style={[styles.row, styles.bodyRow]}>
            <View style={styles.bodyRight}>
              <FlatList
                contentContainerStyle={styles.productGridHorizontal}
                data={products}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  body: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    paddingRight: 0,
    backgroundColor: '#FFE6D5',
  },
  bodyRow: {
    alignItems: 'center',
  },
  bodyRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
    paddingRight: 16,
  },
  productGridHorizontal: {
    paddingRight: 8,
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    width: 183,
    marginRight: 12,
    borderRadius: 8,
    position: 'relative',
  },
  textHeading: {
    fontSize: 16,
    lineHeight: 19,
    color: '#25182E',
    fontFamily: 'satoshi-bold',
  },
  row: {
    flexDirection: 'row',
  },
  subTitleStyle: {
    fontSize: 13,
    lineHeight: 13,
    color: '#A775C8',
  },
  arrowRightAll: {
    marginTop: 2,
    marginLeft: 5,
  },
});

export default forwardRef(ProductRecomendation);
