import { useRouter } from 'next/router';
import { fetchPost } from '../../api';
import { useQuery } from 'react-query';
import axios from 'axios';

function Post({ pageData }) {
	const router = useRouter();
	const { id } = router.query;

	const { data, isLoading, error } = useQuery(
		['posts', id],
		() => fetchPost(id),
		{
			initialData: pageData,
			enabled: !!id,
			refetchOnWindowFocus: false,
			keepPreviousData: true
		}
	);

	isLoading && <p>Loading...</p>;

	error && <p>Error!</p>;

	return (
		<>
			{data && (
				<>
					<h3>{data?.title}</h3>
					<h3>{data?.body}</h3>
				</>
			)}
		</>
	);
}

export default Post;

export const getStaticProps = async ({ params }) => {
	console.log(params.id);

	const pageData = await fetchPost(params.id);

	// console.log(pageData);

	return {
		props: {
			pageData,
			params
		}
		// revalidate: 60
	};
};

export const getStaticPaths = async () => {
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/posts`
	);
	// console.log(data.slice(0, 5));
	const paths = data.map((post) => ({
		params: { id: post.id.toString() }
	}));

	return {
		paths,
		fallback: false
	};
};
