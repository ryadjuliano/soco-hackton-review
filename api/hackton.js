import axios from 'axios';

export const getProductsRecomendation = () => {
  return axios.get(`https://hackathon.blogstreak.com/api/products`);
};

export const getReviewsDetail = (id) => {
    return axios.get(`https://hackathon.blogstreak.com/api/products-reviews/${id}`);
};

export const getAnalyze = (id) => {
    return axios.post(`https://hackathon.blogstreak.com/api/analyze/${id}`);
};

export const getCompare = () => {
    return axios.get(`https://hackathon.blogstreak.com/api/reviews/compare`, {
        params: {
            productId1: 105802,
            productId2: 80032,
        }
    });
}



