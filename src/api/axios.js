import axios from 'axios'
// import Axios from 'axios'


export default axios.create({
    baseURL: "https://phpstack-915447-3181078.cloudwaysapps.com",
    withCredentials: true
})
