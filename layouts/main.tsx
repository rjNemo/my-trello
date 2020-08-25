import {FC} from 'react';
import Head from 'next/head';

import {Divider, Row, Typography} from 'antd';
const {Title} = Typography;

import styles from '../styles/Home.module.css';

const MainLayout: FC<{title: string}> = ({title, children}) => {
  return (
    <Row>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{padding: 16, width: '100%'}}>
        <Title>{title}</Title>
        <Divider />
        {children}
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
