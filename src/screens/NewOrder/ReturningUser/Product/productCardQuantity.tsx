interface IPackageBoxProps {
  props: {
    recommended?: boolean;
    proImage: any;
    header: string;
    text: string;
  }[];
  className?: string;
}

const ProductCardQuantity: React.FunctionComponent<IPackageBoxProps> = ({
  props,
  className,
}) => {
  return (
    <div>
      {props?.map((each, index) => {
        return (
          <div className={{} ? "relative py-2 mt-4" : "py-2"} key={index}>
            <div
              className={`${className} flex flex-col  py-2 justify-center h-[94px] w-[238px] border-2 rounded-md px-4`}
            >
              {each.recommended ? (
                <span className="absolute top-0 bg-sky-500 border-2 rounded-md border-sky-500 text-white text-xs px-4 h-[20px]">
                  Quantity 3
                </span>
              ) : (
                ""
              )}
              <div className="flex gap-x-2">
                <img src={each.proImage} alt="" />
                <div>
                  <p className="text-[14px] font-medium">{each.header}</p>
                  <p className="text-[14px]">{each.text}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCardQuantity;
