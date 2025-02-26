/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WithLocalSvg from '@/components/common/WithLocalSvg';

import { isWeb } from '@/components/screens';

const Panel = (props) => {
  const { panelContainerStyle, panelTitleStyle, iconDownCustom } = props;
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.panelContainer, panelContainerStyle]}>
      <TouchableOpacity style={styles.panelHeader} onPress={toggle}>
        {typeof props.title === 'string' ? (
          <Text style={[styles.panelTitle, panelTitleStyle]}>
            {props.title}
          </Text>
        ) : (
          <View>{props.title}</View>
        )}
      </TouchableOpacity>
      {expanded && <View style={styles.panelBody}>{props.children}</View>}
      <TouchableOpacity style={styles.panelIconContainer} onPress={toggle}>
        {props.rightTextEnabled && (
          <Text style={styles.rightText}>
            {expanded ? 'Hide' : 'See'} Details {''}
          </Text>
        )}
        <WithLocalSvg
          key="arrow-down"
          width={7}
          height={12}
          asset={
            iconDownCustom
              ? iconDownCustom
              : require('@/assets/images/common/arrow-down.svg')
          }
          style={{
            transform: [{ rotate: expanded ? '180deg' : '360deg' }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  panelBody: {
    overflow: 'hidden',
    ...(isWeb ? { paddingVertical: 5, paddingHorizontal: 10 } : {}),
  },
  panelHeader: {},
  panelContainer: {
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    position: 'relative',
    width: '99%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  panelIconContainer: {
    position: 'absolute',
    height: 30,
    right: 11,
    top: isWeb ? 0 : 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontFamily: 'satoshi-medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#25182E',
    marginBottom: isWeb ? 0 : 8,
  },
  rightText: {
    fontFamily: 'satoshi-medium',
    fontSize: 12,
    color: '#78707E',
  },
});

export default Panel;
