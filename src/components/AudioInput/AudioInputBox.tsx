import React from "react";
import MicrophoneIcon from "../../assets/AudioInput/MicrophoneIcon.svg";
import DeleteIcon from "../../assets/AudioInput/DeleteIcon.svg";
import PlayIcon from "../../assets/AudioInput/PlayIcon.svg";

interface IAudioInputProps {
  label:string
  onClick: any
  audio: string;
  setAudio: any
}

export const AudioInputBox: React.FunctionComponent<IAudioInputProps> = ({
  label,
  onClick,
  audio,
  setAudio,
}) => {
  const playAudio = () => {
    new Audio(audio).play();
  };

  const getAudioIcon = () => {
    if (audio) {
      return (
        <img
          className="ml-4"
          src={PlayIcon}
          alt="Start Recording"
          onClick={() => playAudio()}
        />
      );
    } else {
      return (
        <>
          <img className="ml-4" src={MicrophoneIcon} alt="Microphone" />
          <span className="text-[12px] text-[#777777] ml-4">
           {label}
          </span>
        </>
      );
    }
  };

  return (
    <div
      className="flex items-center justify-between h-[48px] rounded border-[1px] border-[#A4A4A4]"
      onClick={onClick}
    >
      <div className="flex">{getAudioIcon()}</div>
      {audio && (
        <div className="flex">
          <img
            className="mr-4"
            src={DeleteIcon}
            alt="Delete Audio"
            onClick={() => setAudio("")}
          />
        </div>
      )}
    </div>
  );
};

export default AudioInputBox;
