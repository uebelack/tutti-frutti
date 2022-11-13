import { createContext, ReactNode, useContext, useState } from 'react';
import RootLayout from '../layout/RootLayout/RootLayout';

const RootContext = createContext({
  showHeader: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setShowHeader: (showHeader: boolean) => {},
});

export const useRootContext = () => useContext(RootContext);

const RootLayoutProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [showHeader, setShowHeader] = useState(true);

  const setHeaderVisibility = (value: boolean) => {
    setShowHeader(value);
  };

  return (
    <RootContext.Provider
      value={{
        showHeader,
        setShowHeader: setHeaderVisibility,
      }}
    >
      <RootLayout shouldShowHeader={showHeader}>{children}</RootLayout>
    </RootContext.Provider>
  );
};

export default RootLayoutProvider;
