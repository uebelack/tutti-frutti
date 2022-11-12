import { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * @default 'transparent'
   */
  color?: 'transparent';
}

export function IconButton({
  color = 'transparent',
  children,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'relative aspect-square rounded-full',
        {
          'text-white bg-transparent hover:bg-white hover:bg-opacity-10':
            color === 'transparent',
        },
        className
      )}
      {...rest}
    >
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full grid place-items-center">
        {children}
      </span>
    </button>
  );
}

export default IconButton;
