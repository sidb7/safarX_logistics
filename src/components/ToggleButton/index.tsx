interface ToggleButtonPropTypes {
  imgSrc :string
}

export const ToggleButton = (props:ToggleButtonPropTypes) => {
  const {imgSrc} = props
  return (
    <div className={`flex h-[32px] px-4 rounded-md py-2 items-center gap-2 border-1 bg-[#7CCA62]`}>
      <span><img src={imgSrc} alt="toggle icon" /> </span>
      <span className={`text-white`}>ACTIVE</span>
    </div>
  );
};
