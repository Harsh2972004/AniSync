import ReactDom from "react-dom";
import { motion } from "motion/react";
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-50 z-40"
      />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
        <div className=" relative w-2/3 h-3/4 bg-primary shadow-lg shadow-black rounded-lg">
          <button
            className="absolute top-8 right-8 bg-black/80 rounded-lg p-1"
            onClick={onClose}
          >
            <IoCloseSharp size={30} />
          </button>
          {children}
        </div>
      </motion.div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
