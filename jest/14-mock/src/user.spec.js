// user.spec.js
// import axios from 'axios';
const axios = require('axios');

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}


jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  return Users.all().then(data => expect(data).toEqual(users));
});
