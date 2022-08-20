import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function LayoutAccount ({ children }) {
  return (
    <>
      <Layout className='!min-h-screen'>
        <Content>{children}</Content>
      </Layout>
    </>
  )
}

export {LayoutAccount}