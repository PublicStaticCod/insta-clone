import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://instagram-backend-mern.herokuapp.com/',
});

export default instance;
