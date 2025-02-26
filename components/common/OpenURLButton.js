import React from 'react';
import { Button } from 'react-native-elements-light';
import PropTypes from 'prop-types';
//
import { useLinking } from '~global/hooks';

const OpenURLButton = (props) => {
  const { title } = props;
  const handleLinking = useLinking();

  return <Button title={title} onPress={handleLinking} />;
};

OpenURLButton.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

OpenURLButton.defaultProps = {
  title: 'Open',
};

export default OpenURLButton;
