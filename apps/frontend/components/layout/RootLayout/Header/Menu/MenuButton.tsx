import Link from 'next/link';
import { ElementType, ReactNode } from 'react';
import { Button } from 'UI';
import cn from 'classnames';

export type MenuButtonProps = {
  Icon: ElementType;
  content: string | ReactNode | ReactNode[];
  onClick?: () => void;
  link?: string;
  disabled?: boolean;
  className?: string;
};

const MenuButton = ({
  Icon,
  content,
  link,
  onClick,
  disabled,
  className,
}: MenuButtonProps) => (
  <Button
    color="white"
    {...(link
      ? {
          Component: Link,
          // @ts-ignore
          href: '/leaderboard',
        }
      : {})}
    onClick={onClick}
    className={cn(
      'bg-transparent hover:!bg-blue hover:!bg-opacity-10 flex items-center gap-3 text-left justify-start !px-4 !rounded-none disabled:!opacity-50',
      className
    )}
    disabled={disabled}
  >
    <Icon className="w-6" />
    <div>{content}</div>
  </Button>
);

export default MenuButton;
