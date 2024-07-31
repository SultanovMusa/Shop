import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { GrClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isVisible,
  onClose,
  title,
  children,
  className = "",
  overlayClassName = "",
  contentClassName = "",
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={classNames(
            "fixed w-full h-[100vh] inset-0 z-50 overflow-y-auto",
            overlayClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <motion.div
              className="fixed inset-0 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
              ></div>
            </motion.div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <motion.div
              className={classNames(
                "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:align-middle sm:w-full p-4 z-[99999]",
                contentClassName,
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="w-full flex justify-between mb-2 pb-1 border-b-[1px] border-dashed border-gray-400">
                <h3 className="text-Gray text-lg font-medium">{title}</h3>
                <GrClose
                  onClick={onClose}
                  className="text-Gray w-5 h-5 cursor-pointer"
                />
              </div>
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default Modal;
