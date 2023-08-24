import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useNavigate } from "react-router-dom";
import PhotoScreenIcon from "../../../../assets/KYC/PhotoScreen.svg";
import ImageCenterIcon from "../../../../assets/KYC/PhotoCenter.svg";
import Modal from "./Modal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const [showModal, setShowModal] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [snapImage, setSnapImage] = useState("");
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const navigate = useNavigate();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const GenerateImageWithCanvas = (videoElem: HTMLVideoElement) => {
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
    if (videoStarted) {
      const video: any = videoRef.current;
      video?.srcObject?.getVideoTracks()[0]?.stop();
      await GenerateImageWithCanvas(video);
      video.srcObject = null;
      setVideoStarted(false);
      setShowModal(false);
    }
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

  const photoIdentificationComponent = () => {
    return (
      <div className="relative  lg:h-full lg:px-0">
        <div className=" lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          className="!mt-[44px]"
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <div className="flex flex-col items-center mb-[84px]  lg:mb-11">
          <p className="font-semibold font-Lato text-lg text-[#1C1C1C] mb-11 lg:mb-6">
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

        <div className="flex flex-col px-5 lg:justify-center lg:items-center  lg:pb-0 lg:mb-6">
          <ServiceButton
            text="CAPTURE PHOTO"
            className="bg-[#1C1C1C] text-white !h-[36px] !w-full lg:!w-[320px] !py-2 !px-4 "
            onClick={() => {
              getSnapshot();
              // getCameraPermission();
              navigate("/onboarding/kyc-otp-form");
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
    );
  };

  return (
    <div>
      {!isBigScreen && photoIdentificationComponent()}

      {isBigScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[700px] "
          overlayClassName="flex  items-center"
        >
          {photoIdentificationComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default Index;
