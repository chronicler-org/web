import { FC, ReactNode } from 'react';

interface RenderIfProps {
  children?: ReactNode;
  condition: boolean;
  otherwise?: ReactNode;
}
export const RenderIf: FC<RenderIfProps> = ({
  children,
  condition,
  otherwise,
}) => {
  return <> {condition ? children : otherwise}</>;
};
