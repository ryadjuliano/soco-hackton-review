import StringUtils from './string';

class RegistryUtils {
  constructor(registry) {
    this.registry = registry;
  }

  getImage(combination_id) {
    const { defaultProductImage } = global;
    let image = defaultProductImage;
    const product = this.getProduct(combination_id);
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length
    ) {
      image = product.images[0].url
        ? product.images[0].url
        : defaultProductImage;
    }
    return image;
  }

  getCombinationName(combination_id) {
    const product = this.getProduct(combination_id);
    let groupAttribute = '';
    let attribute;
    if (Object.keys(product).length && product.attributes) {
      for (attribute in product.attributes) {
        if (attribute !== 'non_specify') {
          groupAttribute += groupAttribute ? ' - ' : '';
          groupAttribute += `${attribute}: ${product.attributes[attribute].name}`;
        }
      }
      return StringUtils.ucWordsAttributeName(groupAttribute);
    } else {
      return '';
    }
  }

  getProduct(combination_id) {
    // filter combination based on combination_id
    const products = this.registry.detail;
    let productMatched = {};
    if (products && Array.isArray(products) && products.length) {
      products.forEach((product) => {
        if (product.combination_id === combination_id) {
          productMatched = product;
          return false;
        }
      });
    }
    const hasCombinations =
      productMatched &&
      Object.keys(productMatched).length &&
      productMatched.combinations &&
      Array.isArray(productMatched.combinations);
    if (hasCombinations) {
      productMatched.combinations.forEach((combination) => {
        if (combination['_id'] === combination_id) {
          productMatched = combination;
        }
      });
    }
    return productMatched;
  }

  getProducts() {
    return this.registry && this.registry.detail ? this.registry.detail : [];
  }

  getQuantity(combination_id) {
    const product = this.getProduct(combination_id);
    const qty =
      product && Object.keys(product).length
        ? product.qty
          ? product.qty
          : 0
        : 0;
    return Number(qty);
  }
  // has two type of product is origin product and registry product
  // origin_combination_id get from origin product
  hasCombinationInRegistry(origin_combination_id) {
    let isExist = false;
    const registryProducts = this.getProducts();
    registryProducts.forEach((productRegistry) => {
      if (productRegistry.combination_id === origin_combination_id) {
        isExist = true;
        return false;
      }
    });
    return isExist;
  }

  isFriendsView(routeParams, user_id) {
    const babyRegistryUserId =
      routeParams && routeParams.user_id ? routeParams.user_id : null;
    let isFriendsView =
      routeParams && routeParams.is_friends_view
        ? routeParams.is_friends_view
        : null;
    const friendBabyRegistry = babyRegistryUserId !== user_id;
    isFriendsView = friendBabyRegistry && isFriendsView;
    return isFriendsView;
  }
  // has two type of product is origin product and registry product
  isProductHasAddedToRegistry(origin_product) {
    const originCombinationLength = origin_product.combinations.length;
    const registryProducts = this.getProducts();
    const registryProductsHasAdded = []; // store the combination id
    registryProducts.forEach((productRegistry) => {
      // find the same product if getting, store the combination id
      if (productRegistry.id === origin_product.id) {
        registryProductsHasAdded.push(productRegistry.combination_id);
      }
    });

    // if all the combination added to registry the total is same
    if (originCombinationLength === registryProductsHasAdded.length) {
      return true;
    }
    return false;
  }

  isInStock(combination_id) {
    const product = this.getProduct(combination_id);
    const isInStockLilla = !product?.is_out_of_stock_lilla ? true : false;
    const isProductBundle = this.isPackContent(combination_id);

    if (isProductBundle) {
      return !product?.is_out_of_stock_lilla;
    }
    return isInStockLilla;
  }

  isPackContent(combination_id) {
    const product = this.getProduct(combination_id);
    const packDetail =
      Array.isArray(product.pack_detail) && product.pack_detail.length > 0
        ? true
        : false;
    if (packDetail) {
      return true;
    }
    return false;
  }

  validateShare() {
    const listProducts =
      this.registry && this.registry.detail ? this.registry.detail : [];

    const deliveryAddressIsNotFilled = !(
      'delivery_address' in this.registry && this.registry.delivery_address
    );

    const productIsNotAdded = listProducts.length ? false : true;

    if (deliveryAddressIsNotFilled && productIsNotAdded) {
      return {
        success: false,
        message: 'Set shipping, and add product',
      };
    } else if (deliveryAddressIsNotFilled) {
      return {
        message: 'Select shipping address first',
        success: false,
      };
    } else if (productIsNotAdded) {
      return {
        message: 'add product',
        success: false,
      };
    }
    return {
      success: true,
    };
  }
}

export default RegistryUtils;
