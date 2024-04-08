import { Col as ColAntd, ColProps as ColAntdProps } from 'antd';
import { FC } from 'react';

export type ColProps = ColAntdProps & {};

export const Col: FC<ColProps> = (props) => {
  return <ColAntd {...props} />;
};
