import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';
import { motion } from 'framer-motion';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  children: ReactNode | ReactNode[];
}

export const Popup = ({
  isOpen,
  onClose,
  overlayClassName,
  className,
  children,
}: PopupProps) => (
  <div>
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayElement={(props, contentElement) => (
        // @ts-ignore
        <motion.div
          initial={{ opacity: 0, x: '50%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-50%' }}
          transition={{ duration: 0.5 }}
          {...props}
          className={cn(
            '!bg-blue-dark !bg-opacity-25 grid place-items-center',
            overlayClassName
          )}
        >
          {contentElement}
        </motion.div>
      )}
      className={cn(
        'w-max min-w-[350px] py-8 pl-4 pr-6 rounded-2xl bg-white outline-none',
        className
      )}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <div>{children}</div>
    </ReactModal>
  </div>
);

export default Popup;
