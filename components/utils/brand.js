class BrandUtils {
  constructor(brand) {
    this.brand = brand;
  }

  separateBrand() {
    const forMomsCatBrand = this.brand.filter((cat) => cat.is_for_moms);
    const forBabyKidsCatBrand = this.brand.filter(
      (cat) => cat.is_for_baby_kids,
    );

    const newCatBrand = [
      {
        name: 'For Moms',
        is_for_moms: true,
        children: [...forMomsCatBrand],
      },
      {
        name: 'For Baby & kids',
        is_for_baby_kids: true,
        children: [...forBabyKidsCatBrand],
      },
    ];

    return newCatBrand;
  }
}

export default BrandUtils;
