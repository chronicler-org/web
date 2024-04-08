import type { TableColumnsType as TableColumnsAntdType } from 'antd';
import { Table as TableAntd } from 'antd';

const { Column: ColumnAntd } = TableAntd;

export type TableColumnsType = TableColumnsAntdType & {};
export const Column = ColumnAntd;
