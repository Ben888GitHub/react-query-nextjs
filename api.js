import axios from 'axios';

const fetchPosts = async (id) => {
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/posts`
	);

	return data;
};

const fetchPost = async (id) => {
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${id}`
	);

	return data;
};

export { fetchPosts, fetchPost };
