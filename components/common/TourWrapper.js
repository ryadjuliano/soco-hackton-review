/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import { walkthroughable, CopilotStep } from 'react-native-copilot';
const CopilotView = walkthroughable(View);
const TourWrapper = (props) => {
  return (
    // <>
    <CopilotStep order={props.type} name={'openApp' + props.type}>
      <CopilotView style={props.style}>{props.children}</CopilotView>
    </CopilotStep>
    // </>
  );
};

export default TourWrapper;
