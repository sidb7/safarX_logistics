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
      <div className="flex-nowrap lg:flex-wrap flex lg:gap-3 gap-x-4 overflow-auto">
        {productItems?.map((eachItem: any, index: number) => {
          return (
            <div
              key={index}
              className={`${
                eachItem.selected === true
                  ? "border-[#004EFF]"
                  : "border-[#1C1C1C]"
              } flex items-center whitespace-nowrap   cursor-pointer   rounded border-[0.5px]  px-5 pr-10   py-2 gap-x-2 h-[35px]`}
              onClick={() => {
                let temp = [...productItems];
                let selectionObject: any = [];
                for (let i = 0; i < temp.length; i++) {
                  const element = temp[i];
                  element.selected = false;
                  selectionObject.push(element);
                }

                selectionObject[index].selected = true;

                setProductItems([...selectionObject]);
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
