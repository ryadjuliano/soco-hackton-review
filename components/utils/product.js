import StringUtils from './string';
const $forEach = require('lodash.foreach');
class ProductUtils {
  constructor(product) {
    this.product = product && typeof product === 'object' ? product : {};
  }

  getAddToBagFlowStatus() {
    if (
      ['sellable_products', 'bundle_virtual', 'bundle_physical'].indexOf(
        this.product.classification,
      ) > -1
    ) {
      if (
        ['bundle_virtual', 'bundle_physical'].includes(
          this.product.classification,
        )
      ) {
        const findPackCombination =
          this.product.pack_detail &&
          this.product.pack_detail.findIndex(
            (res) => res.combinations && res.combinations.length > 1,
          );
        return !isNaN(findPackCombination) && findPackCombination > -1
          ? 'modal_multi_cart'
          : 'modal_single_cart';
      } else {
        return this.product.combinations && this.product.combinations.length > 1
          ? 'modal_multi_cart'
          : 'modal_single_cart';
      }
    } else {
      return 'product_detail';
    }
  }

  getClassification() {
    // each product has different classification
    return this.product.classification;
  }

  getCombinationName(combination) {
    const data = combination ? combination : this.product.default_combination;
    let groupAttribute = '';
    let attribute;
    if (Object.keys(data).length) {
      for (attribute in data.attributes) {
        if (data.attributes?.attribute && attribute !== 'non_specify') {
          groupAttribute += groupAttribute ? ' - ' : '';
          groupAttribute += `${attribute}: ${data.attributes[attribute].name}`;
        } else if (data.attributes && attribute !== 'non_specify') {
          // response from flash sale api
          groupAttribute += groupAttribute ? ' - ' : '';
          groupAttribute += `${data.attributes[attribute].name}`;
        }
      }
      return StringUtils.ucWordsAttributeName(groupAttribute);
    } else {
      return '';
    }
  }

  getImageDefaultProductGrid() {
    const imageDefault =
      this.product.images &&
      Array.isArray(this.product.images) &&
      this.product.images.length;
    const defaultImageCombination =
      this.product.default_combination &&
      this.product.default_combination.images &&
      Array.isArray(this.product.default_combination.images) &&
      this.product.default_combination.images.length;
    if (imageDefault || defaultImageCombination) {
      let imageCover;
      if (defaultImageCombination) {
        const imageCoverLilla = this.product.default_combination.images.find(
          (res) => res.is_lilla_cover,
        );
        if (imageCoverLilla) {
          imageCover = imageCoverLilla.url;
        }
      }
      if (imageDefault) {
        const imageCoverLilla = this.product.images.find(
          (res) => res.is_lilla_cover,
        );
        if (imageCoverLilla) {
          imageCover = imageCoverLilla.url;
        }
      }
      if (!imageCover && imageDefault) {
        imageCover = this.product.images[0].url;
      }
      if (!imageCover && defaultImageCombination) {
        imageCover = this.product.default_combination.images[0].url;
      }
      return imageCover;
    }
  }

  getProductSlug(value) {
    if (typeof value === 'string') {
      let s = value.toLowerCase();
      s = s
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '-')
        .replace(/^-+|-+$/g, '');
      return s;
    }

