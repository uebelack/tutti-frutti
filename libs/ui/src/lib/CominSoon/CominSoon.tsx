import cn from 'classnames';
import { ReactNode } from 'react';

export interface ComingSoonProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

export const ComingSoon = ({ className, children }: ComingSoonProps) => (
  <div className={cn('relative')}>
    {/*  eslint-disable-next-line max-len */}
    <span
      className={cn(
        'absolute top-4 right-4 py-1 px-2 rounded-3xl text-[8px] font-bold uppercase items-center bg-warning text-blue-dark border-2 border-blue  grid place-items-center',
        className
      )}
    >
      Coming Soon
    </span>
    <div className="opacity-50 pointer-events-none">{children}</div>
  </div>
);

export default ComingSoon;
