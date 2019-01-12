import axios from 'axios';
import unsplashCredentials from './credentials';

export default axios.create({
   baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: unsplashCredentials
    }
});