    return null;
  }

  getProductUriSchemes() {
    const categoryName =
      this.product.default_category && this.product.default_category.name
        ? this.getProductSlug(this.product.default_category.name)
        : 'product';
    let slug = this.product.slug || '';
    if (!slug) {
      slug = this.product.name
        ? this.getProductSlug(this.product.name)
        : 'default';
    }
    return { categoryName, slug };
  }

  isShowReviewsOrRatings() {
    return ['bundle_virtual', 'egift'].indexOf(this.product.classification) < 0;
  }

  isDiscount() {
    return Boolean(
      this.product.is_new ||
        this.product.is_sale ||
        this.product.discount_range,
    );
  }

  // check stock in product grid
  isInStock() {
    const isInStockLilla =
      this?.product?.is_in_stock && !this?.product?.is_out_of_stock_lilla
        ? true
        : false;
    return isInStockLilla;
  }

  // check stock in product detail
  isInStockCombination(defaultCombination) {
    const isInStock =
      this.product.is_in_stock && !this.product.is_out_of_stock_lilla
        ? true
        : false;
    if (!isInStock) {
      return true;
    }
    return defaultCombination.is_out_of_stock_lilla;
  }

  // check product classification / type in product grid
  isOutOfStockProductBundle() {
    return this.product.pack_detail.filter((pr) => pr.is_out_of_stock_lilla);
  }

  isExclusiveProduct() {
    return this.product.is_exclusive;
  }

  isNewProduct() {
    return this.product.is_new;
  }

  isBundleProduct() {
    return (
      this.product.classification === 'bundle_virtual' ||
      this.product.classification === 'bundle_physical'
    );
  }

  isEgiftProduct() {
    return this.product.classification === 'egift';
  }

  isPreOrderProduct() {
    return this.product.is_pre_order;
  }

  isBuyOneGetOneProduct() {
    return (
      this.product.default_combination &&
      this.product.default_combination.is_buy_one_get_one_free
    );
  }

  isBabyRegistryProduct() {
    return Boolean(this.product.baby_registry_id);
  }

  isExclusiveDealsProduct() {
    // if product contains is_exclusive_flag then show the label on product grid
    let isContainsExclusiveDeals = false;

    if (this.product?.default_combination?.is_exclusive_deals) {
      isContainsExclusiveDeals = true;
    }

    $forEach(this.product?.combinations, (combination) => {
      if (combination.is_exclusive_deals) {
        isContainsExclusiveDeals = true;
        return false;
      }
    });

    return this.product?.combinations?.length && isContainsExclusiveDeals;
  }

  // === //

  isAllPreOrderProducts() {
    return (
      this.product?.combinations?.length &&
      this.product?.combinations.every((product) => product.is_pre_order)
    );
  }

  // get key combination name
  getKeyCombinationName(combination) {
    const data = combination ? combination : this.product.default_combination;
    let groupAttribute = '';
    let attribute;
    if (Object.keys(data).length) {
      for (attribute in data.attributes) {
        if (data.attributes?.attribute && attribute !== 'non_specify') {
          groupAttribute += groupAttribute ? ' - ' : '';
          groupAttribute += `${attribute}`;
        } else if (data.attributes && attribute !== 'non_specify') {
          // response from flash sale api
          groupAttribute += groupAttribute ? ' - ' : '';
          groupAttribute += `${attribute}`;
        }
      }
      return groupAttribute;
    } else {
      return '';
    }
  }

  static checkPreOrderProductCombination(combination) {
    return combination.is_pre_order;
  }

  static checkBabyRegistryProduct(product) {
    return Boolean(product.baby_registry_id);
  }

  /*
   * Get detail data for cart who user wasn't logged in
   * @param {object}
   * @return {object}
   */
  getDetailDataNotLogin(productData) {
    const combinationId =
      productData.default_combination && productData.default_combination._id
        ? productData?.default_combination?._id
        : productData.combinations &&
          Array.isArray(productData.combinations) &&
          productData.combinations.length
        ? productData.combinations[0]._id
        : null;

    const selectedCombination = productData.combinations?.find(
      (comb) => comb._id === combinationId,
    );

    return {
      name: productData.name,
      brand: productData.brand.name,
      detail: {
        name: productData.name,
        brand: productData.brand.name,
        is_available: true,
        combination: selectedCombination,
        image: selectedCombination?.images?.find((img) => img.is_cover),
      },
      is_selected: true,
      combination: selectedCombination,
      price_range: productData.price_range,
      price_after_discount_range: productData.price_after_discount_range,
    };
  }
}

export default ProductUtils;
