import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ListArticles } from '../components';
import { Button, Drawer } from 'antd';

import axios from './api/axios';

export default Home;

function Home() {
	const router = useRouter()
	const [token, setToken] = useState('');
	const [loadingFetch, setLoadingFetch] = useState(false);
	const [articleLists, setArticleLists] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const LIST_URL = 'articles'

	useEffect(() => {
		authCheck();
	}, []);

	useEffect(() => {
		if (token) {
			fetchArticles()
		}
	}, [token]);

	function handleDrawerCreate () {

	}

	async function fetchArticles (p, size) {
		try {
      setLoadingFetch(true)
      const response = await axios.get(
        LIST_URL,
				{
					params: {
					'pagination[pageSize]': size || pageSize,
					'pagination[page]': p || page
					},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
      );
			setArticleLists(response.data?.data)
			setTotal(response.data?.meta.pagination.total)
      setLoadingFetch(false)
		} catch (err) {
      setLoadingFetch(false)
		}
	}

	async function onChangePagination (page, pageSize) {
		setPage(page)
		setPageSize(pageSize)
		fetchArticles(page, pageSize)
	}

	function authCheck () {
		const userData = localStorage.getItem('user')
		if (!userData) {
			router.push('/login')
		}
		const data = JSON.parse(userData)
		setToken(data.jwt)
	}

	return (
		<div className="p-4 w-full">
			<div className="w-2/3">
				<div className='flex justify-between mb-8'>
					<h1 className='mr-4'>Article Lists</h1>
					<Button type="primary" onClick={handleDrawerCreate}>+ Create</Button>
				</div>
				<ListArticles
					data={articleLists}
					page={page}
					total={total}
					loading={loadingFetch}
					onChangePagination={onChangePagination}
				/>
			</div>
		</div>
	);
}
