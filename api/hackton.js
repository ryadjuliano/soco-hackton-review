import axios from 'axios';

export const getProductsRecomendation = () => {
  return axios.get(`https://hackathon.blogstreak.com/api/products`);
};

export const getReviewsDetail = () => {
    return axios.get(`https://hackathon.blogstreak.com/api/products`);
  };
