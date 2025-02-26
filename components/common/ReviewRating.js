/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Image from '@/components/common/Image';
const inputStarSource = require('@/assets/images/my-reviews/star.png');
const inputStarActiveSource = require('@/assets/images/my-reviews/star-active.png');

const ReviewRating = (props) => {
  const { getValue, defaultValue } = props;
  const [ratingInput, setRatingInput] = useState([
    {
      name: 'ratingInput_1',
      isActive: false,
    },
    {
      name: 'ratingInput_2',
      isActive: false,
    },
    {
      name: 'ratingInput_3',
      isActive: false,
    },
    {
      name: 'ratingInput_4',
      isActive: false,
    },
    {
      name: 'ratingInput_5',
      isActive: false,
    },
  ]);

  const selectRatingHandler = (index) => {
    const value = index + 1;
    const copyRatingInput = [...ratingInput];

    copyRatingInput.map((copyRating, indexCopyRating) => {
      if (indexCopyRating <= index) {
        copyRatingInput[indexCopyRating].isActive = true;
      } else {
        copyRatingInput[indexCopyRating].isActive = false;
      }
    });

    setRatingInput(copyRatingInput);
    if (getValue) {
      getValue(value);
    }
  };

  const setDefaultActiveRating = () => {
    const index = defaultValue - 1;
    const copyRatingInput = [...ratingInput];

    copyRatingInput.map((copyRating, indexCopyRating) => {
      if (indexCopyRating <= index) {
        copyRatingInput[indexCopyRating].isActive = true;
      } else {
        copyRatingInput[indexCopyRating].isActive = false;
      }
    });

    setRatingInput(copyRatingInput);
  };

  useEffect(() => {
    if (defaultValue) {
      setDefaultActiveRating();
    }
  }, [defaultValue]);

  return (
    <React.Fragment>
      {ratingInput.map((input, index) => (
        <TouchableOpacity
          onPress={() => {
            selectRatingHandler(index);
          }}
          key={`ratingInput${index}`}>
          <Image
            source={input.isActive ? inputStarActiveSource : inputStarSource}
            style={{ width: 20, height: 19, marginRight: 4 }}
          />
        </TouchableOpacity>
      ))}
    </React.Fragment>
  );
};

export default React.memo(ReviewRating);
