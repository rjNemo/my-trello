import React, {useState, FC} from 'react';

import {useDispatch} from 'react-redux';
import {addListToBoard, fetchAllBoards} from '../store/board/thunks';

import {Modal, Button, Input, Row} from 'antd';

type ModalState = {
  modalText: string;
  boardName: string;
  visible: boolean;
  confirmLoading: boolean;
};

const initModalState: ModalState = {
  modalText: 'List Title',
  visible: false,
  confirmLoading: false,
  boardName: '',
};

const NewListModal: FC<{boardID: string}> = ({boardID}) => {
  const [state, setState] = useState<ModalState>(initModalState);
  const dispatch = useDispatch();

  /** Handle Modal visibility */
  const showModal = () => setState(state => ({...state, visible: true}));

  /** Handle validatation */
  const handleOk = () => {
    setState(state => ({
      ...state,
      modalText: 'The new list is being created...',
      confirmLoading: true,
    }));

    dispatch(
      addListToBoard({
        bid: boardID,
        title: state.boardName,
      }),
    );
    dispatch(fetchAllBoards());

    setTimeout(() => {
      setState(initModalState);
    }, 2000);
  };

  /** Handle cancellation */
  const handleCancel = () => setState(state => ({...state, visible: false}));

  return (
    <Row>
      <Button type="primary" onClick={showModal} size="large">
        Add a list
      </Button>
      <Modal
        title="Create a New List"
        visible={state.visible}
        onOk={handleOk}
        confirmLoading={state.confirmLoading}
        onCancel={handleCancel}
      >
        <p>{state.modalText}</p>
        <Input
          placeholder="List Name"
          value={state.boardName}
          onChange={e => setState({...state, boardName: e.target.value})}
          autoFocus
        />
      </Modal>
    </Row>
  );
};

export default NewListModal;
