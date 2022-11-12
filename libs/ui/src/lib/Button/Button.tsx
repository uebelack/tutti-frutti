import cn from 'classnames';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @default 'blue
   */
  color?: 'blue' | 'white';
  /**
   * @default 'default'
   */
  shape?: 'rounded' | 'default';
}

export function Button({
  color = 'blue',
  shape = 'default',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        {
          'bg-white text-black hover:bg-opacity-80': color === 'white',
          'bg-blue-dark text-white hover:bg-blue': color === 'blue',
          'rounded-md  py-3.5': shape === 'default',
          'rounded-4xl py-2.5': shape === 'rounded',
        },
        'px-6 transition-colors duration-200',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
