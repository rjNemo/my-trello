import React, {useState, FC} from 'react';

import {useDispatch} from 'react-redux';
import {createOneBoard} from '../store/board/thunks';

import {Modal, Button, Input, Row} from 'antd';

type ModalState = {
  modalText: string;
  boardName: string;
  visible: boolean;
  confirmLoading: boolean;
};

const initModalState: ModalState = {
  modalText: 'New Board',
  visible: false,
  confirmLoading: false,
  boardName: '',
};

const NewBoardModal: FC = () => {
  const [state, setState] = useState<ModalState>(initModalState);
  const dispatch = useDispatch();

  /** Handle Modal visibility */
  const showModal = () => setState(state => ({...state, visible: true}));

  /** Handle validatation */
  const handleOk = () => {
    setState(state => ({
      ...state,
      modalText: 'The new board is created...',
      confirmLoading: true,
    }));

    dispatch(createOneBoard(state.boardName));

    setTimeout(() => {
      setState(initModalState);
    }, 2000);
  };

  /** Handle cancellation */
  const handleCancel = () => setState(state => ({...state, visible: false}));

  return (
    <Row>
      <Button type="primary" onClick={showModal} size="large">
        New Board
      </Button>
      <Modal
        title="Create a New Board"
        visible={state.visible}
        onOk={handleOk}
        confirmLoading={state.confirmLoading}
        onCancel={handleCancel}
      >
        <p>{state.modalText}</p>
        <Input
          placeholder="Board Name"
          value={state.boardName}
          onChange={e => setState({...state, boardName: e.target.value})}
          autoFocus
        />
      </Modal>
    </Row>
  );
};

export default NewBoardModal;
