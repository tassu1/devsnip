const axios = require('axios');
axios.post('http://localhost:5000/api/auth/register', {
  name: "Test",
  email: "testt@example.com", 
  password: "test123"
})
.then(res => console.log(res.data))
.catch(err => console.error(err.response?.data || err.message));