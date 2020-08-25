import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import {selectBoardByID} from '../../store/board/selectors';

import MainLayout from '../../layouts/main';

import {Typography} from 'antd';
const {Title, Text} = Typography;
import {HomeOutlined} from '@ant-design/icons';

import NewListModal from '../../components/NewListModal';
import Listings from '../../components/Listings';

const renderBody = (bid: string | string[] | undefined): JSX.Element => {
  const errorComponent = <div>Error</div>;

  if (!bid) return errorComponent;

  const id = typeof bid !== 'string' ? bid[0] : bid;

  const board = useSelector(selectBoardByID(id));

  return !!board ? (
    <>
      <Title level={2}>{board.title}</Title>
      <NewListModal boardID={id} />
      <Listings {...board} />
    </>
  ) : (
    errorComponent
  );
};

const Board = () => {
  const router = useRouter();
  const {bid} = router.query;

  return (
    <MainLayout>
      <Link href="/">
        <a>
          <HomeOutlined />
          <Text> Go Back Home</Text>
        </a>
      </Link>
      {renderBody(bid)}
    </MainLayout>
  );
};

export default Board;
