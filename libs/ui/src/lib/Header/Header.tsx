import { ExpandIcon, MenuIcon, ShrinkIcon } from 'libs/icons/src';
import IconButton from '../IconButton/IconButton';
import screenfull from 'screenfull';
import { useEffect, useState } from 'react';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [canFullScreen, setCanFullScreen] = useState(false);
  const [isFullscreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (screenfull.isEnabled) {
      setCanFullScreen(true);
    }

    const checkFullScreen = () => {
      if (screenfull.isFullscreen) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('resize', checkFullScreen);

    return () => {
      window.removeEventListener('resize', checkFullScreen);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto p-8 flex items-center gap-8">
        <IconButton className="w-8">
          <MenuIcon className="w-2/3" />
        </IconButton>
        {canFullScreen ? (
          <IconButton
            className="w-8 ml-auto"
            onClick={() =>
              screenfull.toggle(document.getElementsByClassName('app')[0], {
                // navigationUI: 'hide',
              })
            }
          >
            {isFullscreen ? (
              <ShrinkIcon className="w-2/3" />
            ) : (
              <ExpandIcon className="w-2/3" />
            )}
          </IconButton>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
