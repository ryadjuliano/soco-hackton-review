/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import ModalWeb from '@/components/common/modal/Modal';

const Modal = (props) => {
  return <ModalWeb {...props}>{props.children}</ModalWeb>;
};

export default Modal;
