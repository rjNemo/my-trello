import {CheckCircleTwoTone} from '@ant-design/icons';
import {FC} from 'react';

type Props = {isDone: boolean; onClick: (event: React.MouseEvent) => void};

const TaskValidationIcon: FC<Props> = ({isDone, onClick}) => {
  const color = isDone ? '#808080' : '#52c41a';
  return <CheckCircleTwoTone twoToneColor={color} onClick={onClick} />;
};

export default TaskValidationIcon;
