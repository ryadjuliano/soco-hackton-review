/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressBarController from '@controllers/common/ProgressBarController';
import { isWeb } from '@/components/screens';
const ProgressBar = (props) => {
  const {
    stylesProgressContainer,
    progressInfoText,
    hideProgressInfo,
    step,
    totalStep,
    colorProgress,
    colorProgressBar,
    RightIcon,
    barWidth,
  } = ProgressBarController(props);

  return (
    <View style={[styles.progressContainer, stylesProgressContainer]}>
      <View style={styles.progressRow}>
        {!hideProgressInfo ? (
          <View style={styles.progressInfo}>
            <Text style={[styles.progressInfoText, progressInfoText]}>
              {step} of {totalStep}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            styles.progress,
            colorProgress ? { backgroundColor: colorProgress } : {},
          ]}>
          <View
            style={[
              styles.progressBar,
              barWidth,
              colorProgressBar ? { backgroundColor: colorProgressBar } : {},
            ]}></View>
        </View>
      </View>
      <View style={styles.progressBarRightIcon}>{RightIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    flexShrink: 1,
    width: '100%',
    backgroundColor: '#EBE3F6',
    borderRadius: 4,
    ...(isWeb
      ? {
          height: 12,
        }
      : {
          height: 8,
        }),
  },
  progressBar: {
    width: '33.333333333333%',
    backgroundColor: '#A675C7',
    borderRadius: 4,
    ...(isWeb
      ? {
          height: 12,
        }
      : {
          height: 8,
        }),
  },
  progressBarRightIcon: {
    position: 'absolute',
    bottom: 0,
    right: -1,
    top: 0,
    zIndex: 100,
  },
  progressContainer: {
    position: 'relative',
    flexGrow: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 12,
    ...(isWeb
      ? {
          height: 24,
        }
      : {
          height: 20,
        }),
  },
  progressInfo: {
    marginRight: 10,
  },
  progressInfoText: {
    fontFamily: 'satoshi-bold',
    fontSize: 12,
    lineHeight: 15,
    color: '#A775C8',
    letterSpacing: 1,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(ProgressBar);
