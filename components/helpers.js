/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import { Dimensions, Linking } from 'react-native';
import dayjs from 'dayjs';
// import idLocale from 'dayjs/locale/id';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Colors from '@/components/Colors';
// import { isNative } from '@/components/screens';
// import { motherPhaseList } from '~global/constants';
import React from 'react';
// import {
//   getUtmDataFromRoute,
//   getExistingUtm,
// } from '~global/sociolla.dm.lib/sociolla-analytics';
// import GoogleTagManager from '~global/sociolla.dm.lib/platform/google-tag-manager';
// import { logBannerCLick } from '~global/Analytics';
import UtilsURI from '@/components/utils/uri';
// import utc from 'dayjs/plugin/utc';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
// import advancedFormat from 'dayjs/plugin/advancedFormat';

// const duration = require('dayjs/plugin/duration');
// dayjs.extend(duration);
const $get = require('lodash.get');
import responseProducts from "@/data/product-recomendations.json"; 

export function getCenterValue(width) {
  const center = Dimensions.get('window').width / 2 - width / 2;
  return center;
}

export function getDetailProduct(id) {
  const response = responseProducts.data.filter((product) => product.id == id);
  const product =  Array.isArray(response) && response.length ? response[0] : {};
  return product;
}

export function renderNode(Component, content, defaultProps = {}) {
  if (content == null || content === false) {
    return null;
  }
  if (React.isValidElement(content)) {
    return content;
  }
  if (typeof content === 'function') {
    return content();
  }
  // Just in case
  if (content === true) {
    return <Component {...defaultProps} />;
  }
  if (typeof content === 'string') {
    if (content.length === 0) {
      return null;
    }
    return <Component {...defaultProps}>{content}</Component>;
  }
  if (typeof content === 'number') {
    return <Component {...defaultProps}>{content}</Component>;
  }
  return <Component {...defaultProps} {...content} />;
}

export function grid(data, number) {
  const totalColums = number;
  const newData = [];
  let list = [];
  data.map((item, key) => {
    list.push(item);
    if ((key + 1) % totalColums === 0 || data.length === key + 1) {
      newData.push(list);
      list = [];
    }
  });

  return newData;
}

export function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

// .......get combinations attributes name in array
export function getAttributesName(attributes) {
  const attribute = [];
  for (const key in attributes) {
    // eslint-disable-next-line no-prototype-builtins
    if (attributes.hasOwnProperty(key) && key !== 'non_specify') {
      attribute.push([key, attributes[key].name]);
    }
  }

  const rearrangedAttribute = attribute.sort((a, b) =>
    a[0] === 'size' ? 1 : b[0] === 'size' ? -1 : 0,
  );

  return rearrangedAttribute;
}

export function currencyFormat(number, isCapital = false) {
  return number || number === 0
    ? `${isCapital ? 'RP' : 'Rp'}${currency(number)}`
    : number;
}

export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

export function parseDate(
  date,
  pattern = 'DD MMMM YYYY',
  addTime = { days: 0 },
) {
  dayjs.locale(idLocale);
  if (!date) {
    return;
  }
  const newDate = dayjs(date).add(addTime.days, 'days').toDate();
  return dayjs(newDate).format(pattern);
}

export function formatDate(date, formatDate = 'DD MMMM YYYY') {
  if (!date) {
    return;
  }

  return dayjs(date).format(formatDate);
}

export function fullAgeFormat(year, month, day) {
  const years = year ? year + ' tahun' : '';
  const months = month ? month + ' bulan' : '';
  const days = day ? day + ' hari' : '';

  if (!years && !months) {
    return `${days}`;
  } else if (!years) {
    return `${months} ${days}`;
  } else {
    return `${years} ${months}`;
  }
}

export function parseDateCustom(date, pattern = 'DD MMMM YYYY') {
  dayjs.locale(idLocale);
  if (!date) {
    return;
  }
  const newDate = dayjs(date).toDate();
  return dayjs(newDate).format(pattern);
}

export function getPregnancyTimePeriod(date) {
  const startDate = dayjs(date).subtract(9, 'month').toDate();
  const weekNumber = dayjs().diff(startDate, 'week');
  const weekFromHPL = Math.abs(weekNumber);
  return weekFromHPL <= 41 ? weekFromHPL : 41;
}

export function differenceInDays(date) {
  const date1 = dayjs(date);
  const currentDate = dayjs().toDate();
  return Math.abs(date1.diff(currentDate, 'day'));
}

export function differenceInMin(date) {
  const date1 = dayjs(date);
  const currentDate = dayjs().toDate();
  return Math.abs(date1.diff(currentDate, 'minute'));
}
// boolean
export const isBetweenCurrentDate = (payload) => {
  const mapObject = Object.entries(payload).map((item) =>
    typeof item[1] == 'string' ? [item[0], parseISO(item[1])] : item,
  );
  const interval = Object.fromEntries(mapObject);
  return isWithinInterval(new Date(), interval);
};

export const formattedInterval = (interval, options = {}) =>
  formatDuration(intervalToDuration(interval), {
    ...options,
    locale: localedId,
  });

export const birthProgress = (date) => {
  const interval = {
    start: dayjs(date).subtract(9, 'month').toDate(),
    end: dayjs().toDate(),
  };

  const intervalDate = dayjs(interval.end).diff(interval.start, 'day');
  const duration = dayjs.duration(intervalDate, 'day');

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const percent = (months / 9) * 100;

  return {
    percent: percent > 100 ? '100%' : `${(months / 9) * 100}%`,
    duration: { years, months, days },
    formatted: fullAgeFormat(years, months, days),
  };
};

export const currentProgressDuration = ({ birth_date }) => {
  const weeks = 40;
  const end = typeof birth_date == 'string' ? parseISO(birth_date) : birth_date;
  return intervalToDuration({
    start: sub(end, { weeks }),
    end,
  });
};

export const todolistProgress = (data) => {
  if (data && Array.isArray(data)) {
    const achieved = data.filter(({ is_completed }) => is_completed).length;
    const goal = data.length;
    return {
      achieved,
      goal,
      percent: `${(achieved / goal) * 100}%`,
    };
  }

  return {
    achieved: null,
    goal: null,
    percent: null,
  };
};

