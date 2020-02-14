import uuid from 'uuid/v1';
import mock from 'src/utils/mock';

mock.onPost('/api/login').reply((config) => {
  const data = JSON.parse(config.data);
  if (data.username === 'hamleta' && data.password === '123456') {
    const val = {
      userData: {
        id: uuid(),
        first_name: 'Hamlet',
        last_name: 'Ayvazyan',
        email: 'a@a.com',
        username: 'hamleta83',
        role: 'client'
      }
    }
    return [200,val];
  } else {
    return [200, {
      error: 'invalid user'
    }];
  }

});

