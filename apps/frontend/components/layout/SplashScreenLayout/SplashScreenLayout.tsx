import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Logo from '../../../public/Logo.png';
import BGDesktop from '../../../public/splash-bg-desktop.png';
import BGMobile from '../../../public/splash-bg-mobile.png';

export interface SplashScreenLayoutProps {
  noAnimation?: boolean;
  children: ReactNode | ReactNode[];
}

export const SplashScreenLayout = ({
  noAnimation,
  children,
}: SplashScreenLayoutProps) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    document.querySelector('.app').classList.add('text-white');

    setShowLogo(true);

    return () => {
      document.querySelector('.app').classList.remove('text-white');
      setShowLogo(false);
    };
  }, []);

  return (
    <div className="h-screen">
      <Image
        src={BGDesktop}
        alt="bg"
        priority
        placeholder="blur"
        quality={100}
        className="w-full h-full object-cover fixed inset-0 -z-50 hidden lg:block"
      />
      <Image
        src={BGMobile}
        alt="bg"
        priority
        placeholder="blur"
        quality={100}
        className="w-full h-full object-cover fixed inset-0 -z-50 lg:hidden"
      />
      <div className="relative container mx-auto h-full grid place-items-center">
        <div className="w-full text-center flex flex-col items-center gap-24">
          {showLogo && !noAnimation ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.2,
                  ease: [0.61, -0.03, 0.35, 1.76],
                }}
                className="w-full"
              >
                <Image
                  src={Logo}
                  alt="Tutti Frutti Logo"
                  priority
                  placeholder="blur"
                  quality={100}
                  className="w-3/5 md:w-1/2 max-w-[350px] mx-auto"
                />
              </motion.div>
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.2 }}
              >
                {children}
              </motion.div>
            </>
          ) : (
            <div className="w-full">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreenLayout;
