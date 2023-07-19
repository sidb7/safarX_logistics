import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useNavigate } from "react-router-dom";
import PhotoScreenIcon from "../../../../assets/KYC/PhotoScreen.svg";
import ImageCenterIcon from "../../../../assets/KYC/PhotoCenter.svg";
import Modal from "./Modal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";

type Props = {};

const Index = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [snapImage, setSnapImage] = useState("");
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);
  const navigate = useNavigate();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const GenerateImageWithCanvas = (videoElem: HTMLVideoElement) => {
    const navigate = useNavigate();
    

    if (videoStarted) {
      const canvas = document.createElement("canvas");
      canvas.width = 264;
      canvas.height = 282;
      canvas.getContext("2d")?.drawImage(videoElem, 0, 0);
      const image = canvas.toDataURL("image/png");
      setSnapImage(image);
    }
  };
  const getSnapshot = async () => {
    const video: any = videoRef.current;
    video?.srcObject?.getVideoTracks()[0]?.stop();
    await GenerateImageWithCanvas(video);
    video.srcObject = null;
    setVideoStarted(false);
    setShowModal(false);
  };

  const startVideo = () => {
    setVideoStarted(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 255, height: 275 } })
      .then((stream) => {
        let video: any = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <div>
      <div className="relative top-0 px-5 lg:hidden">
      <WelcomeHeader
        title="Welcome to Shipyaari"
        content="Kindly complete your KYC"
      />

      <div className="flex flex-col items-center   mb-10">
        <p className="font-semibold text-[18px] text-[#1C1C1C] mb-12">
          Photo Identification
        </p>

        <div
          className="relative"
          onClick={() => {
            if (cameraPermission && !videoStarted) {
              startVideo();
            } else if (!cameraPermission) {
              setShowModal(true);
            }
          }}
        >
          {cameraPermission && (
            <img src={PhotoScreenIcon} alt="" width={264} height={282} />
          )}
          {snapImage ? (
            <img
              className="absolute top-1 left-1 z-200"
              src={snapImage}
              alt=""
              width={264}
              height={282}
            />
          ) : (
            <img
              src={ImageCenterIcon}
              alt=""
              className=" absolute top-[40%] left-[40%] "
            />
          )}
          {cameraPermission && (
            <video className="absolute top-1 left-1 z-200" ref={videoRef} />
          )}
        </div>
      </div>

      <div className="flex flex-col fixed bottom-0 right-5 left-5  pb-12">
        <ServiceButton
          text="CAPTURE SELFIE"
          className="bg-[#1C1C1C] text-white w-full mb-5"
          onClick={() => {
            getSnapshot();
            // getCameraPermission();
            // navigate("/account/kyc-otp-form");
          }}
        />
      </div>
      <Modal
        showModal={showModal}
        setShowModal={() => {
          setShowModal(false);
        }}
        cameraPermission={cameraPermission}
        setCameraPermission={setCameraPermission}
        setVideoStarted={setVideoStarted}
        videoRef={videoRef}
      />
      </div>

      {isBigScreen && (
        <div className="mx-4 hidden lg:block lg:h-[602px]">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px]"
            overlayClassName="flex  items-center"
          >
          <div className="relative hidden lg:block">
              <div className="flex justify-between items-center shadow-md  p-4 ">
                <img src={CompanyLogo} alt="" />
                <img src={CrossLogo} alt="" onClick={closeModal} />
              </div>
              <WelcomeHeader
                title="Welcome to Shipyaari"
                content="Kindly complete your KYC"
              />

              <div className="flex flex-col items-center mb-10 mx-[90px]">
                    <p className="font-semibold text-[18px] text-[#1C1C1C] mb-12">
                      Photo Identification
                    </p>

                    <div
                      className="relative"
                      onClick={() => {
                        if (cameraPermission && !videoStarted) {
                          startVideo();
                        } else if (!cameraPermission) {
                          setShowModal(true);
                        }
                      }}
                    >
                      {cameraPermission && (
                        <img src={PhotoScreenIcon} alt="" width={264} height={282} />
                      )}
                      {snapImage ? (
                        <img
                          className="absolute top-1 left-1 z-200"
                          src={snapImage}
                          alt=""
                          width={264}
                          height={282}
                        />
                      ) : (
                        <img
                          src={ImageCenterIcon}
                          alt=""
                          className=" absolute top-[40%] left-[40%] "
                        />
                      )}
                      {cameraPermission && (
                        <video className="absolute top-1 left-1 z-200" ref={videoRef} />
                      )}
                    </div>
                    <div className="flex flex-col pb-12 lg:pb-28 xl:pb-40 w-full mt-5">
                      <ServiceButton
                        text="CAPTURE SELFIE"
                        className="bg-[#1C1C1C] text-white w-full mb-5"
                        onClick={() => {
                          getSnapshot();
                          // getCameraPermission();
                          // navigate("/account/kyc-otp-form");
                        }}
                      />
                    </div>
              </div>

             
              <Modal
                showModal={showModal}
                setShowModal={() => {
                  setShowModal(false);
                }}
                cameraPermission={cameraPermission}
                setCameraPermission={setCameraPermission}
                setVideoStarted={setVideoStarted}
                videoRef={videoRef}
              />
          </div>
        
        </CustomBottomModal>
      </div>

  )};

  </div>
  );
};

export default Index;
