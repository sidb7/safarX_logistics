// import { useMediaQuery } from "react-responsive";
// import { useState } from "react";
// import CrossIcon from "../../../assets/CloseIcon.svg";
// import CustomButton from "../../../components/Button";
// import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
// import ReferEarn from "../../../assets/Profile/ReferEarn.svg";
// import { useNavigate } from "react-router-dom";
// import RightSideModal from "../../../components/CustomModal/customRightModal";
// import ShareIcon from "../../../assets/Label/share.svg";
// import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";

// export const ProfileReferEarn = ({ ReferData }: any) => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const isItLgScreen = useMediaQuery({
//     query: "(min-width: 1024px)",
//   });
//   const navigateTo = () => {
//     if (!isItLgScreen) navigate("/profile/refer-earn");
//     else setIsOpen(true);
//   };
//   return (
//     <>
//       <div
//         className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100 `}
//         onClick={navigateTo}
//       >
//         <div className={`flex justify-between items-center h-[44px]`}>
//           <div className="flex">
//             <img className="ml-4" src={ReferEarn} alt="" />
//             <span className="text-base font-semibold text-[#1C1C1C] ml-2">
//               Refer and Earn
//             </span>
//           </div>
//           <div className="mr-4">
//             <img src={RightArrowIcon} alt="" className="ml-4" />
//           </div>
//         </div>
//       </div>
//       <RightSideModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         wrapperClassName="!justify-start outline-none"
//       >
//         <div className="flex flex-col w-full p-4 mt-5 ">
//           <div className="flex justify-between w-full ">
//             <div className="text-[24px] font-normal">Refer And Earn</div>
//             <div>
//               <img
//                 src={CrossIcon}
//                 onClick={() => setIsOpen(false)}
//                 alt="close Icon"
//                 width="25px"
//               />{" "}
//             </div>
//           </div>
//           <div className="flex flex-col mt-8 gap-y-4 w-ful justify-center items-center">
//             <img
//               src={ReferData?.referImage}
//               alt="Referral Code"
//               className="w-[156px] mt-[10rem]"
//             />
//             <p className="p-3 mt-4 text-[16px] font-semibold whitespace-nowrap">
//               Referral Code - {ReferData?.referCode}
//             </p>
//           </div>
//         </div>
//         <div style={{ width: "-webkit-fill-available" }}>
//           <footer
//             style={{ width: "-webkit-fill-available" }}
//             className=" fixed  bottom-0	"
//           >
//             <div
//               style={{
//                 width: "-webkit-fill-available",
//                 boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
//               }}
//               className="flex justify-end shadow-lg border-[1px] border-white bg-[#FFFFFF] gap-[32px] p-[10px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
//             >
//               <div className="flex justify-center">
//                 <div className="p-2">
//                   <CustomButton
//                     text="SHARE"
//                     showIcon={true}
//                     icon={ShareIcon}
//                     onClick={() => {}}
//                     className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
//                   />
//                 </div>
//                 <div className="p-2">
//                   <CustomButton
//                     text="COPY"
//                     showIcon={true}
//                     icon={CopyIcon}
//                     onClick={() => {}}
//                     className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </RightSideModal>
//     </>
//   );
// };







import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomButton from "../../../components/Button";
import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
import ReferEarn from "../../../assets/Profile/ReferEarn.svg";
import { useNavigate } from "react-router-dom";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import ShareIcon from "../../../assets/Label/share.svg";
import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";
import { SocialShareBar } from "../../../components/SocialShareBar/SocialShareBar"; 
import { SELLER_WEB_URL } from "../../../utils/ApiUrls" 


