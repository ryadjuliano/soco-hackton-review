import React from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { isWeb } from '@/components/screens';
import Colors from '@/components/Colors';
import { data as Font } from '~global/Fonts';
import { Container, Row } from './Layout';

const lists = [
  {
    title: 'My Profile',
    screen: ['ProfileScreen'],
    key: 'user',
  },
  {
    title: 'My Orders',
    screen: ['MyOrdersScreen'],
    key: 'orders',
  },
  {
    title: 'Shipping Address',
    screen: ['MyAddressScreen'],
    key: 'address',
  },
  {
    title: 'Wishlist',
    screen: ['WishlistScreen'],
    key: 'wishlist',
  },

  {
    title: 'My Review',
    screen: ['MyReviewScreen', { indexTabActived: 1 }],
    key: 'review',
  },
];

const SidebarProfile = (props) => {
  const {
    active,
    navigation,
    loading = false,
    children,
    show = true,
    count,
  } = props;
  if (!isWeb || !show) {
    return <>{children}</>;
  }
  const activeList = lists.find((x) => x.key === active);

  return (
    <Container
      style={styles.sidebarLayoutStyle}
      showHomeHeader
      containerStyle={styles.sidebarLayoutContainer}>
      <Row style={styles.sidebarRow}>
        <View style={styles.col3}>
          <View
            style={[
              styles.sidebarListContainer,
              styles.sidebarRoundedContainer,
            ]}>
            {lists.map((data, index) => (
              <Pressable
                key={'menu-tab-' + index}
                style={[
                  styles.sidebarList,
                  active === data.key && styles.sidebarListActive,
                ]}
                onPress={() => navigation.navigate(...data.screen)}>
                <Text
                  style={[
                    styles.sidebarListText,
                    active === data.key && styles.sidebarListTextActive,
                  ]}>
                  {data.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.col9}>
          <View
            style={[
              styles.sidebarListItemContainer,
              styles.sidebarRoundedContainer,
            ]}>
            {activeList && activeList.title && (
              <Text style={styles.sidebarHeader}>
                {activeList.title} {count > 0 && `(${count})`}
              </Text>
            )}
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.purple0} />
              </View>
            ) : (
              children
            )}
          </View>
        </View>
      </Row>
    </Container>
  );
};

SidebarProfile.propTypes = {
  children: PropTypes.node,
  active: PropTypes.string,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
  show: PropTypes.bool,
  count: PropTypes.number,
};
const styles = StyleSheet.create({
  sidebarHeader: {
    fontSize: 20,
    lineHeight: 20,
    padding: 20,
    ...Font.satoshiBlack,
  },
  col3: {
    flex: 2.5,
    marginHorizontal: 15,
  },
  col9: {
    flex: 9,
    marginHorizontal: 15,
  },
  sidebarLayoutContainer: {
    backgroundColor: Colors.grey3,
  },
  sidebarLayoutStyle: {
    paddingTop: 44,
  },
  sidebarListContainer: {
    padding: 20,
  },
  sidebarList: {
    ...(isWeb && { cursor: 'pointer' }),
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 8,
  },
  sidebarListActive: {
    backgroundColor: Colors.purple28,
  },
  sidebarListItemContainer: {
    minHeight: 340,
    position: 'relative',
    backgroundColor: Colors.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sidebarListText: {
    color: Colors.purple7,
    ...Font.satoshiMedium,
    fontSize: 16,
    lineHeight: 20,
  },
  sidebarListTextActive: {
    ...Font.satoshiBlack,
  },
  sidebarRoundedContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sidebarRow: {
    alignItems: 'flex-start',
    marginHorizontal: -15,
  },
});

export default SidebarProfile;
