import { useState } from 'react';
import { LayoutAccount } from '../components';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';

import axios from './api/axios';

const Login = () => {
  const router = useRouter()
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const LOGIN_URL = '/auth/local';

  const onFinish = async (values) => {
    try {
      setLoadingSubmit(true)
      const response = await axios.post(
        LOGIN_URL,
				values,
				{ headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('user', JSON.stringify(response?.data));
      setLoadingSubmit(false)
      message.success('Login success');
      router.push('/')
		} catch (err) {
      setLoadingSubmit(false)
			if (!err?.response) {
        return message.error('No server response');
			}
      const messageErr = err.response?.data.error.message
      message.error(messageErr);
		}
  };

  return (
    <LayoutAccount>
      <div className='flex justify-center items-center py-8 min-h-screen'>
        <Card
          title="Login"
          className='w-full max-w-md'
        >
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="identifier"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username or Email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                disabled={loadingSubmit}
                loading={loadingSubmit}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
              <span className='pl-2'>
                Do not have an account? <a onClick={() => router.push('/register')}>register here</a>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </LayoutAccount>
  );
}

export default Login;