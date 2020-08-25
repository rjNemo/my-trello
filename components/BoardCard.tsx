import React, {FC} from 'react';

import Link from 'next/link';

import {BoardType} from '../store/board/types';

import {Card, Typography} from 'antd';

const {Title} = Typography;

const BoardCard: FC<BoardType> = ({title, id}) => (
  <Link href="/boards/[bid]" as={`/boards/${id}`}>
    <a>
      <Card hoverable>
        <Title level={3}>{title}</Title>
      </Card>
    </a>
  </Link>
);

export default BoardCard;
