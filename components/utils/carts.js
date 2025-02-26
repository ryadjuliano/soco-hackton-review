import ProductUtils from './product';
import dayjs from 'dayjs';
class CartsUtils {
  constructor(carts) {
    this.carts = carts && typeof carts === 'object' ? carts : {};
  }

  getRulesConflictProductType(product, combination) {
    const isCartEmpty = this.isEmpty();
    let isConflictPreOrder;
    let isConflictPreOrderDeliveryDate;
    let isConflictBabyRegistry;
    // if cart is empty, will be zero conflict product type
    if (isCartEmpty) {
      isConflictPreOrder = false;
      isConflictBabyRegistry = false;
      isConflictPreOrderDeliveryDate = false;
    } else {
      const isNormalCarts = this.isNormalCarts();
      const isCartsContainsPreOrderProduct =
        this.isCartsContainsPreOrderProduct();
      const isCartsContainsBabyRegistryProduct =
        this.isCartsContainsBabyRegistryProduct();
      const isPreOrderProductCombinationAdded =
        ProductUtils.checkPreOrderProductCombination(combination);
      const isBabyRegistryProductAdded =
        ProductUtils.checkBabyRegistryProduct(product);
      const isNormalProductAdded =
        !isPreOrderProductCombinationAdded && !isBabyRegistryProductAdded;
      if (isNormalCarts) {
        if (isBabyRegistryProductAdded) {
          isConflictBabyRegistry = true;
        } else if (isPreOrderProductCombinationAdded) {
          isConflictPreOrder = true;
        }
      } else if (isCartsContainsBabyRegistryProduct) {
        if (isNormalProductAdded) {
          isConflictBabyRegistry = true;
        } else if (isBabyRegistryProductAdded) {
          isConflictBabyRegistry = true;
        } else if (isPreOrderProductCombinationAdded) {
          isConflictBabyRegistry = true;
        }
      } else if (isCartsContainsPreOrderProduct) {
        if (isNormalProductAdded) {
          isConflictPreOrder = true;
        } else if (isBabyRegistryProductAdded) {
          isConflictPreOrder = true;
        } else if (isPreOrderProductCombinationAdded) {
          const cartPreOrderDeliveryDate = this.getPreOrderDeliveryDate();
          const isSameDeliveryDate = dayjs(combination.delivery_date).isSame(
            dayjs(cartPreOrderDeliveryDate),
          );
          isConflictPreOrderDeliveryDate = !isSameDeliveryDate;
        }
      }
    }

    return {
      isConflictPreOrder,
      isConflictPreOrderDeliveryDate,
      isConflictBabyRegistry,
    };
  }

  getProducts() {
    return this.carts.products;
  }

  getPreOrderDeliveryDate() {
    let preOrderDeliveryDate = null;
    const products = this.getProducts();
    if (products && Array.isArray(products)) {
      products.forEach((product) => {
        if (product.is_pre_order) {
          preOrderDeliveryDate = product.delivery_date;
          return false;
        }
      });
    }
    return preOrderDeliveryDate;
  }

  isCartsContainsPreOrderProduct() {
    let isContainsPreOrder = false;
    const products = this.getProducts();

    if (products && Array.isArray(products)) {
      products.forEach((product) => {
        if (product.is_pre_order) {
          isContainsPreOrder = true;
          return false;
        }
      });
    }
    return isContainsPreOrder;
  }

  isCartsContainsBabyRegistryProduct() {
    return this.carts.is_baby_registry;
  }

  isEmpty() {
    return !(
      Object.keys(this.carts).length &&
      Array.isArray(this.carts.products) &&
      this.carts.products.length
    );
  }

  isNormalCarts() {
    // Normal Carts means not contains special product type, ex: egift, preorder, baby registry product, etc.
    return (
      !this.isCartsContainsBabyRegistryProduct() &&
      !this.isCartsContainsPreOrderProduct() &&
      !this.isCartsContainsEgiftProduct()
    );
  }

  isCartsContainsEgiftProduct() {
    let isContainsEgift = false;
    const products = this.getProducts();

    if (products && Array.isArray(products)) {
      products.forEach((product) => {
        if (product.classification === 'egift') {
          isContainsEgift = true;
          return false;
        }
      });
    }
    return isContainsEgift;
  }
}

export default CartsUtils;
