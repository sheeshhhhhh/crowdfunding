import axios from 'axios';

const axiosFetch = axios.create({
    baseURL: 'http://localhost:5000/api',
}) 

/** request interceptor to add the access token to the request header
 *  every time a request is made
 *  the headers i in bearer token format
 * 
 *  access_token: use for authentication
 *  refresh_token: use to get a new access token
 */
axiosFetch.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    config.headers.RefreshToken = localStorage.getItem('refresh_token');

    return config
}, (error) => {
    return Promise.reject(error)
})

axiosFetch.interceptors.response.use((response) => {
    return response
}, async(error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refresh_token = localStorage.getItem('refresh_token');

        const response = await axiosFetch.post('/auth/refreshToken', {
            refreshToken: refresh_token
        })

        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        axiosFetch.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

        return axiosFetch(originalRequest);
    }

    return Promise.reject(error)
})

export default axiosFetch;