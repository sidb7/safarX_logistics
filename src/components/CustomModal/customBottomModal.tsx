import React, { FC, ReactNode } from "react";
import Modal from "react-modal";

// Define modal properties
interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  contentLabel?: string;
  overlayClassName?: string;
  className?: string;
}

Modal.setAppElement("#root"); // replace #root with your app root id

// Create Modal Component
const MyModal: FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  contentLabel,
  overlayClassName,
  className,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={`fixed inset-0  bg-black bg-opacity-50 flex items-end justify-center ${overlayClassName} `}
      className={`bg-white rounded-t p-4 w-full  z-[9999] ${className}`}
      contentLabel={contentLabel || "Modal"}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
