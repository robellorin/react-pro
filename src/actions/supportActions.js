import axios from 'axios';
import * as constant from 'src/constant';

export const getUsersWithNews = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.SUPPORT_REQUEST
  });

  await axios.get(`${constant.API_URL}/user/withNews`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
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
    .catch((error) => {
      dispatch({
        type: constant.SUPPORT_REQUEST_FAILED
      });
    });
};

export const getAllUsers = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.SUPPORT_REQUEST
  });

  await axios.get(`${constant.API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200 && res.data) {
        dispatch({
          type: constant.GET_USERS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: constant.SUPPORT_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.SUPPORT_REQUEST_FAILED
      });
    });
};

export const updateUser = (id, data) => async (dispatch) => {
  dispatch({
    type: constant.SUPPORT_REQUEST
  });
  const userData = JSON.parse(localStorage.getItem('user'));
  await axios.put(`${constant.API_URL}/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch(getAllUsers());
      }
    });
};

export const updateUsersWithNews = (id, newsId, news) => async (dispatch) => {
  dispatch({
    type: constant.SUPPORT_REQUEST
  });
  let createdNewsId = newsId;
  let response;

  if (!newsId) {
    response = await addNews(id, news);
    createdNewsId = response.data.id;
  } else {
    response = await updateNews(newsId, news);
  }

  if (response.status === 200) {
    window.$client.updateNews(response.data);
    dispatch({
      type: constant.SUPPORT_UPDATE_REQUEST_SUCCESS,
      userId: id,
      news,
      newsId: createdNewsId
    });
  } else {
    dispatch({
      type: constant.SUPPORT_REQUEST_FAILED
    });
  }
};

async function addNews(userId, news) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const data = {
    userId,
    news
  };
  const response = await axios.post(`${constant.API_URL}/news`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  });

  return response;
}

async function updateNews(id, news) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const data = {
    news
  };
  const response = await axios.put(`${constant.API_URL}/news/${id}`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  });

  return response;
}
