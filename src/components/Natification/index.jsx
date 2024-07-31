import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { MdClose } from "react-icons/md";

const Notification = ({ children }) => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      {children}
    </>
  );
};

export default Notification;

// Custom toast function
export const customToast = (type, message) => {
  const COLORS = { success: "#70e000", error: "#f21b3f" };
  const icons = {
    success: <IoCheckmarkCircleSharp className="text-[#70e000] w-8 h-8" />,
    error: <MdOutlineError className="text-[#f21b3f] w-8 h-8" />,
  };
  const words = { success: "Успешно", error: "Ошибка" };

  toast.custom(
    (t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-sm xs:max-w-[230px] w-full bg-gray-50 shadow-xl rounded-md h-20 pointer-events-auto flex overflow-hidden"
          >
            <div style={{backgroundColor: COLORS[type]}} className={`w-1 h-20`}></div>
            <div className="w-full h-20 flex gap-4 items-center p-3 justify-between">
              {icons[type]}
              <div className="w-full mb-2">
                <p className="font-sans font-[500] text-lg">{words[type]}</p>
                <p className="font-[300] ">
                  {message}
                </p>
              </div>
              <MdClose
                onClick={() => toast.dismiss(t.id)}
                className="text-gray-500 cursor-pointer bg p-1 bg-gray-200 rounded-full min-w-[25px] !w-[25px] h-[25px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    { duration: 2000 }
  );
};
