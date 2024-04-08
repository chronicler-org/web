import { Row as RowAntd, RowProps as RowAntdProps } from 'antd';
import { FC } from 'react';

export type RowProps = RowAntdProps & {};

export const Row: FC<RowProps> = (props) => {
  return <RowAntd {...props} />;
};
