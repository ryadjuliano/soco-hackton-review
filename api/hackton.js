import axios from 'axios';

export const getProductsRecomendation = () => {
  return axios.get(`https://hackathon.blogstreak.com/api/products`);
};

export const getReviewsDetail = (id) => {
    return axios.get(`https://hackathon.blogstreak.com/api/products-reviews/${id}`);
};

export const getAnalyze = (id) => {
    return axios.get(`https://hackathon.blogstreak.com/api/analyze/${id}`);
};



