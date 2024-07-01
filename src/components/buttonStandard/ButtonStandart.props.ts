import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonStandardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