export const calculateAge = (date) => {
  const diffDays =
    typeof date == 'string' ? dayjs().diff(dayjs(date).toDate(), 'day') : date;
  const intervalDuration = dayjs.duration(diffDays, 'day');

  //formattedInterval
  const year = intervalDuration.years()
    ? intervalDuration.years() + ' tahun'
    : '';
  const month = intervalDuration.months()
    ? intervalDuration.months() + ' bulan'
    : '';
  const day = intervalDuration.days()
    ? Math.abs(intervalDuration.days()) + ' hari'
    : '';
  return `${year} ${month} ${day}`;
};

export const getChildAge = (date) => {
  const diffDays =
    typeof date == 'string' ? dayjs().diff(dayjs(date).toDate(), 'day') : date;
  const intervalDuration = dayjs.duration(diffDays, 'day');

  //formattedInterval
  const year = intervalDuration.years() ? intervalDuration.years() : '';
  const month = intervalDuration.months() ? intervalDuration.months() : '';
  const day = intervalDuration.days() ? Math.abs(intervalDuration.days()) : '';
  return {
    year,
    month,
    day,
  };
};

export const handleShowPost = ({ _id }, navigation, method = 'navigate') => {
  navigation[method]('TransactionDetailScreen', {
    filter: {
      _id,
      post_type: 'help_page_article',
      created_from: 'sociolla',
    },
    fields: 'title app_version',
  });
};

export const scrollShadow = ({ shadow, navigation, insets }) => {
  const headerStyle = {
    shadowColor: Colors.black,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    height: 55 + insets.top,
  };
  if (shadow) {
    navigation.setOptions({ headerStyle });
  } else {
    navigation.setOptions({
      headerStyle: {
        ...headerStyle,
        shadowColor: 'transparent',
        elevation: 0,
      },
    });
  }
};

export const gap = ({ index, total, gap }) => {
  const firstChild = index + 1 == 1;
  const lastChild = index + 1 == total;
  return [
    { marginLeft: firstChild ? gap : gap / 2 },
    { marginRight: lastChild ? gap : gap / 2 },
  ];
};

export const getChildData = (date, isDetail = false) => {
  if (!date) {
    return '';
  }
  const dateValue = typeof date == 'string' ? dayjs(date).toDate() : date;

  const startDate = dayjs().diff(dateValue, 'day');
  const duration = dayjs.duration(startDate, 'day');

  const res = {
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
  };

  const years = res.years ? res.years + ' tahun' : '';
  const months = res.months ? res.months + ' bulan' : '';
  const days = res.months ? res.months + ' hari' : '';

  function age() {
    const result = {};
    result.fullAge = fullAgeFormat(res.years, res.months, res.days);
    result.age = `${years || months || days} `;

    return result;
  }

  function getMotherPhase() {
    if (dateValue > new Date()) {
      return 'expecting';
    }
    if (res.years) {
      return res.years < 3 ? 'toddler' : 'three_year_kid';
    } else {
      return 'breastfeeding';
    }
  }
  if (isDetail) {
    return {
      phase_of_mother: getMotherPhase(),
      ...age(),
      birthDate: formatDate(dateValue),
    };
  } else {
    return age();
  }
};

export function getRecentMotherPhase(list) {
  const res = list.reduce((a, b) =>
    new Date(a.date_of_birth) > new Date(b.date_of_birth) ? a : b,
  );
  return res.date_of_birth
    ? { ...res, ...getChildData(res.date_of_birth, true) }
    : res;
}

export const estimatedDate = (date) => dayjs(date).add(40, 'weeks').toDate();
export function currency(value) {
  value = parseInt(value);
  const res = (value || 0)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

  return res === '0' ? '0' : res;
}

{
  /*
   * @param {string} value - value cc/dc number to be formatted
   * @param {bool} newMask - if true, return new mask format (**** - **** - **** - 2354)
   * @return {string} - formatted cc/dc number if newMask false, (** - **** - 2354)
   */
}
export function ccMaskedFormat(value, newMask = false) {
  if (typeof value !== 'string') {
    return '';
  }

  const valueAfterFilter = value.split('-');
  const firstValue = valueAfterFilter[0];
  const secondValue = valueAfterFilter[1];

  if (newMask) {
    const lastFourDigits = secondValue.slice(-4);
    return `**** - **** - **** - ${lastFourDigits}`;
  }

  let firstValueAfterFilter = '';
  for (let i = 0; i < firstValue.length; i++) {
    if (i === 4) {
      firstValueAfterFilter += ' - ';
    }

    firstValueAfterFilter += firstValue[i];

    if (i === 5) {
      firstValueAfterFilter += '** - **** - ';
    }
  }

  if (secondValue) {
    return firstValueAfterFilter + secondValue;
  }

  return firstValueAfterFilter;
}

export function stripHTML(value) {
  return value.replace(/<[^>]*>/gi, '').replace(/&[^;]*;/gi, ' ');
}

export function textOverflowEllipsis(value, length = 160) {
  const maxLength = length;
  const ellipsis = '...';
  let limitStr;
  if (typeof value !== 'string') {
    return '';
  }

  if (value.length > maxLength) {
    limitStr = value.trim().substring(0, maxLength) + ellipsis;
  } else {
    limitStr = value.trim();
  }

  return limitStr;
}

