import * as React from "react";

interface ISearchProductFilterItemsProps {
  filterItems: any;
}

const SearchProductFilterItems: React.FunctionComponent<
  ISearchProductFilterItemsProps
> = (props) => {
  const { filterItems } = props;
  const [productItems, setProductItems] = React.useState(filterItems);

  return (
    <>
      <div className="flex-wrap flex gap-3">
        {productItems?.map((eachItem: any, index: number) => {
          return (
            <div
              key={index}
              className={`${
                eachItem.selected === true
                  ? "border-[#004EFF]"
                  : "border-[#1C1C1C]"
              } flex items-center whitespace-nowrap  cursor-pointer   rounded border-[0.5px]  px-4 pr-4  py-2 gap-x-2 h-[35px]`}
              onClick={() => {
                let temp = [...productItems];

                for (let i = 0; i < filterItems.length; i++) {
                  if (i !== index) {
                    temp[i].selected = false;
                  }
                }
                temp[index].selected = true;
                setProductItems([...temp]);
              }}
            >
              <img src={eachItem.icon} alt="" className="!w-5 !h-5" />
              <span
                className={`${
                  eachItem.selected ? "text-[#004EFF]" : "text-[#1C1C1C]"
                } font-Open  font-semibold text-sm leading-[18px]`}
              >
                {eachItem.label}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchProductFilterItems;
