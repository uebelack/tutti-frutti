import cn from 'classnames';
import React from 'react';
import s from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @default 'blue
   */
  color?: 'blue' | 'white' | 'outlined' | 'purple';
  /**
   * @default 'default'
   */
  shape?: 'rounded' | 'default' | 'pill';
}

export function Button({
  color = 'blue',
  shape = 'default',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(s.root, s[color], s[shape], className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;
