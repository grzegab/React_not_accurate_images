import axios from 'axios';
import unsplashCredentials from './unsplashCredentials';

export default axios.create({
   baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: unsplashCredentials
    }
});