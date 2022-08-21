import React from 'react';
import { Table, Pagination, Button } from 'antd';
import moment from 'moment';

const Actions = ({data}) => {
  return (
    <div>
      <Button className='mx-1' onClick={() => console.log(data, 'detail,,,')}>Detail</Button>
      <Button className='mx-1'>Edit</Button>
      <Button className='mx-1' danger>Delete</Button>
    </div>
  )
}

function ListArticles ({ data, page, total, onChangePagination, loading }) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'attributes',
      key: 'title',
      render: (a) => <span>{a.title}</span>,
    },
    {
      title: 'Created At',
      dataIndex: 'attributes',
      key: 'created',
      render: (a) => <span>{a.createdAt? moment(a.createdAt).format('DD MMM YYYY HH:mm') : '-'}</span>
    },
    {
      title: 'Updated At',
      dataIndex: 'attributes',
      key: 'updated',
      render: (a) => <span>{a.updatedAt? moment(a.updatedAt).format('DD MMM YYYY HH:mm') : '-'}</span>
    },
    {
      title: 'Action',
      render: (a) => <Actions data={a} />
    }
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ['none'],
        }}
        loading={loading}
      />
      <div className='flex justify-end'>
        <Pagination
          defaultCurrent={page}
          total={total}
          showSizeChanger={false}
          onChange={onChangePagination}
        />
      </div>
    </div>
  )
}

export {ListArticles}