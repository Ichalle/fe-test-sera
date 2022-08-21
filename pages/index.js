import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ListArticles, FormArticle } from '../components';
import { Button, Drawer, Descriptions, message } from 'antd';
import moment from 'moment';

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
	const [showDrawer, setShowDrawer] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const [selectedData, setSelectedData] = useState();

	const ARTICLE_URL = 'articles'

	useEffect(() => {
		authCheck();
	}, []);

	useEffect(() => {
		if (token) {
			fetchArticles()
		}
	}, [token]);

	async function fetchArticles (p, size) {
		try {
      setLoadingFetch(true)
      const response = await axios.get(
        ARTICLE_URL,
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

	async function onDelete(id) {
		try {
      const response = await axios.delete(
        `/articles/${id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
      );
      message.success('Delete article success');
			fetchArticles()
		} catch (err) {
      message.error('Delete article failed');
		}
	}

	async function submitData ({data, id}) {
		const url = id ? `${ARTICLE_URL}/${id}` : ARTICLE_URL
		const payload = {
			data
		}
		try {
      setLoadingFetch(true)
      const response = await axios.post(
        url,
				payload,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
      );
			setShowDrawer(false)
			message.success(`${id ? 'Update' : 'Create'} article success`);
      setLoadingFetch(false)
			fetchArticles()
		} catch (err) {
			message.error('Create article failed');
      setLoadingFetch(false)
		}
	}

	async function onChangePagination (page, pageSize) {
		setPage(page)
		setPageSize(pageSize)
		console.log(page, pageSize, 'page, pageSize,,,')
		fetchArticles(page, pageSize)
	}

	function authCheck () {
		const userData = localStorage.getItem('user')
		if (!userData) {
			router.push('/login')
		}
		const data = JSON.parse(userData)
		setToken(data?.jwt)
	}

	function onCloseDrawer () {
		setShowDetail(false)
		setSelectedData(null)
		setShowDrawer(false)
	}

	function onSelectList (data) {
		setSelectedData(data)
		setShowDetail(true)
		setShowDrawer(true)
	}

	function onCreate () {
		setSelectedData(null)
		setShowDrawer(true)
	}

	function onEdit (data) {
		setSelectedData(data)
		setShowDrawer(true)
	}

	function handleLogout () {
		localStorage.removeItem('user');
		router.push('/login')
	}

	return (
		<div className="p-4 w-full bg-blue-200">
			<div className="w-2/3 mx-auto">
				<div className='flex justify-between mb-8'>
					<div>
						<h1 className='mr-4'>Article Lists</h1>
						<Button type="primary" onClick={onCreate}>+ Create</Button>
					</div>
						<Button type="danger" onClick={handleLogout}>Logout</Button>
				</div>
				<ListArticles
					data={articleLists}
					page={page}
					total={total}
					loading={loadingFetch}
					onChangePagination={onChangePagination}
					onSelectList={onSelectList}
					onDelete={onDelete}
					onEdit={onEdit}
					reFetch={() => fetchArticles()}
				/>
			</div>
			<Drawer
        title={selectedData ? `Detail Articles - ID: ${selectedData.id}` : 'Create New Article'}
        width={720}
        onClose={onCloseDrawer}
        visible={showDrawer}
      >
				{
					showDetail && selectedData ? (
						<div>
							<Descriptions title="User Info" layout="vertical">
								<Descriptions.Item label="Title">{selectedData.attributes?.title}</Descriptions.Item>
								<Descriptions.Item label="Created">
									{selectedData.attributes?.createdAt? moment(selectedData.attributes.createdAt).format('DD MMM YYYY HH:mm') : '-'}
								</Descriptions.Item>
								<Descriptions.Item label="Updated">
									{selectedData.attributes?.updatedAt? moment(selectedData.attributes.updatedAt).format('DD MMM YYYY HH:mm') : '-'}
								</Descriptions.Item>
								<Descriptions.Item label="Content">
									{selectedData.attributes?.content}
								</Descriptions.Item>
							</Descriptions>
						</div>
					) : (
						<FormArticle
							loading={loadingFetch}
							submitData={submitData}
							selectedData={selectedData}
						/>
					)
				}
			</Drawer>
		</div>
	);
}
