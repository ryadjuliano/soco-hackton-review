/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { isWeb, isMobileWeb } from '@/components/screens';
import ImageDefault from '@/components/common/Image';

// eslint-disable-next-line react/display-name
const ImageContain = (props) => {
  const {
    source,
    style = {},
    containerStyle = {},
    paddingHorizontal = 0,
    onChangeHeight = () => {},
  } = props;
  const url = source?.url ? source.url : source;
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    onHeight();
  }, [imageHeight]);

  const onHeight = () => {
    if (onChangeHeight) {
      onChangeHeight(imageHeight);
    }
  };

  const onLayout = async (e) => {
    try {
      const native = e.nativeEvent;
      await Image.getSize(
        url,
        (width, height) => {
          let realWidth = 0;
          if (native) {
            if (
              (isWeb || isMobileWeb) &&
              native.target &&
              native.target.clientWidth
            ) {
              realWidth = native.target.clientWidth;
            }
            if (
              !(isWeb || isMobileWeb) &&
              native.layout &&
              native.layout.width
            ) {
              realWidth = native.layout.width;
            }
          }
          if (paddingHorizontal) {
            realWidth -= paddingHorizontal * 2;
          }
          const getRatio = (a, b) => {
            for (let result = b; result > 1; result--) {
              if (a % result == 0 && b % result == 0) {
                a = a / result;
                b = b / result;
              }
            }
            return { width: a, height: b };
          };
          const ratio = getRatio(width, height);
          const finalWidthRatio = realWidth / ratio.width;
          const finalHeightRatio = finalWidthRatio * ratio.height;
          const finalHeight = finalHeightRatio ? finalHeightRatio : 250;
          if (finalHeight != imageHeight) {
            setImageHeight(finalHeight);
          }
        },
        (err) => console.log(err),
      );
    } catch (error) {}
  };

  return (
    <View {...props} style={containerStyle} onLayout={onLayout}>
      <ImageDefault source={source} style={[{ height: imageHeight }, style]} />
    </View>
  );
};

ImageContain.propTypes = {
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default React.memo(ImageContain);
