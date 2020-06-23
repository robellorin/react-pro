import axios from 'axios';
import * as constant from 'src/constant';

export const getNews = (type = '') => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.NEWS_REQUEST
  });
  const param = type ? '?type=all' : '';
  await axios.get(`${constant.API_URL}/news${param}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.NEWS_GET_REQUEST_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: constant.NEWS_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.NEWS_REQUEST_FAILED
      });
    });
};

export const addNews = (userId, news) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.NEWS_REQUEST
  });
  const data = {
    userId,
    news
  };
  await axios.post(`${constant.API_URL}/news`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        window.$client.updateNews(res.data);
        dispatch({
          type: constant.NEWS_ADD_REQUEST_SUCCESS,
          news: res.data
        });
      } else {
        dispatch({
          type: constant.NEWS_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.NEWS_REQUEST_FAILED
      });
    });
};

export const updateNews = (id, news) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.NEWS_REQUEST
  });
  const data = {
    news
  };
  await axios.put(`${constant.API_URL}/news/${id}`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        window.$client.updateNews(res.data);
        dispatch({
          type: constant.NEWS_UPDATE_REQUEST_SUCCESS,
          news: res.data
        });
      } else {
        dispatch({
          type: constant.NEWS_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.NEWS_REQUEST_FAILED
      });
    });
};

export const deleteNews = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.NEWS_REQUEST
  });
  await axios.delete(`${constant.API_URL}/news/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.NEWS_DELETE_REQUEST_SUCCESS,
          news: res.data
        });
      } else {
        dispatch({
          type: constant.NEWS_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.NEWS_REQUEST_FAILED
      });
    });
};
