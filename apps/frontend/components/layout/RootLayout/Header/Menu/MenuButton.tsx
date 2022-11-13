import Link from 'next/link';
import { ElementType, ReactNode } from 'react';
import { Button } from 'UI';

export type MenuButtonProps = {
  Icon: ElementType;
  content: string | ReactNode | ReactNode[];
  onClick?: () => void;
  link?: string;
};

const MenuButton = ({ Icon, content, link, onClick }: MenuButtonProps) => (
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
    className="bg-transparent hover:bg-blue hover:bg-opacity-10 flex items-center gap-3 text-left justify-start !px-4 !rounded-none"
  >
    <Icon className="w-6" />
    <div>{content}</div>
  </Button>
);

export default MenuButton;
