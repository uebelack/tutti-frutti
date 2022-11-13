import { useAuth0 } from '@auth0/auth0-react';
import { ControlledMenu } from '@szhsin/react-menu';
import cn from 'classnames';
import {
  AwardIcon,
  CopyIcon,
  HistoryIcon,
  InfoCircleIcon,
  LeaderboardIcon,
  LogoutIcon,
  SettingsIcon,
  ShareIcon,
} from 'icons';
import Image from 'next/image';
import Drawer from 'rc-drawer';
import { useEffect, useRef, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Button, ComingSoon, IconButton } from 'UI';
import MenuButton from './MenuButton';

export interface MenuProps {
  closeMenu: () => void;
}

const MenuContent = ({ closeMenu }: MenuProps) => {
  const { user, logout } = useAuth0();

  const [copied, setCopied] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const anchorRef = useRef<HTMLButtonElement>(null);
  const shareAnchorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer;

    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const ShareButtons = (size: number) => (
    <>
      <EmailShareButton url={window.location.origin}>
        <EmailIcon size={size} />
      </EmailShareButton>
      <FacebookShareButton url={window.location.origin}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <LinkedinShareButton url={window.location.origin}>
        <LinkedinIcon size={size} />
      </LinkedinShareButton>
      <RedditShareButton url={window.location.origin}>
        <RedditIcon size={size} />
      </RedditShareButton>
      <TwitterShareButton url={window.location.origin}>
        <TwitterIcon size={size} />
      </TwitterShareButton>
      <WhatsappShareButton url={window.location.origin}>
        <WhatsappIcon size={size} />
      </WhatsappShareButton>
    </>
  );

  return user ? (
    <>
      <div className="flex items-center mb-10 lg:mb-8 ml-3 mr-4 lg:mx-4">
        <div className="w-16 lg:w-11 aspect-square rounded-full overflow-hidden mr-6 lg:mr-2 shrink-0">
          <Image
            src={user.picture}
            alt={user.name}
            width={70}
            height={70}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="shrink-0 mr-4">
          <p className="text-body-lg">{user.name}</p>
          <p className="text-label-sm">Username: {user.nickname}</p>
          {/* <p className="text-label-sm">Top Score: 300 points</p> */}
        </div>
        <IconButton
          className="w-10 lg:w-8 ml-auto lg:ml-0 !text-current hover:!bg-blue hover:!bg-opacity-10"
          onClick={() => {
            window.navigator.clipboard.writeText(user.nickname).then(() => {
              setCopied(true);
            });
          }}
          ref={anchorRef}
        >
          <CopyIcon className="w-1/2" />
        </IconButton>
        <ControlledMenu
          state={copied ? 'open' : 'closed'}
          anchorRef={anchorRef}
          offsetY={5}
          arrow
          role="tooltip"
          align="center"
          direction="bottom"
          menuClassName={({ state }) =>
            cn(
              '!bg-secondary-10 !text-white !rounded-md !p-2 !origin-top-center !w-min !min-w-0 !shadow-none text-label-sm text-center',
              {
                '!animate-fade-in': state === 'opening',
                '!animate-fade-out': state === 'closing',
              }
            )
          }
          arrowClassName="!bg-secondary-10 !border-none"
          transition
        >
          Copied!
        </ControlledMenu>
      </div>

      <div className="flex flex-col gap-4">
        <MenuButton
          Icon={LeaderboardIcon}
          content="Leaderboard"
          link="/leaderboard"
          onClick={closeMenu}
        />
        <div>
          <Button
            color="white"
            className="bg-transparent hover:!bg-blue hover:!bg-opacity-10 flex items-center gap-3 text-left justify-start !px-4 !rounded-none !w-full"
            ref={shareAnchorRef}
            onClick={() => setOpenShare(true)}
          >
            <ShareIcon className="w-6" />
            <div>Share with Friends</div>
          </Button>
          <ControlledMenu
            transition
            arrow
            state={openShare ? 'open' : 'closed'}
            anchorRef={shareAnchorRef}
            onPointerLeave={() => setOpenShare(false)}
            onClose={() => setOpenShare(false)}
            menuClassName={({ state }) =>
              cn(
                '!bg-off-white !text-black !rounded-md !p-2 !origin-top-left !w-max z-50 flex flex-wrap gap-2',
                {
                  '!animate-fade-in': state === 'opening',
                  '!animate-fade-out': state === 'closing',
                }
              )
            }
            direction="right"
            arrowClassName="!bg-off-white !border-none"
            className="hidden lg:block"
          >
            {ShareButtons(32)}
          </ControlledMenu>
          <Drawer
            open={openShare}
            onClose={() => setOpenShare(false)}
            width="100%"
            placement="bottom"
            rootClassName="fixed inset-0 lg:hidden"
            maskClassName="bg-primary-30 bg-opacity-10 h-full"
            motion={(placement: string) => ({
              motionAppear: true,
              motionName: `panel-motion-${placement}`,
            })}
            push={{
              distance: 100,
            }}
            destroyOnClose
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl py-12 px-4 shadow-[0_-10px_10px_#E8DEF8]  flex justify-around"
          >
            {ShareButtons(40)}
          </Drawer>
        </div>

        <ComingSoon>
          <MenuButton
            Icon={HistoryIcon}
            content="History"
            link="/history"
            onClick={closeMenu}
            disabled
          />
        </ComingSoon>
        <ComingSoon>
          <MenuButton
            Icon={AwardIcon}
            content="Achievements"
            link="/achievements"
            onClick={closeMenu}
          />
        </ComingSoon>
        <ComingSoon>
          <MenuButton
            Icon={SettingsIcon}
            content="Settings"
            link="/settings"
            onClick={closeMenu}
          />
        </ComingSoon>
        <ComingSoon>
          <MenuButton
            Icon={InfoCircleIcon}
            content="About Tutti Frutti"
            link="/about"
            onClick={closeMenu}
            className="lg:w-[30ch]"
          />
        </ComingSoon>
        <MenuButton
          Icon={LogoutIcon}
          content="Logout"
          onClick={() => {
            logout();
            closeMenu();
          }}
        />
      </div>
    </>
  ) : null;
};

export default MenuContent;
