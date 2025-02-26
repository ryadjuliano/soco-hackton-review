/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import useIsMounted from '~global/hooks/useIsMounted';

/**
 * For web platform we're using Image component for displaying svg
 * and set dimensions with Image.getSize
 *
 * Other than web we just return WithLocalSvg as is
 */
const WithLocalSvg = (props) => {
  const { asset } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted.current) {
      Image.getSize(asset, (width, height) => {
        if (width) {
          setWidth(width);
        }
        if (height) {
          setHeight(height);
        }
      });
    }
  });

  return (
    <Image {...props} source={asset} style={[{ width, height }, props.style]} />
  );
};

export default WithLocalSvg;
