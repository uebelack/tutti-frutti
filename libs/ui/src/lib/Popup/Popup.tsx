import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';
import { AnimationProps, motion } from 'framer-motion';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  children: ReactNode | ReactNode[];
  motionInitial?: AnimationProps['initial'];
  motionAnimate?: AnimationProps['animate'];
  motionExit?: AnimationProps['exit'];
}

export const Popup = ({
  isOpen,
  onClose,
  overlayClassName,
  className,
  motionInitial,
  motionAnimate,
  motionExit,
  children,
}: PopupProps) => (
  <div>
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayElement={(props, contentElement) => (
        // @ts-ignore
        <motion.div
          initial={motionInitial ?? { opacity: 0, x: '50%' }}
          animate={motionAnimate ?? { opacity: 1, x: 0 }}
          exit={motionExit ?? { opacity: 0, x: '-50%' }}
          transition={{ duration: 0.5 }}
          {...props}
          className={cn(
            '!bg-blue-dark !bg-opacity-25 grid place-items-center !top-16',
            overlayClassName
          )}
        >
          {contentElement}
        </motion.div>
      )}
      className={cn(
        'w-max min-w-[350px] max-h-[85vh] overflow-auto py-8 pl-4 pr-6 rounded-2xl bg-white outline-none',
        className
      )}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      // @ts-ignore
      appElement={document.querySelector('.app')}
    >
      <div>{children}</div>
    </ReactModal>
  </div>
);

export default Popup;
