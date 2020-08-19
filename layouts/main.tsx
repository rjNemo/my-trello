import React from 'react';
import Head from 'next/head';

import {Divider, Row, Typography} from 'antd';
const {Title} = Typography;

import styles from '../styles/Home.module.css';

const MainLayout = (props: any) => {
  return (
    <Row>
      <Head>
        <title>My Trello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{padding: 16, width: '100%'}}>
        <Title> My Trello</Title>
        <Divider />
        {props.children}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Row>
  );
};

export default MainLayout;
