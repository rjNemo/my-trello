import React from 'react';

import MainLayout from '../layouts/main';

import NewBoardModal from '../components/NewBoardModal';
import BoardList from '../components/BoardList';

export default function Home() {
  return (
    <MainLayout>
      <NewBoardModal />
      <BoardList />
    </MainLayout>
  );
}
