import { ReactNode } from 'react';
import { Header } from 'UI';

export interface RootLayoutProps {
  children: ReactNode | ReactNode[];
}

export function RootLayout(props: RootLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      {props.children}
    </div>
  );
}

export default RootLayout;
