import ReactModal from "react-modal";

interface CenterModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  children?: any;
  className?: string;
  shouldCloseOnOverlayClick?: boolean;
  contentLabel?: string;
}

const CenterModal: React.FC<CenterModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  className = "",
  contentLabel,
  shouldCloseOnOverlayClick,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`${className} customScroll outline-none  fixed inset-0 m-auto w-3/6 flex active flex-col justify-center items-center rounded-lg overflow-hidden bg-white h-5/6`}
      overlayClassName="fixed z-20 inset-0 bg-gray-800 bg-opacity-50"
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      contentLabel={contentLabel || "Modal"}
    >
      {children}
    </ReactModal>
  );
};

export default CenterModal;
