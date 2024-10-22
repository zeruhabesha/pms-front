import axios from 'axios'

export default axios.create({
  baseURL: 'https://pms-backend-sncw.onrender.com/api/v1',
  //   baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
})
