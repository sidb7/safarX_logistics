import ReactModal from "react-modal";

interface RightSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const RightSideModal: React.FC<RightSideModalProps> = ({
  isOpen,
  onClose,
  children,
  wrapperClassName,
  className,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`${className} fixed  inset-y-0 right-0  bg-white w-1/3 ${wrapperClassName}`}
      overlayClassName="fixed z-20 inset-0 bg-gray-800 bg-opacity-50"
    >
      {children}
    </ReactModal>
  );
};

export default RightSideModal;
