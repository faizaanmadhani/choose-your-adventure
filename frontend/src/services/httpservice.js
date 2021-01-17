import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
	const exError = error.response && error.response.status >= 400 && error.response.status <= 500;
	if (!exError) {
		console.error('something unexpected happened with httpservice');
	}
	return Promise.reject(error);
});

export default { get: axios.get, post: axios.post, delete: axios.delete, put: axios.put, patch: axios.patch };
//wihtout assigning a name, we can just import w/e from this file.
