import cn from 'classnames';
import { ElementType, forwardRef, HTMLAttributes } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * @default 'blue
   */
  color?: 'blue' | 'white';
  /**
   * @default 'default'
   */
  shape?: 'rounded' | 'default';
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
    ref
  ) => {
    return (
      <Component
        role="button"
        className={cn(
          {
            'bg-white text-black': color === 'white',
            'bg-blue-dark text-white': color === 'blue',
            'rounded-md  py-3.5': shape === 'default',
            'rounded-4xl py-2.5': shape === 'rounded',
          },
          'px-6 transition-colors duration-200 hover:bg-blue hover:bg-opacity-10',
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
