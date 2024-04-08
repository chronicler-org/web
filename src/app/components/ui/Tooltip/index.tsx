import { Tooltip as TooltipAntd, TooltipProps as TooltipAntdProps } from 'antd';
import { FC } from 'react';

export type TooltipProps = TooltipAntdProps & {};

export const Tooltip: FC<TooltipProps> = ({ placement = 'top', ...props }) => {
  return <TooltipAntd placement={placement} {...props} />;
};
