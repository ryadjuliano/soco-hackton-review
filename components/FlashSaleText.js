import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FlashSaleText = (props) => {
  const {
    dataFlashSaleSelected,
    statusFlashSale,
    quotaFlashSale,
    isFlashSaleAlmostEmpty,
  } = props;

  const isFlashSaleEnded = dataFlashSaleSelected.is_ended;

  if (
    (dataFlashSaleSelected.is_coming_soon || !dataFlashSaleSelected.is_ended) &&
    !dataFlashSaleSelected.is_live
  ) {
    return null;
  }

  if (isFlashSaleEnded) {
    return (
      <>
        {statusFlashSale !== 'oos' && (
          <Text style={[styles.productActionAdd, styles.productPriceSoldList]}>
            Habis!{' '}
            <Text style={styles.productActionAdd}>Tersedia harga normal</Text>
          </Text>
        )}
      </>
    );
  } else if (statusFlashSale !== 'oos') {
    return (
      <>
        {quotaFlashSale.sold_quota === 0 && quotaFlashSale.total_quota > 0 ? (
          <Text style={styles.productActionAdd}>Masih Tersedia</Text>
        ) : (
          <>
            {quotaFlashSale.total_quota > 1 ? (
              <>
                {isFlashSaleAlmostEmpty ? (
                  <>
                    {statusFlashSale === 'fss' && (
                      <Text
                        style={[
                          styles.productActionAdd,
                          styles.productPriceSoldList,
                        ]}>
                        Habis!{' '}
                        <Text style={styles.productActionAdd}>
                          Tersedia harga normal
                        </Text>
                      </Text>
                    )}

                    {statusFlashSale !== 'fss' && (
                      <Text style={styles.productActionAdd}>Segera habis</Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.productActionAdd}>
                    Tersisa{' '}
                    {quotaFlashSale.total_quota - quotaFlashSale.sold_quota}
                  </Text>
                )}
              </>
            ) : (
              <>
                {statusFlashSale === 'fss' ? (
                  <Text
                    style={[
                      styles.productActionAdd,
                      styles.productPriceSoldList,
                    ]}>
                    Habis!{' '}
                    <Text style={styles.productActionAdd}>
                      Tersedia harga normal
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.productActionAdd}>
                    Tersisa{' '}
                    {quotaFlashSale.total_quota - quotaFlashSale.sold_quota}
                  </Text>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  } else if (statusFlashSale === 'oos') {
    return <Text style={styles.productActionAdd}>Stok Habis</Text>;
  }
};

const styles = StyleSheet.create({
  productActionAdd: {
    color: '#25182E',
    fontSize: 10,
    fontFamily: 'satoshi-medium',
    lineHeight: 16,
    textAlign: 'center',
  },
  productPriceSoldList: {
    fontFamily: 'satoshi-bold',
    color: '#F05868',
  },
});

export default React.memo(FlashSaleText);
