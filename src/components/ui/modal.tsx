'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from './button';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-background/80 backdrop-blur-sm outline-none focus:outline-none">
        <div className="relative mx-auto my-6 h-full w-3/4 md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          {/* CONTENT */}
          <div
            className={`
          translate
          h-full
          duration-300
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white dark:bg-neutral-900 shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              {/* HEADER */}
              <div className="relative flex items-center justify-center rounded-t border-b-[1px] pt-4">
                <button
                  onClick={handleClose}
                  className="absolute left-9 border-0 p-1 transition hover:opacity-70"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryActionLabel ? (
                    <Button
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      variant="outline"
                    >
                      {secondaryActionLabel}
                    </Button>
                  ) : null}
                  {actionLabel ? (
                    <Button disabled={disabled} onClick={handleSubmit}>
                      {actionLabel}
                    </Button>
                  ) : null}
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;