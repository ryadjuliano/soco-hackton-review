/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Image from '@/components/common/Image';
import { useDispatch } from 'react-redux';
import Colors from '@/components/Colors';

const iconSortSource = require('@/assets/images/common/icon-sort.png');
const iconFilterSource = require('@/assets/images/common/icon-filter.png');
const $get = require('lodash.get');
const ToolbarFilterProducts = (props) => {
  const { route, totalProducts, style, onBrandScreeen } = props;
  const dispatch = useDispatch();
  const { title } = route.params ? route.params : { title: false };
  const sortValue = $get(route, 'params.sort', '');
  const sortByHandler = () => {
    dispatch({ type: 'MODAL/SHOW', modalName: 'sortBy' });
  };

  const filtersHandler = () => {
    dispatch({ type: 'MODAL/SHOW', modalName: 'filters' });
  };

  const getSortText = (value) => {
    if (value === '-three_month_total_orders_lilla') {
      return 'Terlaris';
    } else if (value === '-review_stats.total_reviews') {
      return 'Review';
    } else if (value === '-_id') {
      return 'Terbaru';
    } else if (value === 'default_combination.price_after_discount') {
      return 'Harga Rendah - Tinggi';
    } else if (value === '-default_combination.price_after_discount') {
      return 'Harga Tinggi - Rendah';
    } else if (value === 'name') {
      return 'A - Z';
    } else if (value === '-name') {
      return 'Z - A';
    } else {
      return 'Sort By';
    }
  };

  return (
    <View style={[styles.container, style]}>
      {Boolean(title && !onBrandScreeen) && (
        <Text style={styles.heading}>All {title}</Text>
      )}
      <View style={styles.toolbar}>
        <View style={styles.row}>
          <View style={styles.column}>
            {onBrandScreeen ? (
              <View style={[styles.row, { alignItems: 'center' }]}>
                <Text style={styles.totalProducts}>
                  Products ({totalProducts})
                </Text>
              </View>
            ) : (
              <View style={[styles.row, { alignItems: 'center' }]}>
                <Text style={styles.totalProducts}>
                  {props?.productCountLabel
                    ? props?.productCountLabel
                    : 'Products'}{' '}
                  ({totalProducts})
                </Text>
              </View>
            )}
          </View>
          <View style={styles.column}>
            <View
              style={[
                styles.row,
                {
                  marginRight: 0,
                  marginLeft: 0,
                  justifyContent: 'flex-end',
                  flexWrap: 'nowrap',
                },
              ]}>
              <TouchableOpacity
                style={[styles.iconWrapper, { marginRight: 20 }]}
                onPress={sortByHandler}>
                <Image
                  source={iconSortSource}
                  style={{ width: 16, height: 12, marginRight: 6 }}
                  resizeMode="cover"
                />
                <Text
                  style={styles.textIcon}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {getSortText(sortValue)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={filtersHandler}>
                <Image
                  source={iconFilterSource}
                  style={{ width: 13, height: 14, marginRight: 6 }}
                  resizeMode="contain"
                />
                <Text style={styles.textIcon}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  column: {
    width: '50%',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingHorizontal: 4,
  },
  heading: {
    fontFamily: 'satoshi-black',
    fontSize: 15,
    lineHeight: 20,
    color: '#404040',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textIcon: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'satoshi-bold',
    color: Colors.black0,
  },
  toolbar: {
    paddingVertical: 12,
  },
  totalProducts: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'satoshi-bold',
    color: Colors.black0,
  },
});

export default React.memo(ToolbarFilterProducts);
