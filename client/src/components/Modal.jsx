import ReactDom from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-50 z-50"
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  w-2/3 h-3/4 bg-primary shadow-lg shadow-black rounded-lg"
      >
        <button
          className="fixed top-8 right-8 bg-black/80 rounded-lg p-1"
          onClick={onClose}
        >
          <IoCloseSharp size={30} />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
