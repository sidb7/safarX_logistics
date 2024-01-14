import { useEffect } from "react";
import PopUpModal from "../../../../components/CustomModal/customBottomModal";

import ServiceButton from "../../../../components/Button/ServiceButton";

interface ITypesProps {
  showModal: boolean;
  setShowModal: any;
  cameraPermission: boolean;
  setCameraPermission: any;
  setVideoStarted: any;
  videoRef: any;
}

const Modal = (props: ITypesProps) => {
  const {
    showModal,
    setShowModal,
    cameraPermission,
    setCameraPermission,
    setVideoStarted,
    videoRef,
  } = props;

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices?.forEach((eachDevices) => {
        if (eachDevices.kind === "videoinput") {
          setCameraPermission(true);
        }
      });
    })();
  }, []);

  const getCameraPermission = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    devices?.forEach((eachDevices) => {
      if (eachDevices.kind === "videoinput") {
        setCameraPermission(true);
      }
    });

    if (!cameraPermission) {
      setVideoStarted(true);
      navigator.mediaDevices
        .getUserMedia({ video: { width: 262, height: 280 } })
        .then((stream) => {
          let video: any = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error("error:", err);
        });
    }

    setShowModal(false);
  };

  return (
    <div>
      <PopUpModal
        isOpen={showModal}
        contentLabel=""
        onRequestClose={setShowModal}
        overlayClassName="flex items-center "
        className="!rounded !border-none w-[270px] mx-8 "
      >
        <div className="flex flex-col ">
          <div className="flex flex-col items-center p-5">
            <p className="font-semibold text-[18px] text-[#616161] text-center mb-1">
              Shipyaari would like to Access the Camera
            </p>
            <p className="font-normal text-[14px] text-[#9E9E9E]  text-center">
              To register with Shipyaari & keep things secure, we'll need to
              capture a scan of your face. Need access to your Camera to do
              this.
            </p>
          </div>

          <div className="flex items-center justify-between px-5 bg-[#FFFFFF] ">
            <ServiceButton
              text="DON'T ALLOW"
              onClick={() => setShowModal(false)}
              className="bg-[#FFFFFF] text-[#9E9E9E]  text-[14px] font-medium border-none "
            />
            <ServiceButton
              text="OK"
              onClick={() => getCameraPermission()}
              className="bg-[#FFFFFF]  font-medium text-[14px] text-[#1E88E5] border-none "
            />
          </div>
        </div>
      </PopUpModal>
    </div>
  );
};

export default Modal;
