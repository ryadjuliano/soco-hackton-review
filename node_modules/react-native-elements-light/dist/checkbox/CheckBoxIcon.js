import React from 'react';
const CheckBoxIcon = ({ checked, onIconPress, onLongIconPress, size = 24, checkedIcon = 'check-square-o', uncheckedIcon = 'square-o', iconType, checkedColor, uncheckedColor = '#bfbfbf', }) => {
    if (checked && React.isValidElement(checkedIcon)) {
        return checkedIcon;
    }
    if (!checked && React.isValidElement(uncheckedIcon)) {
        return uncheckedIcon;
    }
};
export default CheckBoxIcon;
