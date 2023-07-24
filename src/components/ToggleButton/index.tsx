import toggleIcon from ".././../assets/notifications/Property 1=toggle on.svg";

export const ToggleButton = () => {
  return (
    <div className={`flex h-[32px] px-4 rounded-md py-2 items-center gap-2 border-1 bg-[#7CCA62]`}>
      <span><img src={toggleIcon} alt="toggle icon" /> </span>
      <span className={`text-white`}>ACTIVE</span>
    </div>
  );
};
