import React from 'react';
import { Table, Pagination, Button, Popconfirm, message } from 'antd';
import moment from 'moment';

const Actions = ({data, onSelectList, onDelete, onEdit}) => {
  function confirm () {
    onDelete(data.id)
  }
  return (
    <div>
      <Button className='mx-1' onClick={() => onSelectList(data)}>Detail</Button>
      <Button className='mx-1' onClick={() => onEdit(data)}>Edit</Button>
      <Popconfirm
        title="Are you sure to delete this article?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button className='mx-1' danger>Delete</Button>
      </Popconfirm>
    </div>
  )
}

function ListArticles ({
  data,
  page,
  total,
  onChangePagination,
  loading,
  onSelectList,
  reFetch,
  onDelete,
  onEdit
}) {
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
      render: (a) =>
        <Actions
          data={a}
          onSelectList={onSelectList}
          reFetch={reFetch}
          onDelete={onDelete}
          onEdit={onEdit}
        />
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