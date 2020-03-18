import axios from 'axios';
import * as constant from 'src/constant';

export const getUsersWithNews = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.SUPPORT_REQUEST
  });

  await axios.get(`${constant.API_URL}/user/withNews`, {
    headers: {
      'Authorization': `Bearer ${userData.token}`
    }
  })
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: constant.SUPPORT_GET_REQUEST_SUCCESS,
        data: res.data
      });
    } else {
      dispatch({
        type: constant.SUPPORT_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.SUPPORT_REQUEST_FAILED
    });
  });
}

export const updateUsersWithNews = (id, cutOff, newsId, news) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.SUPPORT_REQUEST
  });
  let createdNewsId = newsId;
  if (!newsId) {
    const newsResponse = await addNews(id,news);
    createdNewsId = newsResponse.data.id;
  } else {
    await updateNews(newsId, news);
  }
  
  const data = {
    cutOff
  }
  await axios.put(`${constant.API_URL}/user/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: constant.SUPPORT_UPDATE_REQUEST_SUCCESS,
        user: res.data,
        news,
        newsId: createdNewsId
      });
    } else {
      dispatch({
        type: constant.SUPPORT_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.SUPPORT_REQUEST_FAILED
    });
  });
}

async function addNews (userId, news) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const data = {
    userId,
    news
  }
  const response = await axios.post(`${constant.API_URL}/news`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  });
  return response;
}

async function updateNews(id, news) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const data = {
    news
  }
  await axios.put(`${constant.API_URL}/news/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  });
}