export const ProfileReferEarn = ({ ReferData }: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const navigateTo = () => {
    if (!isItLgScreen) navigate("/profile/refer-earn");
    else setIsOpen(true);
  };

  const shareUrl = `${SELLER_WEB_URL}/onboarding/signup/${ReferData?.referCode}`;
  const shareTitle = "Join Shipyaari";
  const shareMessage = `Sign up on Shipyaari to streamline your logistics: ${shareUrl}\nUse my referral code: ${ReferData?.referCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ReferData?.referCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <div
        className="border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100"
        onClick={navigateTo}
      >
        <div className="flex justify-between items-center h-[44px]">
          <div className="flex">
            <img className="ml-4" src={ReferEarn} alt="" />
            <span className="text-base font-semibold text-[#1C1C1C] ml-2">
              Refer and Earn
            </span>
          </div>
          <div className="mr-4">
            <img src={RightArrowIcon} alt="" className="ml-4" />
          </div>
        </div>
      </div>

      <RightSideModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        wrapperClassName="!justify-start outline-none"
      >
        <div className="flex flex-col w-full p-4 mt-5">
          <div className="flex justify-between w-full">
            <div className="text-[24px] font-normal">Refer And Earn</div>
            <div>
              <img
                src={CrossIcon}
                onClick={() => setIsOpen(false)}
                alt="close Icon"
                width="25px"
              />
            </div>
          </div>
          <div className="flex flex-col mt-8 gap-y-4 w-full justify-center items-center">
            <img
              src={ReferData?.referImage}
              alt="Referral Code"
              className="w-[156px] mt-[10rem]"
            />
            <p className="p-3 mt-4 text-[16px] font-semibold whitespace-nowrap">
              Referral Code - {ReferData?.referCode}
            </p>
            {copySuccess && (
              <div className="text-green-500 text-sm">Referral Code Copied to clipboard!</div>
            )}
          </div>
        </div>

        <div style={{ width: "-webkit-fill-available" }}>
          <footer
            style={{ width: "-webkit-fill-available" }}
            className="fixed bottom-0"
          >
            <div
              style={{
                width: "-webkit-fill-available",
                boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
              }}
              className="flex justify-end shadow-lg border-[1px] border-white bg-[#FFFFFF] gap-[32px] p-[10px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
            >
              <div className="flex justify-center relative">
                
                <SocialShareBar
                  showOptions={showShareOptions}
                  onClose={() => setShowShareOptions(false)}
                  shareUrl={shareUrl}
                  shareTitle={shareTitle}
                  shareMessage={shareMessage}
                  position="top"
                  className="right-8"
                />
                <div className="p-2">
                  <CustomButton
                    text="SHARE"
                    showIcon={true}
                    icon={ShareIcon}
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
                  />
                </div>
                <div className="p-2">
                  <CustomButton
                    text="COPY"
                    showIcon={true}
                    icon={CopyIcon}
                    onClick={handleCopy}
                    className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </RightSideModal>
    </>
  );
};







// import { useMediaQuery } from "react-responsive";
// import { useState ,useEffect,useRef} from "react";
// import CrossIcon from "../../../assets/CloseIcon.svg";
// import CustomButton from "../../../components/Button";
// import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
// import ReferEarn from "../../../assets/Profile/ReferEarn.svg";
// import { useNavigate } from "react-router-dom";
// import RightSideModal from "../../../components/CustomModal/customRightModal";
// import ShareIcon from "../../../assets/Label/share.svg";
// import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";

// export const ProfileReferEarn = ({ ReferData }: any) => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showShareOptions, setShowShareOptions] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const shareBarRef = useRef<any>(null);

//   const isItLgScreen = useMediaQuery({
//     query: "(min-width: 1024px)",
//   });

//   // Handle click outside share bar
//   useEffect(() => {
//     const handleClickOutside = (event:any) => {
//       if (shareBarRef.current && !shareBarRef.current.contains(event.target)) {
//         setShowShareOptions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const navigateTo = () => {
//     if (!isItLgScreen) navigate("/profile/refer-earn");
//     else setIsOpen(true);
//   };

//   const shareUrl = "https://app.shipyaari.com/onboarding/signup";
//   const shareTitle = "Join Shipyaari";
//   const shareMessage = `Sign up on Shipyaari to streamline your logistics: ${shareUrl}\nUse my referral code: ${ReferData?.referCode}`;

//   // Copy referral code function
//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(ReferData?.referCode);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy text: ', err);
//     }
//   };

//   // Common popup window options
//   const popupOptions = 'width=600,height=600,location=yes,resizable=yes,scrollbars=yes,status=yes';

//   // Share functions for different platforms
//   const shareHandlers = {
//     whatsapp: () => {
//       window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     },
//     facebook: () => {
//       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     },
//     twitter: () => {
//       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     },
//     linkedin: () => {
//       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareMessage)}`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     },
//     gmail: () => {
//       window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     },
//     telegram: () => {
//       window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     },
//     instagram: () => {
//       // Note: Instagram doesn't have a direct share URL, but we can open the app
//       window.open(`instagram://camera`, 'sharePopup', popupOptions);
//       setShowShareOptions(false);
//     }
//   };

