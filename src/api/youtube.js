import axios from 'axios';
import youtubeCredentials from './youtubeCredentials';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: youtubeCredentials
    }
});