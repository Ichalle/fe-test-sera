import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

function FormArticle ({selectedData, submitData, loading}) {
  console.log(selectedData, 'selectedData,,,,')
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title: selectedData ? selectedData.attributes?.title : null,
      content: selectedData ? selectedData.attributes?.content : null
    });
	}, [selectedData]);

  const onFinish = (values) => {
    const id = selectedData ? selectedData.id : null
    submitData({
      data: {
        title: values.title,
        content: values.content
      },
      id
    })
  };

  return (
    <Form
      name="basic"
      layout={'vertical'}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        remember: true,
      }}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input content!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export {FormArticle}