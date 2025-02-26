import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Carousel from '@/components/common/Carousel';
import Arrow from '@/components/common/carousels/Arrow';
import { isWeb, maxWidthContainer } from '@/components/screens';
import Colors from '@/components/Colors';

const screenWidth = Dimensions.get('window').width;
const defaultPadding = 10;

const ProductSlider = (props) => {
  const {
    data = [],
    slideCount = 5,
    containerStyle = {},
    maxWidth = 0,
    maxWidthItem = 0,
    widthMobile = 0,
    paddingSize = 0,
    arrowSpace = 0,
    arrowTopSpace = 0,
    renderItem = ({ item, index }) => {},
    eGiftPromoPage,
  } = props;
  const settings = {
    className: 'slick-flex',
    centerMode: false,
    dots: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    arrows: isWeb && data?.length > 1,
    slidesToScroll: slideCount,
    slidesToShow: slideCount,
    nextArrow: (
      <Arrow.ArrowRight
        customStyle={[
          styles.arrowStyle,
          styles.arrowRight,
          arrowSpace ? { marginRight: arrowSpace } : {},
          arrowTopSpace ? { top: arrowTopSpace } : {},
          data?.length < slideCount ? { transform: [{ scale: 0 }] } : {},
        ]}
      />
    ),
    prevArrow: (
      <Arrow.ArrowLeft
        customStyle={[
          styles.arrowStyle,
          styles.arrowLeft,
          arrowSpace ? { marginLeft: arrowSpace } : {},
          arrowTopSpace ? { top: arrowTopSpace } : {},
          data?.length < slideCount ? { transform: [{ scale: 0 }] } : {},
        ]}
      />
    ),
  };

  const maxWidthSection = maxWidth
    ? maxWidth
    : isWeb
    ? maxWidthContainer
    : screenWidth;
  const calculateWidth = isWeb
    ? maxWidthItem
      ? maxWidthItem
      : maxWidthSection / slideCount
    : widthMobile
    ? widthMobile
    : 190;
  const slideItemStyle = {
    width: calculateWidth,
    paddingHorizontal: paddingSize ? paddingSize : defaultPadding,
    ...(eGiftPromoPage ? { marginRight: 8 } : {}),
  };

  return data?.length ? (
    <View
      style={[styles.container, { width: maxWidthSection }, containerStyle]}>
      {isWeb ? ( // if web and mobile need slider
        <Carousel {...settings}>
          {data.map((item, index) => (
            <View key={`carousel-product-${index}`} style={slideItemStyle}>
              {renderItem({ item, index })}
            </View>
          ))}
        </Carousel>
      ) : (
        // if mobile slider default
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <View key={`carousel-product-${index}`} style={slideItemStyle}>
              {renderItem({ item, index })}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  ) : (
    false
  );
};

ProductSlider.propTypes = {
  data: PropTypes.array.isRequired,
  slideCount: PropTypes.number,
  maxWidth: PropTypes.number,
  maxWidthItem: PropTypes.number,
  widthMobile: PropTypes.number,
  paddingSize: PropTypes.number,
  arrowSpace: PropTypes.number,
  arrowTopSpace: PropTypes.number,
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  itemStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  renderItem: PropTypes.func,
  eGiftPromoPage: PropTypes.bool,
};

export default ProductSlider;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  arrowStyle: { top: '45%', ...(isWeb && { cursor: 'pointer' }) },
  arrowRight: { marginRight: -5 },
  arrowLeft: { marginLeft: -5 },
  lastItem: {
    borderRightWidth: 15,
    borderRightColor: Colors.transparent,
    marginRight: 15,
  },
});
