import ReactModal from "react-modal";

interface CenterSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

const CenterSideModal: React.FC<CenterSideModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`${className} fixed inset-0 m-auto w-3/6 flex flex-col justify-center items-center rounded-lg overflow-hidden bg-white h-5/6`}
      overlayClassName="fixed z-20 inset-0 bg-gray-800 bg-opacity-50"
    >
      {children}
    </ReactModal>
  );
};

export default CenterSideModal;