//   const socialPlatforms = [
//     {
//       name: 'whatsapp',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//         </svg>
//       ),
//       bgColor: 'bg-[#25D366]',
//       handler: shareHandlers.whatsapp
//     },
//     {
//       name: 'facebook',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//         </svg>
//       ),
//       bgColor: 'bg-[#1877F2]',
//       handler: shareHandlers.facebook
//     },
//     {
//       name: 'twitter',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//         </svg>
//       ),
//       bgColor: 'bg-black',
//       handler: shareHandlers.twitter
//     },
//     {
//       name: 'linkedin',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//         </svg>
//       ),
//       bgColor: 'bg-[#0A66C2]',
//       handler: shareHandlers.linkedin
//     },
//     {
//       name: 'telegram',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
//         </svg>
//       ),
//       bgColor: 'bg-[#0088cc]',
//       handler: shareHandlers.telegram
//     },
//     {
//       name: 'instagram',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
//         </svg>
//       ),
//       bgColor: 'bg-[#E4405F]',
//       handler: shareHandlers.instagram
//     },
//     {
//       name: 'gmail',
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
//         </svg>
//       ),
//       bgColor: 'bg-[#EA4335]',
//       handler: shareHandlers.gmail
//     }
//   ];

//   // Social share bar component
//   const SocialShareBar = () => (
//     <div 
//     ref={shareBarRef}  // Add this line
//       className={`absolute bottom-full right-8 mb-2 flex items-center gap-2 p-2 rounded-full bg-white shadow-lg transition-all duration-300 ${
//         showShareOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
//       }`}
//       style={{ transform: showShareOptions ? 'none' : 'translateY(1rem)' }}
//     >
//       {socialPlatforms.map((platform) => (
//         <button
//           key={platform.name}
//           onClick={platform.handler}
//           className={`w-8 h-8 rounded-full ${platform.bgColor} flex items-center justify-center text-white hover:brightness-90 transition-all hover:scale-110`}
//         >
//           <platform.icon />
//         </button>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       <div
//         className="border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100"
//         onClick={navigateTo}
//       >
//         <div className="flex justify-between items-center h-[44px]">
//           <div className="flex">
//             <img className="ml-4" src={ReferEarn} alt="" />
//             <span className="text-base font-semibold text-[#1C1C1C] ml-2">
//               Refer and Earn
//             </span>
//           </div>
//           <div className="mr-4">
//             <img src={RightArrowIcon} alt="" className="ml-4" />
//           </div>
//         </div>
//       </div>

//       <RightSideModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         wrapperClassName="!justify-start outline-none"
//       >
//         <div className="flex flex-col w-full p-4 mt-5">
//           <div className="flex justify-between w-full">
//             <div className="text-[24px] font-normal">Refer And Earn</div>
//             <div>
//               <img
//                 src={CrossIcon}
//                 onClick={() => setIsOpen(false)}
//                 alt="close Icon"
//                 width="25px"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col mt-8 gap-y-4 w-full justify-center items-center">
//             <img
//               src={ReferData?.referImage}
//               alt="Referral Code"
//               className="w-[156px] mt-[10rem]"
//             />
//             <p className="p-3 mt-4 text-[16px] font-semibold whitespace-nowrap">
//               Referral Code - {ReferData?.referCode}
//             </p>
//             {copySuccess && (
//               <div className="text-green-500 text-sm">Referral Code Copied to clipboard!</div>
//             )}
//           </div>
//         </div>

//         <div style={{ width: "-webkit-fill-available" }}>
//           <footer
//             style={{ width: "-webkit-fill-available" }}
//             className="fixed bottom-0"
//           >
//             <div
//               style={{
//                 width: "-webkit-fill-available",
//                 boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
//               }}
//               className="flex justify-end shadow-lg border-[1px] border-white bg-[#FFFFFF] gap-[32px] p-[10px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
//             >
//               <div className="flex justify-center relative">
//                 {/* Social Share Bar */}
//                 <SocialShareBar />
//                 <div className="p-2">
//                   <CustomButton
//                     text="SHARE"
//                     showIcon={true}
//                     icon={ShareIcon}
//                     onClick={() => setShowShareOptions(!showShareOptions)}
//                     className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
//                   />
//                 </div>
//                 <div className="p-2">
//                   <CustomButton
//                     text="COPY"
//                     showIcon={true}
//                     icon={CopyIcon}
//                     onClick={handleCopy}
//                     className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </RightSideModal>
//     </>
//   );
// };
