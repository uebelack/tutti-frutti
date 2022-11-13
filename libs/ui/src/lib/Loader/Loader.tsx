import cn from 'classnames';
import s from './Loader.module.css';

export interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
  <div className={cn(s.loader, className)} />
);

export default Loader;
