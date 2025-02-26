/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import ToolbarFilterProducts from './ToolbarFilterProducts';

const ListHeaderComponentListProducts = (props) => {
  return (
    <View>
      {props.ListHeaderComponentExtend ? props.ListHeaderComponentExtend : null}
      {props.ToolbarFilterProductsProps ? (
        <ToolbarFilterProducts {...props.ToolbarFilterProductsProps} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default React.memo(ListHeaderComponentListProducts);
