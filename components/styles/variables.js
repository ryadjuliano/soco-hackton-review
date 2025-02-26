/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

import Colors from '@/components/Colors';

export default StyleSheet.create({
  'border-radius-base': { borderRadius: 4 },
  'border-radius-large': { borderRadius: 6 },
  'border-radius-small': { borderRadius: 3 },

  'font-size-base': { fontSize: 14 },
  'font-size-large': { fontSize: 18 },
  'font-size-small': { fontSize: 12 },

  'padding-base': { paddingVertical: 6, paddingHorizontal: 12 },
  'padding-large': { paddingVertical: 10, paddingHorizontal: 16 },
  'padding-small': { paddingVertical: 5, paddingHorizontal: 10 },

  // buttons
  'button-default-bg': { backgroundColor: '#fff' },
  'button-default-color': { color: Colors.purple0 },

  'button-purple-bg': { backgroundColor: Colors.purple0 },
  'button-purple-color': { color: '#fff' },
});
