import { ReactNode, HTMLAttributes } from 'react';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}