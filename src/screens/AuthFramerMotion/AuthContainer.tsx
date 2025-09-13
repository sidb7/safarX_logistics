import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./LoginComponent";
import Signup from "./SignUpComponent";
import { LARGE_LOGO } from "../../utils/ApiUrls";
import "./AuthContainerStyle.css";
export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  const spring = { type: "spring", stiffness: 90, damping: 14 };

  // form animation variants
  const formVariants = {
    hiddenLeft: { x: 100, opacity: 1 },
    hiddenRight: { x: -100, opacity: 1 },
    visible: { x: 0, opacity: 1 },
    exitLeft: { x: 100, opacity: 1 },
    exitRight: { x: -100, opacity: 1 },
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="relative w-full h-[100vh] rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* FORMS (with midway slide + fade) */}
        <div className="absolute inset-0 flex">
          {/* Left Slot → Signup */}
          <div className="w-1/2 grid place-items-center p-10 relative">
            <AnimatePresence mode="wait">
              {isLogin && (
                <motion.div
                  key="signup"
                  variants={formVariants}
                  initial="hiddenLeft"
                  animate="visible"
                  exit="exitLeft"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute w-full max-w-sm"
                >
                  <Signup />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Slot → Login */}
          <div className="w-1/2 grid place-items-center p-10 relative">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="hiddenRight"
                  animate="visible"
                  exit="exitRight"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute w-full max-w-sm"
                >
                  <Login />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* SLIDING OVERLAY PANEL */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full z-10 text-white"
          animate={{ x: isLogin ? "100%" : "0%" }} // left <-> right
          transition={spring}
        >
          <div className="relative w-full h-full">
            <div className="tealBack"></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center p-10 text-center">
              <motion.h1
                key={isLogin ? "welcome" : "hello"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="text-3xl font-bold text-[#160783]"
              >
                {isLogin ? (
                  "Welcome Back!"
                ) : (
                  <div className="text-4xl">
                    Logistics.{" "}
                    <span className="text-[#a99bfd]">Simplified.</span>{" "}
                    Amplified!
                  </div>
                )}
              </motion.h1>

              <p className="mt-3  text-[#160783]/90">
                {isLogin ? (
                  "To keep connected with us please login with your personal info"
                ) : (
                  <div className="text-start">
                    From first mile to last mile — one seamless journey.
                  </div>
                )}
              </p>

              <button
                onClick={() => setIsLogin((v) => !v)}
                className="mt-8 px-7 z-10 py-2.5 rounded-full  text-white border bg-[#160783] border-[#160783]  hover:border-[#160783] hover:bg-transparent hover:text-[#160783] duration-200 transition"
              >
                {isLogin ? "SIGN UP" : "SIGN IN"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
