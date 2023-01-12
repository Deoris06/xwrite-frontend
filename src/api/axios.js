import axios from 'axios'
// import Axios from 'axios'


export default axios.create({
    baseURL: "http://phpstack-915447-3181078.cloudwaysapps.com",
    withCredentials: true
})
