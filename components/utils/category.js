const $get = require('lodash.get');

class CategoryUtils {
  constructor(category) {
    this.category = category;
    this.defaultFlagCategory = 'for-moms';
  }

  static defineLillaCategoryType(newLillaCategory) {
    if ('group_child' in newLillaCategory) {
      return 'group';
    }

    if ('grand_child_category' in newLillaCategory) {
      return 'group-child';
    }
    return 'group';
  }

  static defineTypeCategory = (newLillaCategory) => {
    const show_on_flag = $get(newLillaCategory, 'show_on[0]', 'for_moms');

    if (show_on_flag === 'for_moms') {
      return 'for-moms';
    } else {
      return 'for-baby-kids';
    }
  };

  getTypeOfCategory() {
    const categoryFlag = this?.category?.phase_tags[0].category_flag;
    if (categoryFlag) {
      return categoryFlag === 'For Moms' ? 'for-moms' : 'for-baby-kids';
    }
    if ('is_for_moms' in this.category || 'is_for_baby_kids' in this.category) {
      return this.category.is_for_moms ? 'for-moms' : 'for-baby-kids';
    }
    return this.defaultFlagCategory;
  }

  getLogo() {
    const flag = this.getTypeOfCategory();
    switch (flag) {
      case 'for-moms':
        if (this?.category?.logo_for_moms) {
          return this.category.logo_for_moms;
        }
        return this.category.lulla_logo;
      case 'for-baby-kids':
        if (this?.category?.logo_for_baby_kids) {
          return this.category.logo_for_baby_kids;
        }
        return this.category.lulla_logo;
      default:
        return this.category.lulla_logo;
    }
  }

  getName() {
    const flag = this.getTypeOfCategory();
    switch (flag) {
      case 'for-moms':
        if (this?.category?.name_for_moms) {
          return this.category.name_for_moms;
        }
        return this.category.name;
      case 'for-baby-kids':
        if (this?.category?.name_for_baby_kids) {
          return this.category.name_for_baby_kids;
        }
        return this.category.name;
      default:
        return this.category.name;
    }
  }

  getLogoV2() {
    const flagImageAvailable =
      this?.category?.logo_for_moms || this?.category?.logo_for_baby_kids;
    if (flagImageAvailable) {
      return (
        this?.category?.logo_for_moms || this?.category?.logo_for_baby_kids
      );
    }

    switch (this?.category?.category_flag) {
      case 'for_moms':
        if (this?.category?.category?.logo_for_moms) {
          return this.category?.category?.logo_for_moms;
        }
        if (this?.category?.logo_for_moms) {
          return this.category?.logo_for_moms;
        }
        return this.category?.category?.lulla_logo;
      case 'for_baby_kids':
        if (this?.category?.category?.logo_for_baby_kids) {
          return this.category?.category?.logo_for_baby_kids;
        }
        if (this?.category?.logo_for_baby_kids) {
          return this.category?.logo_for_baby_kids;
        }
        return this.category?.category?.lulla_logo;
      default:
        return this.category?.category?.lulla_logo;
    }
  }
}

export default CategoryUtils;
