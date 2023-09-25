import ReactModal from "react-modal";
import "./modalStyle.css";
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
      closeTimeoutMS={200}
      className={`${className} fixed outline-none inset-y-0 right-0 bg-white w-1/3  ${wrapperClassName}`}
      overlayClassName="fixed z-20 inset-0 "
    >
      {children}
    </ReactModal>
  );
};

export default RightSideModal;
