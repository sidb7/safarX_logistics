import { useState, useEffect } from "react";

interface propTypes {
  base64String: string;
  width: string;
  height: string;
}

function Base64ToPdfPreview(props: propTypes) {
  const { base64String, width, height } = props;
  const [pdfUrl, setPdfUrl] = useState("");
  console.log(pdfUrl);

  useEffect(() => {
    if (base64String) {
      console.log(base64String);
      const binaryString = window.atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const file = new Blob([bytes.buffer], { type: "application/pdf" });
      const fileUrl: string = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
    }
  }, [base64String]);

  return pdfUrl ? (
    <embed src={pdfUrl} type="application/pdf" width={width} height={height} />
  ) : null;
}

export default Base64ToPdfPreview;
