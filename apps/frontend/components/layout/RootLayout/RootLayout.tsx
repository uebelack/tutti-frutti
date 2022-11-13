import { ReactNode } from 'react';
import Header from './Header/Header';

export interface RootLayoutProps {
  shouldShowHeader: boolean;
  children: ReactNode | ReactNode[];
}

export function RootLayout({ shouldShowHeader, children }: RootLayoutProps) {
  return (
    <div className="min-h-screen grid">
      {shouldShowHeader ? <Header /> : null}
      {children}
    </div>
  );
}

export default RootLayout;
