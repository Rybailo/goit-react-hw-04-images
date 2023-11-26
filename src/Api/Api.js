import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '40436397-1bcf8ed18e7ed154883cb3f4c';

export const fetchSearchQuery = (searchQuery, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  });

  return axios.get(`${URL}?${params}`);
};
