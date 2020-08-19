import React, {FC} from 'react';

import {useSelector} from 'react-redux';
import {selectBoards} from '../store/board/selectors';

import BoardCard from './BoardCard';

import {List} from 'antd';

const BoardList: FC = () => {
  const boards = useSelector(selectBoards);
  return (
    <div style={{marginTop: 16}}>
      <List
        grid={{gutter: 16, column: 4}}
        dataSource={boards}
        renderItem={item => (
          <List.Item>
            <BoardCard {...item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default BoardList;
