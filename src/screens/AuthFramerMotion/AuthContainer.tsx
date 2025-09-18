import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./LoginComponent";
import Signup from "./SignUpComponent";
import { LARGE_LOGO } from "../../utils/ApiUrls";
import "./AuthContainerStyle.css";
import ForgotPassword from "./ForgotPassword";
export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(false);
  const [forgotPasswordON, setForgotPasswordON] = useState(false);
  const spring = { type: "spring", stiffness: 50, damping: 14 };

  // form animation variants
  const formVariants = {
    hiddenLeft: {
      x: 100,
      opacity: 0,
    },
    hiddenRight: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { duration: 1, ease: "easeOut" }, // 👈 slide duration
        opacity: { duration: 0.3, ease: "linear" }, // 👈 fade duration
      },
    },
    exitLeft: {
      x: 800,
      opacity: 0,
      transition: {
        x: { duration: 0.9, ease: "easeIn" },
        opacity: { duration: 0.5 },
      },
    },
    exitRight: {
      x: -800,
      opacity: 0,
      transition: {
        x: { duration: 0.9, ease: "easeIn" },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="py-2 z-20 absolute flex w-40 top-0 start-0">
        <img src={LARGE_LOGO} alt="" />
      </div>
      <div className="login-backdrop relative w-full h-[100vh] rounded-2xl overflow-hidden shadow-2x">
        {/* FORMS (with midway slide + fade) */}
        <div className="absolute inset-0 flex">
          {/* Left Slot → Signup */}
          <div className="w-1/2 grid place-items-center p-5 relative">
            <AnimatePresence>
              {isLogin && (
                <motion.div
                  key="signup"
                  variants={formVariants}
                  initial="hiddenLeft"
                  animate="visible"
                  exit="exitLeft"
                  className="absolute w-full max-w-md"
                >
                  <Signup />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Slot → Login */}
          <div className="w-1/2 grid place-items-center p-5 relative">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="hiddenRight"
                  animate="visible"
                  exit="exitRight"
                  className="absolute w-full  max-w-md"
                >
                  {forgotPasswordON ? (
                    <ForgotPassword setForgotPasswordON={setForgotPasswordON} />
                  ) : (
                    <Login setForgotPasswordON={setForgotPasswordON} />
                  )}
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
                className="text-3xl mt-10 font-bold font-Open text-[#160783]"
              >
                {isLogin ? (
                  <div className="text-lg sm:text-xl md:text-3xl lg:text-6xl flex flex-wrap justify-center">
                    <span className="text-[#a99bfd]">
                      Beyond deliveries.&nbsp;
                    </span>
                    Building connections.
                  </div>
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
                  ""
                ) : (
                  <div className="text-start">
                    From first mile to last mile — one seamless journey.
                  </div>
                )}
              </p>

              {!isLogin ? (
                <div className="z-50 w-[70%] ">
                  <img
                    src="https://i.postimg.cc/4dG3LwY8/login-graphic.png"
                    alt=""
                  />
                </div>
              ) : (
                <div></div>
              )}
              {!isLogin ? (
                <p className="text-[#a99bfd] flex">
                  Begin your journey. Build connections
                </p>
              ) : (
                ""
              )}

              <button
                onClick={() => setIsLogin((v) => !v)}
                className="mt-1 px-7 z-10 py-2.5 rounded-full  text-white border bg-[#160783] border-[#160783]  hover:border-[#160783] hover:bg-transparent hover:text-[#160783] duration-200 transition"
              >
                {!isLogin ? "SIGN UP" : "SIGN IN"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
