import axios from 'axios'
const http = axios.create({
    baseURL:'http://localhost:3001/web/api'
})

export default http