import React, { useState } from "react";
import Checkbox from "../../components/CheckBox/index2";
import "../../styles/accordianStyle.css";

// Define the props for the AccordionComponent
interface IPropTypes {
  menuData: any;
  setMenuData: any;
  handle_Level_1_Menu: any;
  handle_Level_2_Pages: any;
  handle_Level_3_Pages: any;
  handle_Level_3_Menu_Pages: any;
  handle_Level_3_Menu_All_Pages: any;
  handle_Level_3_Single_Page_Check: any;
  handle_Level_3_Single_Menu_Page_Check: any;
}

const DynamicAccordion = (props: IPropTypes) => {
  const {
    menuData,
    handle_Level_1_Menu,
    handle_Level_2_Pages,
    handle_Level_3_Pages,
    handle_Level_3_Menu_Pages,
    handle_Level_3_Menu_All_Pages,
    handle_Level_3_Single_Page_Check,
    handle_Level_3_Single_Menu_Page_Check,
  } = props;

  const [activeItem, setActiveItem] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [activeSubItem2, setActiveSubItem2] = useState(null);
  const [isActiveItemAccordionOpen, setIsActiveItemAccordionOpen] =
    useState(false);

  const toggleAccordion = (eventKey: any) => {
    if (activeItem === eventKey) {
      setIsActiveItemAccordionOpen(false);
    } else {
      setIsActiveItemAccordionOpen(true);
    }

    setActiveItem((prevItem) => (prevItem === eventKey ? null : eventKey));
  };

  const toggleSubAccordion = (eventKey: any) => {
    setActiveSubItem((prevItem) => (prevItem === eventKey ? null : eventKey));
  };

  const toggleSubAccordion2 = (eventKey: any) => {
    setActiveSubItem2((prevItem) => (prevItem === eventKey ? null : eventKey));
  };

  return (
    <div className="flex flex-col gap-y-4 ">
      {menuData?.map((roleData: any, index: number) => (
        //This is the main accordion
        <div key={roleData?.id} className="accordionContainerBoxStyle">
          <div
            className={`cursor-pointer px-4 py-3 flex justify-between items-center rounded-lg
            ${
              isActiveItemAccordionOpen && activeItem === roleData?.id
                ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                : "bg-white"
            }
            `}
            onClick={() => toggleAccordion(roleData?.id)}
            key={index}
          >
            <div className="flex basis-[90%] items-center gap-x-2">
              <Checkbox
                checked={roleData?.isActive}
                onChange={() => {
                  console.log("================");
                  handle_Level_1_Menu(roleData?.id, !roleData?.isActive);
                }}
                checkboxClassName="gap-2"
              />
              <div className="text-zinc-900   lg:basis_[90%] text_[14px] font-semibold leading-tight">
                {roleData.name}
                <span> ({roleData?.menu?.length})</span>
              </div>
            </div>
            <svg
              className={`w-5 h-5 transform ${
                activeItem === roleData.id ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {/* //This is the nested level 1 accordion */}
          {activeItem === roleData?.id && (
            <div>
              {roleData?.menu?.map((menuData: any, index2: number) => {
                return (
                  <div
                    key={index2}
                    className="accordionNestedContainerBoxStyle border border-[#e8e8e8] last:border-0"
                  >
                    <div
                      className="cursor-pointer px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleSubAccordion(menuData?.id)}
                    >
                      <div className="flex basis-[90%] items-center gap-x-2">
                        <Checkbox
                          checked={menuData?.isActive}
                          onChange={() =>
                            handle_Level_2_Pages(
                              roleData?.id,
                              menuData?.id,
                              !menuData?.isActive
                            )
                          }
                          checkboxClassName="gap-2"
                        />
                        <div className="text-zinc-900   lg:basis_[90%] text_[14px] font-semibold leading-tight">
                          {menuData?.name}
                        </div>
                      </div>

                      <svg
                        className={`w-5 h-5 transform ${
                          activeSubItem === menuData?.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {/* // This is the nested level 2 accordion */}
                    {activeSubItem === menuData?.id && (
                      <div
                        className={`${true ? "py-2 px-4 flex flex-col" : ""}`}
                      >
                        {menuData?.menu?.length > 0
                          ? menuData?.menu?.map(
                              (menuPagesData: any, index3: number) => {
                                return (
                                  <div key={index3}>
                                    <div
                                      className="cursor-pointer px-4 py-3 flex justify-between items-center"
                                      onClick={() =>
                                        toggleSubAccordion2(menuPagesData?.id)
                                      }
                                    >
                                      <div className="flex basis-[90%] items-center gap-x-2">
                                        <Checkbox
                                          checked={menuPagesData?.isActive}
                                          onChange={() =>
                                            handle_Level_3_Menu_All_Pages(
                                              roleData?.id,
                                              menuData?.id,
                                              menuPagesData?.id,
                                              !menuPagesData?.isActive
                                            )
                                          }
                                          checkboxClassName="gap-2"
                                        />
                                        <div className="text-zinc-900   lg:basis_[90%] text_[14px] font-semibold leading-tight">
                                          {menuPagesData?.name}
                                        </div>
                                      </div>

                                      <svg
                                        className={`w-5 h-5 transform ${
                                          activeSubItem2 === menuPagesData?.id
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </div>
                                    {/* // This is the nested level 3 accordion */}
                                    {activeSubItem2 === menuPagesData?.id && (
                                      <div>
                                        {menuPagesData?.pages?.map(
                                          (
                                            pagesPermission: any,
                                            index4: number
                                          ) => {
                                            return (
                                              <div key={index4}>
                                                <div className="flex flex-col lg:gap-y-2 ">
                                                  <div className="flex items-center">
                                                    <Checkbox
                                                      checked={
                                                        pagesPermission.isActive
                                                      }
                                                      onChange={() =>
                                                        handle_Level_3_Menu_Pages(
                                                          roleData?.id,
                                                          menuData?.id,
                                                          menuPagesData?.id,
                                                          pagesPermission?.id,
                                                          !pagesPermission?.isActive
                                                        )
                                                      }
                                                      checkboxClassName="gap-2"
                                                    />
                                                    <p className="font-bold w-min whitespace-nowrap		">
                                                      {pagesPermission?.name}
                                                    </p>
                                                  </div>

                                                  <div className="flex flex-col lg:flex-row gap-x-4 lg:pl-8">
                                                    <div className="flex items-center">
                                                      <Checkbox
                                                        checked={
                                                          pagesPermission
                                                            ?.permissions
                                                            ?.create
                                                        }
                                                        onChange={() =>
                                                          handle_Level_3_Single_Menu_Page_Check(
                                                            roleData?.id,
                                                            menuData?.id,
                                                            menuPagesData?.id,
                                                            pagesPermission?.id,
                                                            !pagesPermission
                                                              ?.permissions
                                                              ?.create,
                                                            "create"
                                                          )
                                                        }
                                                        checkboxClassName="gap-2"
                                                      />
                                                      <p>Create</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <Checkbox
                                                        checked={
                                                          pagesPermission
                                                            ?.permissions?.read
                                                        }
                                                        onChange={() =>
                                                          handle_Level_3_Single_Menu_Page_Check(
                                                            roleData?.id,
                                                            menuData?.id,
                                                            menuPagesData?.id,
                                                            pagesPermission?.id,
                                                            !pagesPermission
                                                              ?.permissions
                                                              ?.read,
                                                            "read"
                                                          )
                                                        }
                                                        checkboxClassName="gap-2"
                                                      />
                                                      <p>Read</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <Checkbox
                                                        checked={
                                                          pagesPermission
                                                            ?.permissions
                                                            ?.update
                                                        }
                                                        onChange={() =>
                                                          handle_Level_3_Single_Menu_Page_Check(
                                                            roleData?.id,
                                                            menuData?.id,
                                                            menuPagesData?.id,
                                                            pagesPermission?.id,
                                                            !pagesPermission
                                                              ?.permissions
                                                              ?.update,
                                                            "update"
                                                          )
                                                        }
                                                        checkboxClassName="gap-2"
                                                      />
                                                      <p>Edit</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <Checkbox
                                                        checked={
                                                          pagesPermission
                                                            ?.permissions
                                                            ?.delete
                                                        }
                                                        onChange={() =>
                                                          handle_Level_3_Single_Menu_Page_Check(
                                                            roleData?.id,
                                                            menuData?.id,
                                                            menuPagesData?.id,
                                                            pagesPermission?.id,
                                                            !pagesPermission
                                                              ?.permissions
                                                              ?.delete,
                                                            "delete"
                                                          )
                                                        }
                                                        checkboxClassName="gap-2"
                                                      />
                                                      <p>Delete</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <Checkbox
                                                        checked={
                                                          pagesPermission
                                                            ?.permissions
                                                            ?.download
                                                        }
                                                        onChange={() =>
                                                          handle_Level_3_Single_Menu_Page_Check(
                                                            roleData?.id,
                                                            menuData?.id,
                                                            menuPagesData?.id,
                                                            pagesPermission?.id,
                                                            !pagesPermission
                                                              ?.permissions
                                                              ?.download,
                                                            "download"
                                                          )
                                                        }
                                                        checkboxClassName="gap-2"
                                                      />
                                                      <p>Download</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <Checkbox
                                                        checked={
                                                          pagesPermission
                                                            ?.permissions
                                                            ?.upload
                                                        }
                                                        onChange={() =>
                                                          handle_Level_3_Single_Menu_Page_Check(
                                                            roleData?.id,
                                                            menuData?.id,
                                                            menuPagesData?.id,
                                                            pagesPermission?.id,
                                                            !pagesPermission
                                                              ?.permissions
                                                              ?.upload,
                                                            "upload"
                                                          )
                                                        }
                                                        checkboxClassName="gap-2"
                                                      />
                                                      <p>Upload</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )
                          : menuData.pages?.map(
                              (pagesPermission: any, index4: number) => {
                                // This is the nested level 2 accordion
                                return (
                                  <div key={index4}>
                                    {/* <p>Hello</p> */}
                                    <div className="flex flex-col lg:gap-y-2 ">
                                      <div className="flex items-center">
                                        <Checkbox
                                          checked={pagesPermission?.isActive}
                                          onChange={() =>
                                            handle_Level_3_Pages(
                                              roleData.id,
                                              menuData.id,
                                              pagesPermission.id,
                                              !pagesPermission.isActive
                                            )
                                          }
                                          checkboxClassName="gap-2"
                                        />
                                        <p> {pagesPermission?.name}</p>{" "}
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="flex flex-col lg:flex-row gap-x-4 lg:pl-8">
                                          <div className="flex items-center">
                                            <Checkbox
                                              checked={
                                                pagesPermission.permissions
                                                  .create
                                              }
                                              onChange={() =>
                                                handle_Level_3_Single_Page_Check(
                                                  roleData.id,
                                                  menuData.id,
                                                  pagesPermission.id,
                                                  !pagesPermission.permissions
                                                    .create,
                                                  "create"
                                                )
                                              }
                                              checkboxClassName="gap-2"
                                            />
                                            <p>Create</p>
                                          </div>

                                          <div className="flex items-center">
                                            <Checkbox
                                              checked={
                                                pagesPermission.permissions.read
                                              }
                                              onChange={() =>
                                                handle_Level_3_Single_Page_Check(
                                                  roleData.id,
                                                  menuData.id,
                                                  pagesPermission.id,
                                                  !pagesPermission.permissions
                                                    .read,
                                                  "read"
                                                )
                                              }
                                              checkboxClassName="gap-2"
                                            />
                                            <p>Read</p>
                                          </div>
                                          <div className="flex items-center">
                                            <Checkbox
                                              checked={
                                                pagesPermission.permissions
                                                  .update
                                              }
                                              onChange={() =>
                                                handle_Level_3_Single_Page_Check(
                                                  roleData.id,
                                                  menuData.id,
                                                  pagesPermission.id,
                                                  !pagesPermission.permissions
                                                    .update,
                                                  "update"
                                                )
                                              }
                                              checkboxClassName="gap-2"
                                            />
                                            <p>Edit</p>
                                          </div>
                                          <div className="flex items-center">
                                            <Checkbox
                                              checked={
                                                pagesPermission.permissions
                                                  .delete
                                              }
                                              onChange={() =>
                                                handle_Level_3_Single_Page_Check(
                                                  roleData.id,
                                                  menuData.id,
                                                  pagesPermission.id,
                                                  !pagesPermission.permissions
                                                    .delete,
                                                  "delete"
                                                )
                                              }
                                              checkboxClassName="gap-2"
                                            />
                                            <p>Delete</p>
                                          </div>
                                          <div className="flex items-center">
                                            <Checkbox
                                              checked={
                                                pagesPermission.permissions
                                                  .download
                                              }
                                              onChange={() =>
                                                handle_Level_3_Single_Page_Check(
                                                  roleData.id,
                                                  menuData.id,
                                                  pagesPermission.id,
                                                  !pagesPermission.permissions
                                                    .download,
                                                  "download"
                                                )
                                              }
                                              checkboxClassName="gap-2"
                                            />
                                            <p>Download</p>
                                          </div>
                                          <div className="flex items-center">
                                            <Checkbox
                                              checked={
                                                pagesPermission.permissions
                                                  .upload
                                              }
                                              onChange={() =>
                                                handle_Level_3_Single_Page_Check(
                                                  roleData.id,
                                                  menuData.id,
                                                  pagesPermission.id,
                                                  !pagesPermission.permissions
                                                    .upload,
                                                  "upload"
                                                )
                                              }
                                              checkboxClassName="gap-2"
                                            />
                                            <p>Upload</p>
                                          </div>
                                        </div>
                                        {/* <div className="border-t border-gray-400 my-4"></div> */}
                                        {
                                          //<div className="border-t border-gray-400 my-4"></div> dont show line if last element
                                          menuData.pages?.length - 1 !==
                                            index4 && (
                                            <div className="border-t border-gray-400 my-4"></div>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicAccordion;
