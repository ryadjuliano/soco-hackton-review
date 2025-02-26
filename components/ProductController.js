import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { imageCdn } from '@/components/helpers';
import { isWeb } from '@/components/screens';
import ProductUtils from '@/components/utils/product';
import StringUtils from '@/components/utils/string';
import RegistryUtils from '@/components/utils/registry';
const $size = require('lodash.size');
const $forEach = require('lodash.foreach');
const ProductController = (props) => {
  const {
    productData,
    productContainerStyle,
    productImageStyle,
    verticalMode,
    isSpecialPrice,
    isPackContent, // Boolean value true and false this value using in product detail -> PackContent component
    maxWidth = 0,
    isInSlider = false,
    isNoPaddingHorizontal = false,
    customWidth = 0,
    useCenter = false,
    babyRegistry,
    isFriendsView,
    dataFlashSaleSelected = {},
    isShowRating,
    isHomeBannerProduct,
    momsChecklist,
  } = props;

  const isProductBabyRegistry = $size(babyRegistry);
  const UtilsRegistry = new RegistryUtils(babyRegistry);
  const UtilsProduct = new ProductUtils(productData || {});
  const stockDefaultCombination = productData?.default_combinatio?.stock;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation =  useNavigation();
  const [showAddToBag, setShowAddToBag] = useState(false);
  const [quantity, setQuantity] = useState(
    productData?.qty ? productData?.qty : 1,
  );
  const isFlashSaleProduct = $size(dataFlashSaleSelected) ? true : false;
  const isFlashSaleEnded = dataFlashSaleSelected.is_ended;
  const isFlashSaleStarting = dataFlashSaleSelected.is_live ? true : false;
  const isUpComingFlashSale =
    dataFlashSaleSelected.is_coming_soon ||
    (!isFlashSaleStarting && !isFlashSaleEnded);
  const [statusFlashSale, setStatusFlashSale] = useState(null);
  const isEditProfile = false;
  const isLoggedIn = false;
  const wishlistSyncData = [];
  const productParam = UtilsProduct.getProductUriSchemes(productData);
  const getImage = () => {
    if (isProductBabyRegistry) {
      const coverImageUrl = UtilsRegistry.getImage(productData.combination_id);
      return coverImageUrl;
    }
    const imageDefault =
      productData.images &&
      Array.isArray(productData.images) &&
      productData.images.length;
    const defaultImageCombination =
      productData.default_combination &&
      productData.default_combination.images &&
      Array.isArray(productData.default_combination.images) &&
      productData.default_combination.images.length;
    if (imageDefault || defaultImageCombination) {
      let imageCover;
      if (defaultImageCombination) {
        const imageCoverLilla = productData.default_combination.images.find(
          (res) => res.is_lilla_cover,
        );
        if (imageCoverLilla) {
          imageCover = imageCoverLilla.url;
        }
      }
      if (imageDefault) {
        const imageCoverLilla = productData.images.find(
          (res) => res.is_lilla_cover,
        );
        if (imageCoverLilla) {
          imageCover = imageCoverLilla.url;
        }
      }
      if (!imageCover && imageDefault) {
        imageCover = productData.images[0].url;
      }
      if (!imageCover && defaultImageCombination) {
        imageCover = productData.default_combination.images[0].url;
      }
      return imageCover;
    }
  };
  const coverImageUrl = getImage();
  const coverImage = coverImageUrl
    ? imageCdn({ config: isWeb ? 'w=448' : 'w=366', image: coverImageUrl })
    : null;
  const reviewStats = productData.review_stats
    ? productData.review_stats
    : null;
  const brandName = productData.brand ? productData.brand.name : '';
  const productImageSource = coverImage ? coverImage : null;
  const rating = reviewStats ? reviewStats.average_rating : 0;
  const count = reviewStats ? reviewStats.total_reviews : 0;
  const showRatingStar = UtilsProduct.isShowReviewsOrRatings();
  const isInStock = isPackContent
    ? !productData.is_out_of_stock_lilla
    : UtilsProduct.isInStock();
  const isExclusiveDealsProduct = UtilsProduct.isExclusiveDealsProduct();
  const isEgiftProduct = UtilsProduct.isEgiftProduct();
  const isBundleProduct = UtilsProduct.isBundleProduct();
  const isBuyOneGetOneProduct = UtilsProduct.isBuyOneGetOneProduct();
  const isExclusiveProduct = UtilsProduct.isExclusiveProduct();
  const isPreOrderProduct = UtilsProduct.isPreOrderProduct();
  const isNewProduct = UtilsProduct.isNewProduct();
  const opacity = isInStock ? 1 : 0.5;
  const checkCombinationAttribute =
    checkIfEachCombinationsHasOnlyOneAttribute();
  const combinations =
    $size(checkCombinationAttribute.data) > 1
      ? checkCombinationAttribute
      : getListCombinations();
  const hasCombinations = $size(combinations.data) > 0 ? true : false;
  const showDiscount = Boolean(
    isNewProduct || productData.is_sale || productData.discount_range,
  );
  const moreCombinationNumberInfo = isProductBabyRegistry
    ? 0
    : `${$size(productData.combinations) - $size(combinations)}`;
  const isShowButtonDeleteProductRegistry =
    !isFriendsView && isEditProfile && isProductBabyRegistry;
  const isMultipleCombinationOnSale = showDiscount
    ? /(?:rp.*?rp)/gi.test(productData.price_after_discount_range)
    : false;

  // product flash sale
  const quotaFlashSale = defineFlashSaleQuota();

  if (!statusFlashSale && isFlashSaleProduct) {
    setStatusFlashSale(checkStatusFlashSale());
  }
  const isFlashSaleAlmostEmpty =
    quotaFlashSale.total_quota - quotaFlashSale.sold_quota <= 5 ? true : false;
  const progressWidth = getFlashSaleProgressWidth();
  const isFlashSaleStillAvailable =
    quotaFlashSale.sold_quota === 0 && quotaFlashSale.total_quota > 0;
  let wishlisted = false;
  const wishlistSource = (() => {
    if (productData.default_combination) {
      if (wishlistSyncData[productData.default_combination['_id']]) {
        wishlisted =
          wishlistSyncData[productData.default_combination['_id']].is_wishlist;
      } else {
        wishlisted = productData.default_combination.is_wishlist;
      }
    }
    return isLoggedIn && wishlisted
      ? require('@/assets/images/wishlist-icon-active-v2.png')
      : require('@/assets/images/wishlist-icon-v2.png');
  })();


  const addToBagHandler = (e) => {
    
  };

  const redirectToProductDetail = () => {
    if (showAddToBag) {
      onShowAddToBag(false);
    }

    navigation.navigate('ProductDetailScreen', {
      id: productData.id,
      name: productData.name,
      slug: productData.slug,
      ...UtilsProduct.getProductUriSchemes(productData),
    });
  };

  const wishlistHandler = async () => {
  };

  const addToBagBabyRegistryHandler = (e) => {
  };


  const onShowAddToBag = (value) => {
    let updateValue;

    if (isProductBabyRegistry) {
      if (value && isFriendsView && isInStock) {
        updateValue = value;
      } else if (value && !isInStock) {
        updateValue = value;
      }
    } else {
      updateValue = value;
    }
    if (isWeb) {
      setShowAddToBag(updateValue);
    }
  };

  const deleteProductHandler = async () => {
  };

  function getListCombinations() {
    const combinations = { data: [], isMoreCombinations: false };
    let productCombinations = productData.combinations;

    if (isProductBabyRegistry) {
      const combinationPicked = UtilsRegistry.getProduct(
        productData.combination_id,
      );
      productCombinations = [combinationPicked];
    }

    if ($size(productCombinations) && !isEgiftProduct) {
      let countAdded = 0;
      $forEach(productCombinations, (combination) => {
        const attributesLength = $size(combination.attributes);
        if (attributesLength > 0) {
          $forEach(combination.attributes, (attribute, attributeType) => {
            if (attributeType.toLowerCase() !== 'non_specify') {
              // size || variant max 2, shade max 3
              const maxShowingAttribute = ['size', 'variant'].includes(
                attributeType.toLowerCase(),
              )
                ? 2
                : 3;
              if (countAdded < maxShowingAttribute && attributesLength === 1) {
                combinations.data.push({
                  ...attribute,
                  name: StringUtils.ucWordsAttributeName(attribute.name),
                  type: attributeType.toLowerCase(),
                });
              }

              if (attributesLength > 1) {
                combinations.isMoreCombinations = true;
                combinations.data.push({
                  name: 'More options available',
                  type: 'variant', //  for conditional statment in ui
                });
                return false;
              }
            }
          });
          countAdded++;
        }

        if (attributesLength > 1) {
          return false;
        }
      });
      return combinations;
    }
    return combinations;
  }

  checkIfEachCombinationsHasOnlyOneAttribute();

  function checkIfEachCombinationsHasOnlyOneAttribute() {
    const combinations = { data: [], isMoreCombinations: false };
    let productCombinations = productData.combinations;

    if (isProductBabyRegistry) {
      const combinationPicked = UtilsRegistry.getProduct(
        productData.combination_id,
      );
      productCombinations = [combinationPicked];
    }

    if ($size(productCombinations) && !isEgiftProduct) {
      $forEach(productCombinations, (combination) => {
        const attributesLength = $size(combination.attributes);
        if (attributesLength > 0) {
          if (
            $size(productCombinations) === 1 &&
            $size(combination.attributes) === 2
          ) {
            $forEach(combination.attributes, (attribute, attributeType) => {
              if (attributeType.toLowerCase() !== 'non_specify') {
                combinations.data.push({
                  ...attribute,
                  name: StringUtils.ucWordsAttributeName(attribute.name),
                  type: attributeType.toLowerCase(),
                });
              }
            });
          }
        }
      });
      return combinations;
    }
    return combinations;
  }

  function addProductCountHandler(type) {
   
  }

  function defineFlashSaleQuota() {
    let sold_quota = 0;
    let total_quota = 0;
    if (productData.selected_variant) {
      if (productData.default_combination.sold_quota) {
        sold_quota = productData.default_combination.sold_quota;
      }
      if (productData.default_combination.total_quota) {
        total_quota = productData.default_combination.total_quota;
      }
    } else {
      if (productData.sold_quota) {
        sold_quota = productData.sold_quota;
      }
      if (productData.total_quota) {
        total_quota = productData.total_quota;
      }
    }

    return {
      sold_quota: Number(sold_quota) > 0 ? Number(sold_quota) : 0,
      total_quota: Number(total_quota),
    };
  }

  function checkStatusFlashSale() {
    const sold_quota = quotaFlashSale.sold_quota;
    const total_quota = quotaFlashSale.total_quota;
    if (productData.selected_variant) {
      if (
        !productData.default_combination.stock ||
        productData.default_combination.is_out_of_stock_lulla
      ) {
        return 'oos';
      }
      if ((sold_quota && sold_quota >= total_quota) || isFlashSaleEnded) {
        return 'fss';
      }
      return 'available';
    } else {
      const inStock = productData.combinations.filter(
        (c) => c.stock > 0 && !c.is_out_of_stock_lulla,
      );
      const isStockCombination =
        productData.pack_detail && productData.pack_detail.length
          ? true
          : Boolean(inStock.length);
      if (
        !productData.is_in_stock_original ||
        productData.is_out_of_stock_lulla ||
        !isStockCombination
      ) {
        return 'oos';
      }
      if (
        (productData.is_in_stock_original && !productData.is_in_stock) ||
        isFlashSaleEnded
      ) {
        return 'fss';
      }
      if (
        (productData.is_in_stock_original && !productData.is_in_stock) ||
        sold_quota >= total_quota ||
        isFlashSaleEnded
      ) {
        return 'fss';
      }
      return 'available';
    }
  }

  function getFlashSaleProgressWidth() {
    let sold = Math.floor(
      ((quotaFlashSale.total_quota - quotaFlashSale.sold_quota) * 100) /
        quotaFlashSale.total_quota,
    );
    sold =
      sold > 100 || statusFlashSale === 'oos' || statusFlashSale === 'fss'
        ? 100
        : 100 - sold;
    const total = 100;

    if (sold > 0) {
      sold = total - sold;
    }

    return {
      sold,
      total,
    };
  }

  function toggleCheckedProduct() {
    //momsChecklist?.typeOrigin only have value momChecklistProducts
    if (momsChecklist?.typeOrigin === 'momChecklistProducts') {
      momsChecklist?.handleCheklist(
        `${momsChecklist?.parentChecklist}-${productData.id}`,
      );
    } else {
      // untuk handle product dari momschecklist screen
      momsChecklist?.handleCheklist({
        checklistItemId: momsChecklist?.parentChecklist,
        productId: productData.id,
        isChecked: productData?.is_checked ? 1 : 0,
        subIdx: productData.subIdx,
        idx: productData.idx,
        productIndex: productData.productIndex,
      });
    }
  }

  return {
    productData,
    verticalMode,
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
    isBundleProduct,
    isBuyOneGetOneProduct,
    isInStock,
    isPreOrderProduct,
    isNewProduct,
    isExclusiveDealsProduct,
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
    isEditProfile,
    addProductCountHandler,
    stockDefaultCombination,
    deleteProductHandler,
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
    momsChecklist,
    toggleCheckedProduct,
    hasCombinations,
    isMultipleCombinationOnSale,
  };
};

export default ProductController;
