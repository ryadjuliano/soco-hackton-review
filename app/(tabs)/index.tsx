import React, {useEffect, useState} from 'react';
import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ProductRecomendation from '@/components/ProductRecomendation';
import ActivityIndicator from '@/components/common/ActivityIndicator';

import { getProductsRecomendation } from '@/api/hackton';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getProductsRecomendation().then((response) => {
      setProducts(response.data.data.product)
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    })
  }, [])
 
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{uri: 'https://images.soco.id/a16a1d7d-4aca-46f3-95cd-bde03ef69ccc-.jpg'}}
          style={styles.reactLogo}
        />
      }>
        {isLoading ?
          <ActivityIndicator activityIndicatorContainerStyle={styles.activityIndicatorContainerStyle} />
        :
          <ProductRecomendation products={products} />
        }
     

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainerStyle: {
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
