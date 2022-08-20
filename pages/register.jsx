import { useState } from 'react';
import { LayoutAccount } from '../components';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <LayoutAccount>
      <div className='flex justify-center items-center py-8 min-h-screen'>
        <Card
          title="Register"
          className='w-full max-w-md'
        >
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,50}$/,
                  message: 'Please enter Lower Case, Upper Case, Symbol, Number, and minimum 8 characters',
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
                Register
              </Button>
              <span className='pl-2'>
                have an account? <a onClick={() => router.push('/login')}>login</a>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </LayoutAccount>
  );
}

export default Register;