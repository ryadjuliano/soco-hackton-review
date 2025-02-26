/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import ProductController from '@/components/ProductController';
const ProductGridRating = React.lazy(() =>
  import('@/components/ProductGridRating'),
);
const AddToBagButton = React.lazy(() =>
  import('@/components/AddToBagButton'),
);
const ReasonCard = React.lazy(() =>
  import('@/components/ReasonCard'),
);
const FlashSaleText = React.lazy(() =>
  import('@/components/FlashSaleText'),
);
import { isWeb, isMobileWeb } from '@/components/screens';
import { screenWidth } from '@/components/screens';
import { currencyFormat, formatPrice } from '@/components/helpers';
import CombinationType from '@/components/CombinationType';
const defaultImage = require('@/assets/images/dummy_product.png');
const Product = (props) => {
  const {
    productData,
    isSpecialPrice,
    productContainerStyle,
    productImageStyle,
    maxWidth,
    isInSlider,
    isNoPaddingHorizontal,
    useCenter,
    customWidth,
    isPackContent,
    wishlistHandler,
    wishlistSource,
    redirectToProductDetail,
    onShowAddToBag,
    productParam,
    isEgiftProduct,
    showAddToBag,
    productImageSource,
    opacity,
    showDiscount,
    isExclusiveProduct,
    isNewProduct,
    isBundleProduct,
    isBuyOneGetOneProduct,
    isInStock,
    isPreOrderProduct,
    brandName,
    rating,
    count,
    showRatingStar,
    addToBagHandler,
    addToBagBabyRegistryHandler,
    combinations,
    moreCombinationNumberInfo,
    isFriendsView,
    isProductBabyRegistry,
    quantity,
    isShowButtonDeleteProductRegistry,
    isFlashSaleProduct,
    dataFlashSaleSelected,
    isFlashSaleStarting,
    isFlashSaleEnded,
    isUpComingFlashSale,
    isShowRating,
    progressWidth,
    isHomeBannerProduct,
    statusFlashSale,
    quotaFlashSale,
    isFlashSaleAlmostEmpty,
    isFlashSaleStillAvailable,
    isExclusiveDealsProduct,
    hasCombinations,
    isMultipleCombinationOnSale,
    isShowAddToBag,
  } = ProductController(props);

  return (
    <View
      style={[
        styles.productGridItem,
        isProductBabyRegistry ? styles.productGridItemRegistry : {},
        productContainerStyle,
        {
          opacity:
            isSpecialPrice && !productData.is_special_price_applicable
              ? 0.5
              : 1,
        },
        maxWidth ? { width: maxWidth } : {},
        isInSlider && maxWidth
          ? {
              width: 150,
              marginHorizontal: 0,
             marginRight: 15 ,
            }
          : {},
        isInSlider && isMobileWeb ? { minHeight: 295 } : {},
        isNoPaddingHorizontal ? { paddingHorizontal: 0 } : {},
        useCenter ? { marginLeft: 'auto', marginRight: 'auto' } : {},
        customWidth ? { width: customWidth, maxWidth: '100%' } : {},
        isFlashSaleProduct ? { paddingBottom: 60 } : {},
      ]}>
      {!isPackContent && !isShowButtonDeleteProductRegistry ? (
        <Pressable style={styles.wishlistIcon} onPress={wishlistHandler}>
          <Image style={styles.wishlistSize} source={wishlistSource} />
        </Pressable>
      ) : null}


      <Pressable
        activeOpacity={1}
        onPress={redirectToProductDetail}
      >
          <View
            style={[
              styles.productImageWrapper,
              isEgiftProduct ? styles.eGiftProductImageWrapper : {},
              isPackContent ? styles.productImageWrapperPackContent : {},
            ]}>
            {/* Add to Bag Desktop */}
            {showAddToBag && !isEgiftProduct && isShowAddToBag ? (
              <View style={styles.overlayAddToBag}>
                <Suspense fallback={<></>}>
                  <AddToBagButton
                    showAddToBag={showAddToBag}
                    addToBagHandler={addToBagHandler}
                    addToBagBabyRegistryHandler={addToBagBabyRegistryHandler}
                    isInStock={isInStock}
                    isEgiftProduct={isEgiftProduct}
                    isProductBabyRegistry={isProductBabyRegistry}
                    isPackContent={isPackContent}
                    isFlashSaleStillAvailable={isFlashSaleStillAvailable}
                    isFlashSaleProduct={isFlashSaleProduct}
                  />
                </Suspense>
              </View>
            ) : null}
            {/* End Add to Bag Desktop */}

            <Image
              source={{ uri: productImageSource }}
              style={[
                styles.productImage,
                productImageStyle,
                isPackContent ? styles.productImagePackContent : {},
                isEgiftProduct ? styles.productImageEgift : {},
                { opacity },
              ]}
              defaultSource={defaultImage}
              resizeMode="contain"
            />

            {/* Label Product Grid */}
            {showDiscount && (
              <>
                {(productData.is_sale || productData.discount_range) && (
                  <View
                    style={[
                      styles.productImageLabelTopLeftWrapper,
                      { opacity },
                    ]}>
                    <View
                      style={[
                        styles.labelTopLeft,
                        styles.labelTopLeftSale,
                        isNewProduct
                          ? styles.labelTopLeftSaleWithNewActive
                          : {},
                      ]}>
                      <Text
                        style={[
                          styles.labelTopLeftText,
                          styles.labelTopLeftSaleText,
                        ]}>
                        {productData?.default_combination?.deduction_type &&
                        productData?.default_combination?.deduction_percentage
                          ? `${productData?.default_combination?.deduction_percentage}%`
                          : 'SALE'}
                      </Text>
                    </View>
                  </View>
                )}

                
              </>
            )}

            {isExclusiveDealsProduct ? (
              <View
                style={[
                  styles.productImageLabelWrapper,
                  { opacity },
                  isFlashSaleProduct || showDiscount
                    ? styles.productImageLabelBetween
                    : {},
                ]}>
                <View style={[styles.label, styles.labelExclusiveDeals]}>
                  <Text
                    style={[styles.labelText, styles.labelTextExclusiveDeals]}>
                    Exclusive Deals
                  </Text>
                </View>
              </View>
            ) : (
              <>
                {productData.is_online ? (
                  <View
                    style={[
                      styles.productImageLabelWrapper,
                      { opacity },
                      isFlashSaleProduct || showDiscount
                        ? styles.productImageLabelBetween
                        : {},
                    ]}>
                    <View style={[styles.label, styles.labelBuyOneGetOne]}>
                      <Text style={styles.labelText}>Online Only</Text>
                    </View>
                  </View>
                ) : null}

                {isExclusiveProduct ? (
                  <View
                    style={[
                      styles.productImageLabelWrapper,
                      { opacity },
                      isFlashSaleProduct || showDiscount
                        ? styles.productImageLabelBetween
                        : {},
                    ]}>
                    <View style={[styles.label, styles.labelExclusive]}>
                      <Text style={styles.labelText}>Exclusive</Text>
                    </View>
                  </View>
                ) : null}

                {isBuyOneGetOneProduct ? (
                  <View
                    style={[
                      styles.productImageLabelWrapper,
                      { opacity },
                      isFlashSaleProduct || showDiscount
                        ? styles.productImageLabelBetween
                        : {},
                    ]}>
                    <View style={[styles.label, styles.labelBuyOneGetOne]}>
                      <Text style={styles.labelText}>Buy 1 get 1</Text>
                    </View>
                  </View>
                ) : null}

                <>
                  {isBundleProduct ? (
                    <View
                      style={[
                        styles.productImageLabelWrapper,
                        { opacity },
                        isFlashSaleProduct || showDiscount
                          ? styles.productImageLabelBetween
                          : {},
                      ]}>
                      <View style={[styles.label, styles.labelBundle]}>
                        <Text
                          style={[styles.labelText, styles.labelTextBundle]}>
                          Bundles
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {isExclusiveProduct && (
                    <View
                      style={[
                        styles.productImageLabelWrapper,
                        { opacity },
                        isFlashSaleProduct || showDiscount
                          ? styles.productImageLabelBetween
                          : {},
                      ]}>
                      <View style={[styles.label, styles.labelExclusive]}>
                        <Text style={styles.labelText}>Exclusive</Text>
                      </View>
                    </View>
                  )}
                </>
              </>
            )}

            {isWeb && !isInStock && (
              <View style={styles.productImageLabelBottomLeft}>
                <View
                  style={[
                    styles.label,
                    styles.labelOutOfStock,
                    !isFlashSaleStillAvailable && isFlashSaleProduct
                      ? styles.labelFlashSale
                      : {},
                  ]}>
                  <Text style={[styles.labelText, styles.labelOutOfStockText]}>
                    {!isFlashSaleStillAvailable && isFlashSaleProduct
                      ? 'Flash Sale Habis'
                      : 'Stok Habis'}
                  </Text>
                </View>
              </View>
            )}

            {!isWeb && !isInStock && (
              <View style={styles.productImageLabelCenter}>
                <View
                  style={[
                    styles.label,
                    styles.labelOutOfStock,
                    !isFlashSaleStillAvailable && isFlashSaleProduct
                      ? styles.labelFlashSale
                      : {},
                  ]}>
                  <Text style={[styles.labelText, styles.labelOutOfStockText]}>
                    {!isFlashSaleStillAvailable && isFlashSaleProduct
                      ? 'Flash Sale Habis'
                      : 'Stok Habis'}
                  </Text>
                </View>
              </View>
            )}

            {/* End Label Product Grid */}
          </View>
          {!hasCombinations ? (
            <View style={styles.hasNotCombinations}></View>
          ) : null}
          <View
            style={[
              styles.infoProductContainer,
              isSpecialPrice ? { paddingBottom: 0 } : {},
            ]}>
            {/* COMBINATIONS */}
            {combinations.data.length > 0 ? (
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.combinationContainer}
                showsHorizontalScrollIndicator={false}>
                {combinations.data.map((combination, key) => (
                  <CombinationType
                    combination={combination}
                    key={`combinationType-${key}`}
                  />
                ))}
                {moreCombinationNumberInfo > 0 &&
                !combinations.isMoreCombinations ? (
                  <Text style={styles.combinationMoreText}>
                    +{moreCombinationNumberInfo}
                  </Text>
                ) : null}
              </ScrollView>
            ) : null}

            {/* END COMBINATIONS */}

            {/* ADD TO BAG MOBILE */}
            {!isWeb &&
                (isProductBabyRegistry ? isFriendsView && isInStock : true) && isShowAddToBag ? (
                <Suspense fallback={<></>}>
                    <AddToBagButton
                    showAddToBag={showAddToBag}
                    addToBagHandler={addToBagHandler}
                    addToBagBabyRegistryHandler={addToBagBabyRegistryHandler}
                    isInStock={isInStock}
                    isEgiftProduct={isEgiftProduct}
                    isProductBabyRegistry={isProductBabyRegistry}
                    isPackContent={isPackContent}
                    isFlashSaleStillAvailable={isFlashSaleStillAvailable}
                    isFlashSaleProduct={isFlashSaleProduct}
                    />
                </Suspense>
                ) : null
            }
            {/* END ADD TO BAG MOBILE */}

            <Text
              style={styles.productBrand}
              numberOfLines={2}
              ellipsizeMode="tail">
              {brandName}
            </Text>

            <Text
              style={[
                styles.productName,
                maxWidth ? { width: maxWidth } : {},
                isInSlider && maxWidth
                  ? {
                      width: isWeb ? maxWidth - 30 : 150,
                    }
                  : {},
              ]}
              numberOfLines={2}
              ellipsizeMode="tail">
              <>
                {isPreOrderProduct && isInStock ? (
                  <View style={styles.preorderCard}>
                    <Text style={styles.preorderCardText}>Pre-Order</Text>
                  </View>
                ) : null}
              </>
              {productData.name}
            </Text>
            {isSpecialPrice && (
              <>
                <View>
                  <Text style={styles.specialPriceTitle}>
                    {isWeb ? 'Dapatkan hanya dengan' : 'Harga spesial'}
                  </Text>
                  <Text style={styles.priceHeading}>
                    {formatPrice(productData.price_after_discount_range)}
                  </Text>

                  <Suspense fallback={<></>}>
                    <ProductGridRating
                      rating={rating}
                      starWidth={13}
                      starHeight={12}
                      count={count}
                    />
                  </Suspense>
                </View>

                <Suspense fallback={<></>}>
                  <ReasonCard type="categories" productData={productData} />
                  <ReasonCard type="brands" productData={productData} />
                  <ReasonCard type="products" productData={productData} />
                </Suspense>
              </>
            )}
            {!isSpecialPrice && (
              <>
                {!productData.price_after_discount_range ? (
                  <Text style={styles.productPriceNormal}>
                    {formatPrice(productData.price_range)}
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.productPriceAfterDiscount,
                      isFlashSaleProduct
                        ? styles.productPriceAfterDiscountFlashSale
                        : {},
                    ]}>
                    {isFlashSaleProduct && productData?.default_combination
                      ? currencyFormat(
                          productData.default_combination?.price_after_discount,
                        )
                      : formatPrice(productData.price_after_discount_range)}
                    {!isMultipleCombinationOnSale ? (
                      <Text
                        style={[
                          styles.productPriceBeforeDiscount,
                          isFlashSaleProduct
                            ? styles.productPriceBeforeDiscountFlashSale
                            : {},
                        ]}>
                        {formatPrice(productData.price_range)}
                      </Text>
                    ) : null}
                  </Text>
                )}

                {showRatingStar && (
                  <Suspense fallback={<></>}>
                    <ProductGridRating
                      rating={rating}
                      starWidth={13}
                      starHeight={12}
                      count={count}
                    />
                  </Suspense>
                )}

                {isProductBabyRegistry ? (
                  <View style={styles.productRegistryInfo}>
                    <Text style={styles.productRegistryInfoText}>
                      Desired ({quantity}) · Purchased (
                      {productData.total_purchased})
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          </View>
      </Pressable>

      {isFlashSaleProduct ? (
        <View style={[styles.multiProgressBarContainer, { opacity }]}>
          {(isFlashSaleStarting || isFlashSaleEnded) && !isUpComingFlashSale && (
            <Pressable
              style={[
                styles.productActionInfoWrapper,
                isShowRating ? { alignItems: 'flex-start' } : {},
              ]}>
              {isShowRating ? (
                <>
                  <View
                    style={[
                      styles.multiProgressBar,
                      isHomeBannerProduct ? { width: 135 } : {},
                    ]}>
                    <View
                      style={[
                        styles.multiProgressBarColumn,
                        styles.multiProgressBarLeft,
                        isFlashSaleStillAvailable && isInStock
                          ? {
                              backgroundColor: '#49C14A',
                            }
                          : !isInStock &&
                            !(!isFlashSaleStillAvailable && isFlashSaleProduct)
                          ? {
                              backgroundColor: '#E4E3E6',
                            }
                          : {},
                        { width: progressWidth.total + '%' },
                        Number(progressWidth.total) === 100
                          ? {
                              borderTopRightRadius: 5,
                              borderBottomRightRadius: 5,
                            }
                          : {},
                      ]}></View>
                    <View
                      style={[
                        styles.multiProgressBarColumn,
                        styles.multiProgressBarRight,
                        { width: progressWidth.sold + '%' },
                      ]}></View>
                  </View>
                  <Suspense fallback={<></>}>
                    <FlashSaleText
                      dataFlashSaleSelected={dataFlashSaleSelected}
                      statusFlashSale={statusFlashSale}
                      isShowRating={isShowRating}
                      quotaFlashSale={quotaFlashSale}
                      isFlashSaleAlmostEmpty={isFlashSaleAlmostEmpty}
                    />
                  </Suspense>
                </>
              ) : (
                <View
                  style={[styles.productAction, styles.productActionOrange]}>
                  {!isInStock ? (
                    <Text style={styles.productActionAdd}>Out Of Stock</Text>
                  ) : (
                    <Suspense fallback={<></>}>
                      <FlashSaleText
                        dataFlashSaleSelected={dataFlashSaleSelected}
                        statusFlashSale={statusFlashSale}
                        isShowRating={isShowRating}
                        quotaFlashSale={quotaFlashSale}
                        isFlashSaleAlmostEmpty={isFlashSaleAlmostEmpty}
                      />
                    </Suspense>
                  )}
                </View>
              )}
            </Pressable>
          )}
        </View>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
    combinationMoreText: {
      fontFamily: 'satoshi-medium',
      fontSize: 10,
      lineHeight: 10,
      color: '#78707E',
    },
    combinationContainer: {
      alignItems: 'center',
      marginBottom: 8,
    },
    // label "Center"
    label: {
      width: 78,
      height: 22,
      borderTopRightRadius: 6,
      borderBottomLeftRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelText: {
      fontSize: 10,
      lineHeight: 14,
      fontFamily: 'satoshi-bold',
      textAlign: 'center',
      color: '#25182E',
      ...(screenWidth <= 365 && {
        fontSize: 8,
        lineHeight: 12,
      }),
    },
    labelTextBundle: {
      color: '#FFFFFF',
    },
    labelOutOfStock: {
      height: 26,
      letterSpacing: 0.3,
      opacity: 0.5,
      backgroundColor: '#100915',
    },
    labelExclusive: {
      backgroundColor: '#FFE680',
    },
    labelBundle: {
      backgroundColor: '#6A83CB',
      paddingHorizontal: 12,
    },
    labelBundleWithExclusiveActive: {
      borderTopRightRadius: 0,
      width: 'auto',
      paddingHorizontal: 6,
    },
    labelExclusiveWithBundleActive: {
      borderBottomLeftRadius: 0,
      width: 'auto',
      paddingHorizontal: 6,
    },
    labelExclusiveDeals: {
      backgroundColor: '#F05868',
      width: 85,
    },
    labelBuyOneGetOne: {
      backgroundColor: '#FFE680',
    },
    // label text "center"
    labelOutOfStockText: {
      fontSize: 12,
      lineHeight: 18,
      color: '#FFFFFF',
    },
    labelTextExclusiveDeals: {
      color: '#FFFFFF',
    },
    // label "top left"
    labelTopLeft: {
      width: 42,
      height: isWeb ? 22 : 20,
      borderTopLeftRadius: 6,
      borderBottomRightRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      ...(screenWidth <= 365 && {
        width: 38,
        height: 18,
      }),
    },
    labelTopLeftNew: {
      backgroundColor: '#EAD1FF',
    },
    labelTopLeftNewWithSaleActive: {
      top: 20,
      borderTopLeftRadius: 0,
    },
    labelTopLeftSaleWithNewActive: {
      borderBottomRightRadius: 0,
    },
    labelTopLeftSale: {
      backgroundColor: '#F05868',
    },
    // label text "top left"
    labelTopLeftText: {
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'satoshi-bold',
      textAlign: 'center',
      ...(isMobileWeb && {
        fontSize: 10,
        lineHeight: 16,
      }),
      ...(screenWidth <= 365 && {
        fontSize: 8,
        lineHeight: 12,
      }),
    },
    labelTopLeftNewText: {
      color: '#100915',
    },
    labelTopLeftSaleText: {
      color: '#FFFFFF',
      fontSize: 10,
    },
    productGridItem: {
      width: '100%',
    },
    productGridItemRegistry: {
      paddingBottom: 30,
    },
    preorderCard: {
      width: 'auto',
      paddingHorizontal: 4,
      paddingVertical: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 6,
      borderBottomRightRadius: 6,
      backgroundColor: '#FF9195',
    },
    preorderCardText: {
      fontWeight: '700',
      fontSize: 10,
      lineHeight: 12,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    productImageWrapper: {
      width: '100%',
    },
    eGiftProductImageWrapper: {
      // marginTop: isWeb ? 0 : 10,
    },
    productImageLabelBottomLeft: {
      alignSelf: 'center',
      position: 'absolute',
      top: 100,
      bottom: 0,
      zIndex: 999,
    },
    productImageWrapperPackContent: {
      height: 'auto',
    },
    productImage: {
      height: 206,
      width: 206,
      maxWidth: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    productImageEgift: {
      width: '100%',
      resizeMode: 'contain',
    },
    productImagePackContent: {
      marginTop: 0,
      width: 100,
      height: 100,
    },
    productBrand: {
      color: '#231f20',
      fontSize: 12,
      fontFamily: 'satoshi-black',
      lineHeight: 14,
      letterSpacing: 1.25,
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    productName: {
      color: '#25182E',
      fontSize: 14,
      fontFamily: 'satoshi-medium',
      lineHeight: 20,
      marginBottom: 4,
    },
    productPriceBeforeDiscount: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      color: '#78707E',
      fontSize: isWeb ? 12 : 10,
      lineHeight: isWeb ? 20 : 16,
      textDecorationLine: 'line-through',
      fontFamily: 'satoshi-medium',
    },
    productPriceBeforeDiscountFlashSale: {
      fontSize: 10,
      lineHeight: 16,
      marginLeft: 0,
    },
    productPriceAfterDiscount: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      color: '#F05868',
      fontSize: isWeb ? 14 : 12,
      lineHeight: isWeb ? 20 : 18,
      marginBottom: 4,
      fontFamily: 'satoshi-black',
    },
    productPriceAfterDiscountFlashSale: {
      fontSize: 12,
      lineHeight: 18,
      color: '#F05868',
    },
    productPriceNormal: {
      color: '#25182E',
      fontSize: isWeb ? 14 : 12,
      lineHeight: isWeb ? 20 : 18,
      marginBottom: 4,
      fontFamily: 'satoshi-black',
    },
    wishlistIcon: {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      ...(isWeb && { cursor: 'pointer' }),
    },
    productImageLabelWrapper: {
      width: '100%',
      position: 'absolute',
      left: 2,
      top: 0,
      right: 0,
      alignItems: 'center',
    },
    productImageLabelWrapperWithBundleAndExclusiveActive: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    productImageLabelTopLeftWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    specialPriceTitle: {
      color: '#F05868',
      fontSize: 12,
      fontFamily: 'satoshi-medium',
      lineHeight: 14,
      marginBottom: 4,
    },
    priceHeading: {
      color: '#000000',
      fontSize: 11,
      fontFamily: 'satoshi-black',
      lineHeight: 14,
    },
    wishlistSize: {
      width: 20,
      height: 20,
    },
    infoProductContainer: {
      padding: 8,
      width: '100%',
      display: 'flex',
    },
    productRegistryInfo: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginBottom: 12,
      marginTop: 12,
    },
    productRegistryInfoText: {
      fontFamily: 'satoshi-medium',
      color: '#6F6F6F',
      fontSize: 12,
      lineHeight: 15,
    },
    productInfoCountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 8,
      zIndex: 11,
    },
    // flash sale
    multiProgressBarContainer: {
      position: 'absolute',
      left: 8,
      bottom: 8,
      width: '100%',
    },
    multiProgressBar: {
      position: 'relative',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 4,
      width: '100%',
      maxWidth: 160,
    },
    multiProgressBarColumn: {
      width: '0%',
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      height: 8,
      maxWidth: screenWidth <= 340 ? '100%' : 160,
    },
    multiProgressBarLeft: {
      borderRadius: 5,
      backgroundColor: '#FCD7DB',
    },
    multiProgressBarRight: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 101,
      backgroundColor: '#FF657E',
      borderRadius: 5,
    },
    iconFlashSalePrice: {
      height: 16,
      width: 12,
    },
    circleNotSelect: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#A775C8',
    },
    hasNotCombinations: {
      height: 30,
      width: '100%',
      display: 'flex',
    },
    marginBetweenPrice: {
      width: 4,
    },
    labelFlashSale: {
      width: 115,
    },
    productImageLabelBetween: {
      left: 12,
    },
  });
export default React.memo(Product);
