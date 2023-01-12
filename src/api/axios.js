import axios from 'axios'
// import Axios from 'axios'


export default axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true
})