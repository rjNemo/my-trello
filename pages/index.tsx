import {useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {fetchAllBoards} from '../store/board/thunks';

import MainLayout from '../layouts/main';

import NewBoardModal from '../components/NewBoardModal';
import BoardList from '../components/BoardList';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [fetchAllBoards, dispatch]);

  return (
    <MainLayout title="My Trello">
      <NewBoardModal />
      <BoardList />
    </MainLayout>
  );
}
