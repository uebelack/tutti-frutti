import cn from 'classnames';
import React, { ElementType, forwardRef } from 'react';
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
  /**
   * @default 'button'
   */
  Component?: ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = 'blue',
      shape = 'default',
      className,
      Component = 'button',
      children,
      ...rest
    },
    ref,
  ) => (
    <Component
      role="button"
      className={cn(s.root, s[color], s[shape], className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  ),
);

Button.displayName = 'Button';

export default Button;
