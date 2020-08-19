import React, {FC, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Card, Input, List, Typography} from 'antd';

import {addTaskToList, toggleValidateTaskByID} from '../store/board';
import {BoardType} from '../store/board/types';

import TaskValidationIcon from './TaskValidationIcon';

const Listings: FC<BoardType> = ({lists, id: bid}) => {
  const newTaskName = useRef<string>('');
  const dispatch = useDispatch();

  const handleSubmit = (lid: number) => (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    dispatch(addTaskToList({bid, lid, taskName: newTaskName.current}));
  };

  const toggleValidation = (taskID: number, listID: number) => (
    e: React.MouseEvent,
  ) => {
    dispatch(toggleValidateTaskByID({boardID: bid, listID, taskID}));
    console.log('clicked');
  };

  return (
    <div style={{marginTop: 16}}>
      <List
        grid={{gutter: 16, column: 4}}
        dataSource={lists}
        renderItem={list => (
          <List.Item>
            <Card title={list.title}>
              <form onSubmit={handleSubmit(list.id)}>
                <Input
                  placeholder="New Task"
                  onChange={e => (newTaskName.current = e.target.value)}
                />
              </form>
              <List
                dataSource={list.tasks}
                renderItem={task => (
                  <List.Item
                    actions={[
                      <TaskValidationIcon
                        isDone={task.isDone}
                        onClick={toggleValidation(task.id, list.id)}
                      />,
                    ]}
                  >
                    <Typography.Text
                      delete={task.isDone}
                      disabled={task.isDone}
                    >
                      {task.value}
                    </Typography.Text>
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Listings;