export function getYoutubeId(url) {
  let ID = '';
  const finalUrl = url
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (finalUrl[2] !== undefined) {
    ID = finalUrl[2].split(/[^0-9a-z_-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export function getIframeYoutubeId(text) {
  const iframeTag = text.split('iframe')[1];
  const url = iframeTag ? iframeTag.split('src=')[1] : null;

  const youtubeId = url ? getYoutubeId(url) : null;

  return youtubeId;
}

export async function storeAsyncData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

export async function getAsyncData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {}
}
export async function removeAsyncData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
}

export function getImageType(data = [], type = '') {
  return data.map(({ images, more_info, url }, key) => ({
    more_info,
    image: images.find((item) => item.type == type),
    url,
    key,
  }));
}

export function getRandomNumber(digit = 10) {
  return Math.floor(Math.pow(10, digit) * Math.random());
}

export function isBase64(v, opts) {
  if (v instanceof Boolean || typeof v === 'boolean') {
    return false;
  }

  if (!(opts instanceof Object)) {
    opts = {};
  }

  if (opts.allowEmpty === false && v === '') {
    return false;
  }

  let regex =
    '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?';
  const mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)';

  if (opts.mimeRequired === true) {
    regex = mimeRegex + regex;
  } else if (opts.allowMime === true) {
    regex = mimeRegex + '?' + regex;
  }

  if (opts.paddingRequired === false) {
    regex =
      '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?';
  }

  return new RegExp('^' + regex + '$', 'gi').test(v);
}

export function imageCdn(options) {
  if (!/(http(s?)):\/\//i.test(options.image)) {
    return options.image;
  }
  const host = 'https://www.sociolla.com';
  return `${host}/cdn-cgi/image/${options.config},format=auto,dpr=${
    options.dpr ? options.dpr : 2
  }/${options.image}`;
}

export function checkPaymentMethod(item) {
  let code = null;
  if (item) {
    code = item.payment_method.code;
    return {
      isCreditCard: code === 'credit_debit_card',
      isCimbClicks: code === 'cimb_clicks',
      isBank: code === 'bank_transfer',
      isOvo: code === 'ovo',
      isGopay: code === 'gopay',
      isIndomaret: code === 'indomaret',
      isBcaVirtualAccount: code === 'bca_virtual_account',
      isBniVirtualAccount: code === 'bni_virtual_account',
      isBriVirtualAccount: code === 'bri_virtual_account',
      isMandiriVirtualAccount: code === 'mandiri_virtual_account',
      isPermataVirtualAccount: code === 'permata_virtual_account',
    };
  } else {
    return false;
  }
}

export function capitalize(string, separator = ' ') {
  if (!string) {
    return;
  }
  return string
    .trim()
    .toLowerCase()
    .split(separator)
    .map((item) => ucfirst(item))
    .join(separator);
}

export function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeFalsyParams(params, route = null) {
  const cloneParams = { ...params };
  const newParams = { filter: {} };

  Object.entries(cloneParams).map((paramValue) => {
    const [name, value] = paramValue;
    if (name !== 'filter') {
      if (value) {
        newParams[name] = value;
      }
    }

    if (name === 'filter') {
      Object.entries(value).map((filtersValue) => {
        const [filterName, filterValue] = filtersValue;

        if (
          filterName !== 'default_combination.price_after_discount' &&
          filterName !== 'tags.name' &&
          filterName !== '$and' &&
          filterName !== 'brand.id' &&
          filterName !== 'categories.id' &&
          filterName !== 'is_bundle' &&
          filterName !== 'is_pre_order' &&
          filterName
        ) {
          if (filterValue) {
            newParams[name][filterName] = filterValue;
          }
        }

        if (filterName === 'default_combination.price_after_discount') {
          if (
            Number(filterValue['$gte']) !== 0 ||
            Number(filterValue['$lte']) !== 1000000
          ) {
            if (route === 'searchResult') {
              newParams[name]['price'] = filterValue;
            } else {
              newParams[name][filterName] = filterValue;
            }
          }
        }

        if (filterName === 'tags.name') {
          if (Array.isArray(filterValue['$in']) && filterValue['$in'].length) {
            newParams[name][filterName] = filterValue;
          }
        }

        if (filterName === 'brand.id') {
          if (Array.isArray(filterValue['$in']) && filterValue['$in'].length) {
            newParams[name][filterName] = {
              $in: filterValue['$in'].filter(Boolean),
            };
          }
        }

        if (filterName === '$and') {
          if (Array.isArray(filterValue) && filterValue.length) {
            if (route === 'searchResult') {
              const isAverageRating = filterValue.some(
                (item) => 'review_stats.average_rating' in item,
              );
              if (isAverageRating) {
                const mergedValues = filterValue.reduce((acc, curr) => {
                  const key = Object.keys(curr)[0];
                  return { ...acc, ...curr[key] };
                }, {});
                newParams[name]['review_stats.average_rating'] = mergedValues;
              }
            } else {
              newParams[name][filterName] = filterValue;
            }
          }
        }

        if (filterName === 'is_sale_lilla') {
          if (route === 'searchResult') {
            newParams[name]['sale'] = filterValue;
            delete newParams[name]['is_sale_lilla'];
          } else if (filterValue) {
            newParams[name][filterName] = filterValue;
          }
        }

        if (filterName === 'categories.id') {
          if (filterValue['$in']) {
            newParams[name][filterName] = filterValue;
          }
        }

        if (filterName === 'is_bundle') {
          if (filterValue) {
            newParams[name][filterName || route?.product] = filterValue;
          }
        }

        if (filterName === 'is_pre_order') {
          if (filterValue) {
            newParams[name][filterName || route?.product] = filterValue;
          }
        }

        if (filterName === 'all_product') {
          if (filterValue) {
            delete newParams[name]['all_product'];
          }
        }
      });
    }
  });

  return newParams;
}

export function getBannerImages(items, type) {
  if (items && items.length && items.filter((i) => i.images.length).length) {
    const banners = items.filter((i) =>
      i.images.filter((g) => g.type === type).length ? true : false,
    ).length
      ? items
      : [];
    if (banners.length) {
      const images = [];
      banners.map((res) => {
        if (res.images.find((res2) => res2.type === type)) {
          images.push({
            _id: res._id,
            end_date: res.end_date,
            start_date: res.start_date,
            image: res.images.find((res2) => res2.type === type),
            url: res.url,
            more_info: res.more_info,
            title: res.title,
          });
        }
      });
      return images;
    }
  }
  return [];
}

export function getBannerNavigation(item, navigation) {
  const pageType = $get(
    item,
    'more_info.page_type',
    $get(item, 'more_info.mobile_apps_link.page_type', null),
  );
  const seeMoreUrl = $get(item, 'see_more_url', null);
  const pageTitle = $get(item, 'title', '');
  const id = $get(
    item,
    'more_info.value_type',
    $get(item, 'more_info.mobile_apps_link.value_type', null),
  );
  const final_url = item.link ? item.link : item.url;
  if (isNative) {
    logBannerCLick(item);
  } else {
    GoogleTagManager.bannerClick(item);
  }

  if (pageType === 'product_by_manufacturer') {
    if (!isNative) {
      if (final_url && !/images.soco.id/.test(final_url)) {
        Linking.openURL(final_url);
      } else {
        navigation.navigate('BrandDetailScreen', {
          title: 'Brand',
          slug: id,
          // brandId: id,
        });
      }
    } else {
      navigation.navigate('BrandDetailScreen', {
        title: 'Brand',
        slug: id,
        // brandId: id,
      });
    }
  } else if (pageType === 'product_by_main_category') {
    if (!isNative) {
      Linking.openURL(final_url);
    } else {
      let slug = item.see_more_url ? item.see_more_url.split('/')[4] : '';
      if (item.url && item.url.includes('promo/')) {
        slug = item.url.split('/')[4];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      } else if (item.see_more_url && item.see_more_url.includes('promo/')) {
        slug = item.see_more_url.split('/')[4];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      } else if (item.url) {
        slug = item.url.split('/')[3];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      } else if (item.see_more_url) {
        slug = item.see_more_url.split('/')[3];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      }
      navigation.navigate('CategoryDetailScreen', {
        title: 'Category',
        slug,
      });
    }
  } else if (pageType === 'landing_page') {
    if (pageTitle.indexOf('home') < 0) {
      let promotion_slug = $get(
        item,
        'more_info.value_type',
        $get(item, 'more_info.mobile_apps_link.value_type', null),
      );

      if (promotion_slug?.indexOf('/') > -1) {
        promotion_slug = promotion_slug.replace('/', '');
      }

      // campaign v1 in url contain promotion
      // campaign v2 in url contain campaign
      if (/promotion/gi.test(item.link || item.url)) {
        navigation.navigate('CampaignScreen', {
          slug: promotion_slug,
        });
      } else if (/campaign/gi.test(item.link || item.url)) {
        //campaignV2
        navigation.navigate('CampaignV2Screen', {
          slug: promotion_slug,
        });
      } else if (/gift-promo/gi.test(item.link || item.url)) {
        //gift-promo page
        navigation.navigate('CampaignV2TypeGiftScreen', {
          slug: promotion_slug,
        });
      } else if (/gift/gi.test(item.link || item.url)) {
        //gift page
        navigation.navigate('GiftingScreen');
      } else {
        Linking.openURL(item.link || item.url);
      }
    }
  } else if (pageType === 'product_by_category') {
    if (!isNative) {
      Linking.openURL(final_url);
    } else {
      let slug = item.see_more_url ? item.see_more_url.split('/')[4] : '';

      const urlParsed = new UtilsURI(item.see_more_url);
      const lillaCategoryType =
        urlParsed.getQueryStringValue('lillaCategoryType');

      if (['group', 'group-child'].includes(lillaCategoryType)) {
        const slug = urlParsed.getPath().replace(/[/]/gi, '');
        const type = urlParsed.getQueryStringValue('type');
        const name = urlParsed.getQueryStringValue('name');
        navigation.navigate('Shop', {
          screen: 'CategoryDetailScreen',
          params: {
            slug,
            type,
            ...(name ? { name } : {}),
            lillaCategoryType,
          },
        });
      } else if (item.url && item.url.includes('promo/')) {
        slug = item.url.split('/')[4];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      } else if (item.see_more_url && item.see_more_url.includes('promo/')) {
        slug = item.see_more_url.split('/')[4];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      } else if (item.url) {
        slug = item.url.split('/')[3];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      } else if (item.see_more_url) {
        slug = item.see_more_url.split('/')[3];
        slug = slug.split('?') ? slug.split('?')[0] : '';
      }
      navigation.navigate('CategoryDetailScreen', {
        slug,
      });
    }
  } else if (pageType === 'promotion_landing_page') {
    navigation.navigate('PromotionScreen', { skip: 0, limit: 5 });
  } else if (pageType === 'show_product') {
    if (!isNative) {
      Linking.openURL(final_url);
    } else {
      const slug = item.url ? item.url.split('/')[4] : '';
      navigation.navigate('ProductDetailScreen', {
        id: id,
        slug,
      });
    }
  } else if (pageType === 'see_more_flash_sale_banner') {
    if (!isNative) {
      Linking.openURL(final_url);
    } else {
      navigation.navigate('FlashSaleScreen');
    }
  } else if (pageType === 'in_app_browser') {
    Linking.openURL(final_url);
  } else {
    if (item && item.url) {
      if (!isNative) {
        Linking.openURL(final_url);
      } else {
        if (
          item.url.indexOf('http://') > -1 ||
          item.url.indexOf('https://') > -1
        ) {
          navigation.navigate('WebViewScreen', {
            title: item.title,
            url: item.url,
          });
        }
      }
    } else if (item && seeMoreUrl) {
      let pathname = seeMoreUrl.replace(
        // eslint-disable-next-line no-useless-escape
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim,
        '',
      );
      pathname = pathname.replace('/', '');
      const pathnameOrigin = pathname;
      pathname = pathname.split('?');
      pathname = pathname.length ? pathname[0] : '';

      if (seeMoreUrl.includes('promo/')) {
        const pathname = seeMoreUrl.replace(
          // eslint-disable-next-line no-useless-escape
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim,
          '',
        );
        const regexResult = pathname.split('/');
        if (regexResult.length > 1) {
          navigation.navigate('Shop', {
            screen: 'CategoryDetailScreen',
            params: {
              slug: regexResult[2],
            },
          });
        }
      } else if (
        seeMoreUrl.includes('/e-gift-card') ||
        pathname.includes('gift')
      ) {
        navigation.navigate('Shop', {
          screen: 'CategoryDetailScreen',
          params: {
            slug: '2341-e-gift-card',
          },
        });
      } else if (pathname.includes('campaign')) {
        const splitString = pathname.split('/');
        if (
          splitString &&
          Array.isArray(splitString) &&
          splitString.length > -1
        ) {
          const banner = splitString[1];
          navigation.navigate('CampaignV2Screen', {
            banner,
          });
        }
      } else if (pathname.includes('promotion')) {
        const splitString = pathname.split('/');
        if (
          splitString &&
          Array.isArray(splitString) &&
          splitString.length > -1
        ) {
          const banner = splitString[1];
          navigation.navigate('CampaignScreen', {
            banner,
          });
        }
      } else if (pathname.includes('just-arrived')) {
        navigation.navigate('Shop', {
          screen: 'NewArrivalScreen',
        });
      } else if (pathname.includes('quick-registration')) {
        navigation.navigate('Shop', {
          screen: 'QuickRegistrationVerifyScreen',
        });
      } else if (pathname.includes('best-seller')) {
        navigation.navigate('Shop', {
          screen: 'BestSellerScreen',
        });
      } else if (pathname.includes('flash-sale')) {
        navigation.navigate('Shop', {
          screen: 'FlashSaleScreen',
        });
      } else if (pathname.includes('my-orders')) {
        navigation.navigate('Shop', {
          screen: 'MyOrdersScreen',
        });
      } else if (pathname.includes('baby-registry')) {
        let user_id = '';
        const regexResult = pathname.split('/');
        const regexQuery = pathnameOrigin.match(/user_id=([^&]*)/);
        if (regexQuery && Array.isArray(regexQuery) && regexQuery.length > 0) {
          user_id = regexQuery[1];
        }
        navigation.navigate('Shop', {
          screen: 'BabyRegistryScreen',
          params: {
            is_friends_view: true,
            user_id,
            id: regexResult.length ? regexResult[1] : null,
          },
        });
      } else if (pathname.includes('_')) {
        const brandParams = {
          title: 'Brand',
          slug: pathname,
        };

        // Check for query brand tab
        const regexResult = pathname.split('/');
        const regexQueryBrandTab = pathnameOrigin.match(/tab=([^&]*)/);

        if (
          regexResult &&
          Array.isArray(regexResult) &&
          regexResult.length > 0 &&
          regexQueryBrandTab &&
          Array.isArray(regexQueryBrandTab) &&
          regexQueryBrandTab.length > 0
        ) {
          if (
            regexQueryBrandTab[1] &&
            ['promo', 'products', 'highlight'].includes(regexQueryBrandTab[1])
          ) {
            brandParams.slug = regexResult[0];
            brandParams.tab = regexQueryBrandTab[1];
          }
        }

        // brand
        navigation.navigate('Shop', {
          screen: 'BrandDetailScreen',
          params: brandParams,
        });
      } else if (pathname.includes('promo') && !pathname.includes('/')) {
        // promo
        navigation.navigate('Shop', {
          screen: 'PromotionScreen',
          params: {
            skip: 0,
            limit: 5,
          },
        });
      } else if (
        (pathname.includes('-') && !pathname.includes('/')) ||
        pathname.includes('promo/')
      ) {
        const urlParsed = new UtilsURI(pathnameOrigin);
        const regexResult = pathname.split('/');
        const regexQueryParamsResult = pathnameOrigin.match(/type=([^&]*)/);
        const lillaCategoryType =
          urlParsed.getQueryStringValue('lillaCategoryType');
        let slug;
        let type;

        if (['group', 'group-child'].includes(lillaCategoryType)) {
          slug = regexResult[0];
          const type = urlParsed.getQueryStringValue('type');
          const name = urlParsed.getQueryStringValue('name');
          navigation.navigate('Shop', {
            screen: 'CategoryDetailScreen',
            params: {
              slug,
              type,
              ...(name ? { name } : {}),
              lillaCategoryType,
            },
          });
        } else if (
          regexResult &&
          Array.isArray(regexResult) &&
          regexResult.length > 0 &&
          regexQueryParamsResult &&
          Array.isArray(regexQueryParamsResult) &&
          regexQueryParamsResult.length > 0
        ) {
          slug = regexResult[0];
          type = regexQueryParamsResult[1];

          //category
          navigation.navigate('Shop', {
            screen: 'CategoryDetailScreen',
            params: {
              slug,
              type,
            },
          });
        } else if (pathname.includes('promo/')) {
          slug = regexResult[1];
          navigation.navigate('Shop', {
            screen: 'CategoryDetailScreen',
            params: {
              slug,
            },
          });
        }
      } else if (pathname.includes('-') && pathname.includes('/')) {
        // pdp
        const arrayPath = pathname.split('/');
        const slug =
          Array.isArray(arrayPath) && arrayPath.length > 1 ? arrayPath[1] : '';

        navigation.navigate('Shop', {
          screen: 'ProductDetailScreen',
          params: {
            id: slug,
            universalLink: true,
          },
        });
      } else if (
        pathname.includes('Shop') &&
        pathname.includes('OrderDetailScreen') &&
        pathname.includes('/')
      ) {
        // order detail
        try {
          const arrayPath = pathname.split('/');
          const idOrder =
            Array.isArray(arrayPath) && arrayPath.length > 0
              ? arrayPath.pop()
              : '';
          navigation.navigate('Shop', {
            screen: 'OrderDetailScreen',
            params: {
              idOrder: idOrder,
              data: {},
            },
          });
        } catch (error) {}
      } else {
        Linking.openURL(seeMoreUrl);
      }
    }
  }

  return;
}

export function nFormatter(item) {
  if (!item) {
    return 0;
  }
  if (item >= 1000000000) {
    item = (item / 1000000000).toFixed(1).replace(/\.0$/, '') + 'g';
    item = item.replace('.', ',');
  } else if (item >= 1000000) {
    item = (item / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    item = item.replace('.', ',');
  } else if (item >= 1000) {
    item = (item / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    item = item.replace('.', ',');
  }
  return item;
}

export function generatedRatingTypeName(value) {
  const nameToLowerCase = value.toLowerCase();
  const removeWordIsStar = nameToLowerCase.replace('star_', '');
  const removeDash = removeWordIsStar.replace(/[_]/gi, ' ');
  return removeDash;
}

export function getImageData(result) {
  const uri = result?.uri ?? '';

  if (uri.startsWith('data:image/')) {
    const mimeType = uri.match(/data:(image\/[a-zA-Z]*);base64,/)[1];
    const base64Data = uri.split(',')[1];
    let filename = Math.floor(100000000000 * Math.random()) + '-' + Date.now();
    let type = '';

    if (mimeType === 'image/png') {
      filename = filename + '.png';
      type = 'image/png';
    } else if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      filename = filename + '.jpg';
      type = 'image/jpeg';
    } else {
      return false;
    }

    return { uri, filename, type, base64Data };
  } else {
    const fileExtension = uri.split('.').pop().toLowerCase();
    if (['jpeg', 'jpg', 'png'].indexOf(fileExtension) !== -1) {
      let filename =
        Math.floor(100000000000 * Math.random()) + '-' + Date.now();
      let type = '';
      if (fileExtension === 'png') {
        filename = filename + '.png';
        type = 'image/png';
      } else {
        filename = filename + '.jpg';
        type = 'image/jpeg';
      }
      return { uri, filename, type };
    } else {
      return false;
    }
  }
}

// "no" or "expecting" phase not counted as children
export const getTotalChildren = (children = []) =>
  children.filter(
    ({ phase_of_mother }) => ['no', 'expecting'].indexOf(phase_of_mother) < 0,
  ).length;

// export const getListChildren = (children) => [
//   ...children.map((item) =>
//     item.phase_of_mother == 'no'
//       ? {
//           ...item,
//           scene: '',
//         }
//       : item.phase_of_mother == 'expecting'
//       ? {
//           ...item,
//           scene: 'expecting',
//           name: 'Mengandung',
//           image: require('@/assets/images/tracking/icon-expecting.png'),
//         }
//       : {
//           ...item,
//           ...(item.image == ''
//             ? item.gender == 'female'
//               ? { image: require('@/assets/images/tracking/icon-child-girl.png') }
//               : { image: require('@/assets/images/tracking/icon-child-boy.png') }
//             : false),
//           scene: 'children',
//         },
//   ),
//   { _id: 'add', image: require('@/assets/images/tracking/icon-plus-purple.svg') },
// ];

export const formatPhoneNo = (phone, str = '-') => {
  if (!phone) {
    return '';
  }
  const len = phone.length;
  const size = Math.floor(len / 3);
  const prefix = ['0', '+'].includes(phone[0]) ? '' : '0';
  return (
    prefix +
    phone.slice(0, size) +
    str +
    phone.slice(size, 2 * size) +
    str +
    phone.slice(2 * size, len)
  );
};

export const iconVoucher = (voucher) => {
  const iconDiscountSource = require('@/assets/images/common/icon-discount-bg.png');
  const iconGwpSource = require('@/assets/images/common/icon-gwp-bg.png');
  const iconBogoSource = require('@/assets/images/common/icon-bogo-bg.png');
  const iconFreeShippingSource = require('@/assets/images/common/icon-freeshipping-circle.png');
  // const iconDefault = require('@/assets/images/web/icon-discount.png');
  const iconDefault = require('@/assets/images/common/icon-discount-bg.png');

  if (voucher?.discount_type === 'free_shipping') {
    return {
      source: iconFreeShippingSource,
      text: 'Free Shipping',
    };
  } else if (
    voucher?.discount_type !== 'free_products' ||
    !voucher?.free_products_type.length
  ) {
    return {
      source: iconDiscountSource,
      text: 'Discount',
    };
  } else if (
    voucher?.discount_type === 'free_products' &&
    voucher?.free_products_type[0] === 'bogo'
  ) {
    return {
      source: iconBogoSource,
      text: 'Buy 1 Get 1',
    };
  } else if (
    voucher?.discount_type === 'free_products' &&
    voucher?.free_products_type[0] !== 'bogo'
  ) {
    return {
      source: iconGwpSource,
      text: 'Free Gift',
    };
  } else {
    return {
      source: iconDefault,
      text: 'PROMO',
    };
  }
};

export const CheckEachOtpString = (arr) => arr.every((v) => v !== '');

export const getCombinationInfo = (attributes) => {
  let combinationName = '';
  let attributeSlug = '';
  for (const attribute in attributes) {
    if (attribute !== 'non_specify') {
      if (attributeSlug) {
        attributeSlug += '_';
      }

      if (combinationName) {
        combinationName += ' _ ';
      }
      combinationName += `${attribute}: ${attributes[attribute].name}`;
      attributeSlug += `${attributes[attribute].name.replace(/\s/gi, '_')}`;
    }
  }
  return {
    combinationName,
    attributeSlug,
  };
};

export const checkOnlyLetterName = (name) => {
  return name && !/[^a-zA-Z]/.test(name);
};

export const generateBreadcrumb = ({ page = 'category', data, slug, type }) => {
  const result = [];
  if (page === 'category') {
    const item = data.find((category) => category.slug === type);

    if (item) {
      result.push({
        label: item.name,
        navigate: {
          screen: 'CategoryDetailScreen',
          params: { slug: item.slug, type },
        },
      });

      if (Array.isArray(item.children)) {
        item.children.map((category) => {
          if (category.slug === slug) {
            result.push({
              label: category.name,
              navigate: {
                screen: 'CategoryDetailScreen',
                params: { slug: category.slug },
              },
            });
          }
          category.children.map((subcategory) => {
            if (subcategory.slug === slug) {
              result.push({
                label: category.name,
                navigate: {
                  screen: 'CategoryDetailScreen',
                  params: { slug: category.slug, type, name: category.name },
                },
              });

              result.push({
                label: subcategory.name,
                navigate: {
                  screen: 'CategoryDetailScreen',
                  params: {
                    slug: subcategory.slug,
                    type,
                    name: subcategory.name,
                  },
                },
              });
            }

            if (
              subcategory.children &&
              Array.isArray(subcategory.children) &&
              subcategory.children.length
            ) {
              subcategory.children.map((grandChildCategory) => {
                if (grandChildCategory.slug === slug) {
                  result.push({
                    label: category.name,
                    navigate: {
                      screen: 'CategoryDetailScreen',
                      params: {
                        slug: category.slug,
                        type,
                        name: category.name,
                      },
                    },
                  });

                  result.push({
                    label: subcategory.name,
                    navigate: {
                      screen: 'CategoryDetailScreen',
                      params: {
                        slug: subcategory.slug,
                        type,
                        name: subcategory.name,
                      },
                    },
                  });

                  result.push({
                    label: grandChildCategory.name,
                    navigate: {
                      screen: 'CategoryDetailScreen',
                      params: {
                        slug: grandChildCategory.slug,
                        type,
                        name: grandChildCategory.name,
                      },
                    },
                  });
                }
              });
            }
          });
        });
      }
    }
  }
  return result;
};

export const shortPriceFormatter = (value) => {
  value = Number(value);
  let result = value;

  if (value && !isNaN(value)) {
    const absValue = Math.abs(value);
    if (absValue > 999 && absValue <= 999999) {
      result = `${Math.sign(value) * (absValue / 1000).toFixed(1)}rb`;
    } else if (absValue > 999999) {
      result = `${Math.sign(value) * (absValue / 1000000).toFixed(1)}jt`;
    } else {
      result = Math.sign(value) * absValue;
    }
  }

  return result;
};

export const handleOrderStatusConverter = (name) => {
  switch (name) {
    case 'Waiting Payment':
      return 'isAwaiting';
    case 'Payment Verification':
      return 'isPaymentConfirmed';
    case 'Payment Accepted':
      return 'isPaymentAccepted';
    case 'Order in Progress':
      return 'isInProgress';
    case 'Shipped':
      return 'isShipped';
    case 'Delivered':
      return 'isDelivered';
    case 'Cancelled':
      return 'isCanceled';
    case 'Payment Failure':
      return 'isCanceled';
  }
};

//eslint-disable-next-line
export const specialCharacterValidation = /[ `!#$%^&*()+\=\[\]{};':"\\|,\/?~]/;

export const getSlug = (value) => {
  if (typeof value === 'string') {
    let s = value.toLowerCase();
    s = s
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '-')
      .replace(/^-+|-+$/g, '');
    return s;
  }

  return null;
};

export const productParams = (product) => {
  const categoryName =
    product.default_category && product.default_category.name
      ? getSlug(product.default_category.name)
      : 'product';
  let slug = product.slug || '';
  if (!slug) {
    slug = product.name ? getSlug(product.name) : 'default';
  }
  return { categoryName, slug };
};

export const ucWords = (value) => {
  return (value + '').toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
};

export const ucWordsAttributeName = (value) => {
  const newValue = ucWords(value);
  return newValue.replace(/\bMl\b/g, 'ml').replace(/\bGr\b/g, 'gr');
};

export const setCombinationName = (data) => {
  let groupAttribute = '';
  let attribute;
  if (Object.keys(data).length) {
    for (attribute in data.attributes) {
      if (data.attributes?.attribute && attribute !== 'non_specify') {
        groupAttribute += groupAttribute ? ' - ' : '';
        groupAttribute += `${attribute}: ${data.attributes[attribute].name}`;
      }
    }
    return ucWordsAttributeName(groupAttribute);
  } else {
    return '';
  }
};

export const webScrollIntoView = (view) => {
  if (!isNative && document) {
    try {
      const elm = document.querySelectorAll(view);
      if (elm && elm.length > 0) {
        elm[0].scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {}
  }
};

export function findMaxNumberValue(array) {
  return Math.max.apply(
    Math,
    array.map(function (o) {
      return o.value;
    }),
  );
}

export function findMinNumberValue(array) {
  return Math.min.apply(
    Math,
    array.map(function (o) {
      return o.value;
    }),
  );
}

export function getAccountPhaseStatus({ status = 'no', gender = 'Female' }) {
  const selectedStatus = motherPhaseList[status]?.status;
  if (status == 'no' && selectedStatus?.[gender]) {
    return selectedStatus[gender];
  } else if (selectedStatus) {
    return selectedStatus;
  }

  return '';
}

export function campaignBannerRedirect(banner, navigation) {
  const isFlashSalePage =
    $get(banner, 'more_info.mobile_apps_link.page_type', null) ===
    'see_more_flash_sale_banner'
      ? true
      : false;
  const isExternalLink =
    $get(banner, 'more_info.mobile_apps_link.page_type', null) ===
    'in_app_browser';

  const id = $get(banner, 'more_info.mobile_apps_link.value_type', null);
  const url = $get(banner, 'url', '');

  if (id || isFlashSalePage || isExternalLink || url) {
    getBannerNavigation(banner, navigation);
  }
}

export function getPathParams(str) {
  let queryString = str || '';
  let keyValPairs = [];
  const params = {};
  queryString = queryString.replace(/.*?\?/, '');

  if (queryString.length) {
    keyValPairs = queryString.split('&');
    for (pairNum in keyValPairs) {
      const key = keyValPairs[pairNum].split('=')[0];
      if (!key.length) {
        continue;
      }
      if (typeof params[key] === 'undefined') {
        params[key] = keyValPairs[pairNum].split('=')[1];
      }
    }
  }
  return params;
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const loadAmpLinkTag = (value) => {
  if (validateAmpUrlHasValue(value)) {
    const ampLinkHTMLExist = document.querySelector("link[rel='amphtml']");
    let ampLinkHTML;
    if (!ampLinkHTMLExist) {
      ampLinkHTML = document.createElement('link');
      ampLinkHTML.rel = 'amphtml';
      ampLinkHTML.setAttribute('href', value);
      document.head.appendChild(ampLinkHTML);
    }
  }
};

export const containsHtmlTags = (str) => {
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlTagRegex.test(str);
};

function validateAmpUrlHasValue(ampUrl) {
  const ampUrlPattern = /^https?:\/\/[^\/]+\/amp\/[^\/]+/;

  if (ampUrlPattern.test(ampUrl)) {
    return true;
  } else {
    return false;
  }
}

export const removeAmpLinkTag = (value) => {
  const ampLinkHTML = document.querySelector("link[rel='amphtml']");
  if (ampLinkHTML) {
    ampLinkHTML.remove();
  }
};

export const logoCategoryFlag = (logo) => {
  switch (logo) {
    case 'For Moms':
      return 'logo_for_moms';
    case 'For Baby & Kids':
      return 'logo_for_baby_kids';
    default:
      return `lulla_logo`;
  }
};

export const queryStringPageNumber = (page, limit) => {
  if (page == 1) {
    return 0;
  } else if (page == 2) {
    return limit;
  } else if (page > 2) {
    return (page - 1) * limit;
  } else {
    return null;
  }
};

export const updatePageQueryString = (paramName, page) => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  url.searchParams.set(paramName, Number(page));

  window.history.pushState({}, '', url.toString());
};

export const updatePageQueryStringV2 = (navigation, newParams) => {
  navigation.setParams(newParams);
};

export const valueAfterFilterComma = (value, separator) => {
  return value?.split(separator) ?? null;
};

export const getUtmData = (params) => {
  if (isNative) {
    return '-';
  }
  const urlParams = new URLSearchParams(window.location.search);
  let utmData = urlParams.get(params);
  if (utmData) {
    return utmData;
  }
  getUtmDataFromRoute();
  utmData = getExistingUtm()[params] || '-';

  return utmData;
};

export const formatPostDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const getTimeDifference = (postDate, currentDate = new Date()) => {
  const postTimestamp = new Date(postDate).getTime();
  const currentTimestamp = currentDate.getTime();
  const timeDifference = currentTimestamp - postTimestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 30) {
    return `${days}d`;
  } else if (months < 12) {
    return `${months}month`;
  } else {
    return formatPostDate(postDate);
  }
};

export const courierTrackStatusText = (status, driverName) => {
  switch (status) {
    case 'ALLOCATING':
      return 'Pesanan sedang diproses. Mencari driver';
    case 'PENDING_PICKUP':
      return 'Driver sedang menuju lokasi penjual';
    case 'PICKING_UP':
    case 'PENDING_DROP_OFF':
      return 'Driver pickup pesanan';
    case 'IN_DELIVERY':
      return `Driver sedang mengantar pesanan ke tujuan.\nNama: ${driverName}`;
    case 'COMPLETED':
      return 'Pesanan telah sampai tujuan';
    default:
      return status;
  }
};

export const replaceTagPInsideLi = (content) => {
  if (typeof content !== 'string') {
    return content;
  }
  const pattern = /<li[^>]*>\s*(?:<p[^>]*>)?(.*?)(?:<\/p>)?\s*<\/li>/gs;
  const result = content?.replace(pattern, '<li>$1</li>');
  return result;
};

/**
 * Formats a price string by removing spaces and ensuring proper formatting.
 *
 * @param {string} string - The price string to format Rp 100.000 || Rp 100.000 - Rp 200.000.
 * @returns {string} - The formatted price string Rp100.000 || Rp100.000 - Rp200.000.
 */
export const formatPrice = (string) => {
  if (!string) {
    return string;
  }
  const hasDash = string.includes('-');
  const regexPrice = string.replace(/\s/g, '').replace(/(Rp)\s?(\d)/g, '$1$2');

  if (hasDash) {
    // Re-adjust Rp100.000-Rp200.000 to Rp100.000 - Rp200.000
    return regexPrice.replace(
      /(Rp\d{1,3}\.\d{3})-(Rp\d{1,3}\.\d{3})/g,
      '$1 - $2',
    );
  }

  return regexPrice;
};

export const formatPercentage = (string) => {
  if (!string) {
    return string;
  }
  return string.replace(/-/, '');
};

/**
 *  Formats a string to remove special characters and spaces.
 * @param {string} string - The string to format.
 * @returns {string} - The formatted string.
 */
export const formatAttributeSlug = (string) => {
  if (!string) {
    return string;
  }

  return string.replace(/['\s\W]/g, '');
};

/**
 *
 * @param {string} text string to be formatted
 * @param {string} suggest string to be replaced
 * @param {string} replacement string to replace suggest
 * @returns {string} formatted text
 */
export const changeSpesificText = (text, suggest, replacement) => {
  return text.replace(suggest, replacement);
};

export const textGwpMessage = (item) => {
  let reasons = '';
  let fullTextReason = '';

  if (item?.reason?.brands && item?.reason?.brands.length) {
    reasons =
      `from brand ` + item?.reason?.brands.map((item) => item.name).join(', ');
  } else if (item?.reason.categories && item?.reason.categories.length) {
    reasons =
      `from category ` +
      item?.reason?.categories.map((item) => item.name).join(', ');
  } else if (item?.reason.products && item?.reason.products.length) {
    reasons =
      `from product ` +
      item?.reason.products.map((item) => item.name).join(', ');
  } else {
    return;
  }
  fullTextReason = reasons;
  return { reason: reasons.slice(0, 32), fullTextReason };
};

export const formatDateFromToEnd = (fromDate, endDate) => {
  dayjs.extend(utc);
  dayjs.extend(localizedFormat);
  dayjs.extend(advancedFormat);

  const from = dayjs.utc(fromDate).local().format('D');
  const to = dayjs.utc(endDate).local().format('DD MMMM YYYY');

  return `${from} - ${to}`;
};

export const cardType = (cardNumber) => {
  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercard = /^5[1-5][0-9]{14}$/;
  const amex = /^3[47][0-9]{13}$/;
  const jcb = /^(?:2131|1800|35\d{3})\d{11}$/;

  if (visa.test(cardNumber)) {
    return 'visa';
  }
  if (mastercard.test(cardNumber)) {
    return 'mastercard';
  }
  if (amex.test(cardNumber)) {
    return 'american-express';
  }
  if (jcb.test(cardNumber)) {
    return 'jcb';
  }
  return 'credit-debit-card';
};

/**
 * Function to format the price
 * @param {string} price - price to be formatted
 * @returns {string} - formatted price
 */
export const cleanRpSpaceHtml = (text) => {
  return text ? text.replace(/Rp\s+/g, 'Rp') : text;
};

/**
 * Function to check if the text is html
 * @param {string} text - text to be checked
 * @returns {boolean} - true if the text is html
 */
export const isHtml = (text) => {
  return text ? text.includes('<') : false;
};

/**
 * Function to parse Google address components
 * @param {string} value - The value to check
 * @returns {boolean} - True if the value is a number, false otherwise
 */
export const parseGoogleAddress = (data) => {
  const dataLength = data.length;

  const postalCode = data[dataLength - 1]?.long_name || null;
  const country = data[dataLength - 2]?.long_name || null;
  const province = data[dataLength - 3]?.long_name || null;
  const city = data[dataLength - 4]?.long_name || null;
  const district = data[dataLength - 5]?.long_name || null;
  const subdistrict = data[dataLength - 6]?.long_name || null;

  const addressComponents = {
    postal_code: postalCode,
    country: country,
    province: province,
    city: city,
    district: district,
    subdistrict: subdistrict,
  };

  return addressComponents;
};

/**
 * @name textLengthFormater
 * @param {string} text
 * @param {number} CHAR_LIMIT
 * @example
 * textLengthFormater('detail text' , 6)
 * @returns
 * detail...
 */
export const textLengthFormater = (text, CHAR_LIMIT, isBestSeller) => {
  const textLen = text?.length || 0;
  const res = text?.substring(0, CHAR_LIMIT);
  if (textLen > CHAR_LIMIT) {
    if (isBestSeller) {
      return res;
    } else {
      return res + '...';
    }
  } else {
    return res;
  }
};

/**
 * @name parseAddress
 * @param {object} address
 * @example
 * parseAddress({
 * street1: 'Jl. Raya',
 * street2: 'No. 1',
 * district: { name: 'Kebon Jeruk' },
 * city: { name: 'Jakarta Barat' },
 * province: { name: 'DKI Jakarta' },
 * postal_code: '11530'
 * })
 */
export const parseAddress = (address) => {
  const addressParts = [];

  if (address.street1) {
    addressParts.push(address.street1);
  }
  if (address.street2) {
    addressParts.push(address.street2);
  }
  if (address.district && address.district.name) {
    addressParts.push(address.district.name);
  }
  if (address.city && address.city.name) {
    addressParts.push(address.city.name);
  }
  if (address.province && address.province.name) {
    addressParts.push(address.province.name);
  }
  if (address.postal_code) {
    addressParts.push(address.postal_code);
  }
  return addressParts.join(', ');
};
