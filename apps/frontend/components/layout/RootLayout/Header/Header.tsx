import { useAuth0 } from '@auth0/auth0-react';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import cn from 'classnames';
import { CloseIcon, ExpandIcon, MenuIcon, ShrinkIcon } from 'libs/icons/src';
import { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';
import { IconButton } from 'UI';
import Drawer from 'rc-drawer';
import MenuContent from './Menu/Menu';

export const Header = () => {
  const { user } = useAuth0();

  const [canFullScreen, setCanFullScreen] = useState(false);
  const [isFullscreen, setIsFullScreen] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const anchorRef = useRef<HTMLButtonElement>();

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
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div
          className={cn('container mx-auto p-8 flex items-center gap-8', {
            'pl-4 lg:pl-8': openMenu,
          })}
        >
          {user && (
            <IconButton
              className="w-8"
              // @ts-ignore
              ref={anchorRef}
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              {openMenu ? (
                <CloseIcon
                  className={cn('w-1/2', {
                    'text-primary-30 lg:text-white': openMenu,
                  })}
                />
              ) : (
                <MenuIcon className="w-2/3" />
              )}
            </IconButton>
          )}

          {canFullScreen ? (
            <IconButton
              className="w-8 ml-auto"
              onClick={() =>
                screenfull.toggle(document.getElementsByClassName('app')[0], {
                  navigationUI: 'hide',
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

      {/* Desktop Menu */}
      <ControlledMenu
        // @ts-ignore
        anchorRef={anchorRef}
        state={openMenu ? 'open' : 'closed'}
        transition
        menuClassName={({ state }) =>
          cn(
            '!bg-off-white !text-black !rounded-md !py-6 !px-0 !origin-top-left !w-max z-50',
            {
              '!animate-fade-in': state === 'opening',
              '!animate-fade-out': state === 'closing',
            }
          )
        }
        offsetY={5}
        initialMounted
        className="hidden lg:block"
      >
        <MenuContent closeMenu={() => setOpenMenu(false)} />
      </ControlledMenu>

      {/* Mobile Menu */}
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        width="100%"
        placement="left"
        rootClassName="fixed inset-0 lg:hidden"
        mask={false}
        motion={(placement: string) => ({
          motionAppear: true,
          motionName: `panel-motion-${placement}`,
        })}
        destroyOnClose
        className="bg-white h-screen pt-24 pb-10 px-0"
        push={{
          distance: 0,
        }}
      >
        <MenuContent closeMenu={() => setOpenMenu(false)} />
      </Drawer>
    </>
  );
};

export default Header;
