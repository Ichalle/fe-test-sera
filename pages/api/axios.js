import axios from 'axios';

export default axios.create({
	baseURL: 'https://fe-technical-test.herokuapp.com/api',
});
