import { useState, useRef, useEffect } from "react";
import DeleteIcon from "../../assets/AudioInput/DeleteIcon.svg";
import PauseIcon from "../../assets/AudioInput/PauseIcon.svg";
import MicrophoneIcon from "../../assets/AudioInput/MicrophoneIcon.svg";
interface IAudioInputProps {
  label: string;
  setAudio: any;
  audio: string;
}

export const AudioInput: React.FunctionComponent<IAudioInputProps> = ({
  label,
  audio,
  setAudio,
}) => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<any>();
  const mediaRecorder: any = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const mimeType = "audio/webm";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData: any = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media: any = new MediaRecorder(stream);
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks: any = [];
    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  const deleteRecording = () => {
    setAudio("");
  };

  const getAudioIcon = () => {
    if (permission && audio) {
      return (
        <img
          className="mr-4"
          src={DeleteIcon}
          alt="Delete Recording"
          onClick={() => deleteRecording()}
        />
      );
    } else if (permission && recordingStatus === "inactive") {
      return (
        <img
          className="mr-4"
          src={MicrophoneIcon}
          alt="Start Recording"
          onClick={() => startRecording()}
        />
      );
    } else if (permission && recordingStatus === "recording") {
      return (
        <img
          className="mr-4"
          src={PauseIcon}
          alt="Stop Recording"
          onClick={() => stopRecording()}
        />
      );
    }
  };

  const downloadAudio = () => {
    if (audio) {
      return (
        <span className="text-[12px] text-[#777777] ml-4">
          <a download href={audio}>
            Download
          </a>
        </span>
      );
    } else {
      return <span className="text-[12px] text-[#777777] ml-4">{label}</span>;
    }
  };

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  return (
    <div
      className="flex items-center justify-between h-[48px] rounded border-[1px] border-[#A4A4A4]"
      onClick={() => getMicrophonePermission()}
    >
      {permission ? (
        <>
          {downloadAudio()}
          {getAudioIcon()}
        </>
      ) : (
        <>
          <span className="text-[12px] text-[#777777] ml-4">
            Get Microphone Permission
          </span>
        </>
      )}
    </div>
  );
};
