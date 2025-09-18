import React, { useState, useEffect } from "react";
import { POST } from "../../../utils/webService";
import { GET_SELLER_AGREEMENT } from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../components/Spinner/index";

interface Agreement {
  id?: string | number;
  createdAt?: any;
  [key: string]: any; // For dynamic agreement names like sampleAgreement, sampleAgreement2, etc.
}

const AgreementsCard: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAgreements = async () => {
    setIsLoading(true);
    try {
      const { data } = await POST(GET_SELLER_AGREEMENT, {});
      if (data?.success) {
        setAgreements(data.data || []);
      } else {
        // toast.error(data?.error || "Failed to fetch agreements");
        console.error("Error fetching agreements:", data?.error);
      }
    } catch (error) {
      console.error("Error fetching agreements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAgreements();
  }, []);

  const handleDownload = (agreement: any) => {
    // Create a temporary link and trigger download
    if (agreement?.fileUrl) {
      const link = document.createElement("a");
      link.href = agreement.fileUrl;
      link.download = agreement.name || "agreement.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("Download URL not available");
    }
  };

  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-[#E8E8E8] overflow-hidden mt-4 mb-4">
      <div className="flex items-center bg-[#F5F5F5] py-3 px-4 border-b border-[#E8E8E8]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 text-[#160783]"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <h3 className="text-[#1C1C1C] font-semibold text-lg">Agreements</h3>
      </div>

      <div style={{ maxHeight: "calc(3 * 64px)" }} className="overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner />
          </div>
        ) : agreements.length === 0 ? (
          <div className="py-6 px-4 text-center text-gray-500">
            No agreements available
          </div>
        ) : (
          <div>
            {agreements.map((agreement, index) => {
              // Get the properties that are not 'createdAt' (which are the agreement names)
              const agreementProps = Object.keys(agreement).filter(
                (key) => key !== "createdAt" && key !== "id"
              );

              return agreementProps.map((propName, propIndex) => {
                // Format the name nicely (e.g., "sampleAgreement" → "Sample Agreement")
                const displayName = propName
                  .replace(/([A-Z])/g, " $1") // Add space before capital letters
                  .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                  .replace(/([0-9]+)/g, " $1"); // Add space before numbers

                return (
                  <div
                    key={`${index}-${propIndex}`}
                    className="py-4 px-4 h-16 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">
                        {displayName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(agreement.createdAt)}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleDownload({
                          fileUrl: agreement[propName],
                          name: propName,
                        })
                      }
                      className="text-gray-500 hover:text-[#160783]"
                      title="Download Agreement"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </button>
                  </div>
                );
              });
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgreementsCard;
