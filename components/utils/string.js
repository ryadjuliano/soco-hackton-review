const slugify = require('slugify');

class StringUtils {
  constructor() {}

  static ucWords(value) {
    const string = value.toLowerCase();
    return string.replace(
      /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
      function (s) {
        return s.toUpperCase();
      },
    );
  }

  static ucWordsAttributeName(value) {
    const newValue = this.ucWords(value);
    return newValue.replace(/\bMl\b/g, 'ml').replace(/\bGr\b/g, 'gr');
  }

  static toSnakeCase(value) {
    return value
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map((x) => x.toLowerCase())
      .join('_');
  }

  static capitalizeFormat(value) {
    return value
      .toLowerCase()
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  }

  static slugify(string, options = {}) {
    const defaultOptions = Object.assign(
      {
        lower: true,
      },
      options,
    );
    return slugify(string, defaultOptions);
  }

  static ucfirst(str) {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  }

  static getCategoryNameFromCategorySlug(slug) {
    if (!slug) {
      return null;
    }
    const regex = /-(.*)$/;
    const match = slug.match(regex);

    if (match) {
      return this.ucfirst(match[1].replace(/-/gi, ' '));
    }
  }
}

export default StringUtils;
