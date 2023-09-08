import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../../../../components/Button";
import { Breadcum } from "../../../../components/Layout/breadcrum";
import CustomInputBox from "../../../../components/Input";
import { SearchBox } from "../../../../components/SearchBox";
import ReusableAccordion from "../../../../components/CustomAccordian/reusableAccordion"
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import {
    POST_GET_ALL_ROLES_DATA,
    POST_GET_ALL_INITIAL_MENU,
    POST_UPDATE_SELLER_ROLE
} from "../../../../utils/ApiUrls";

const Buttons = (className?: string, updateRoleApi?:any) => {
    const navigate = useNavigate();

    return (
        <div
            className={
                className
                    ? className
                    : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
            }
        >
            <div className="grid col-span-2">
                <CustomButton
                    className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
                    text="UPDATE ROLE"
                    onClick={updateRoleApi}
                />
            </div>
        </div> 
    );
};


function UpdateRole() {
    const [menuData, setMenuData]: any = useState([]);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [companyId, setCompanyId] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access specific query parameters
    const roleId = queryParams.get("roleId");
    const tempRoleName = queryParams?.get("roleName");
    const [roleName, setRoleName]: any = useState(tempRoleName);
    const navigate = useNavigate();

    const handle_Level_1_Menu = (level1_id: any, value: any) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            // find the menu by id
            if (allMenuArray[i]?.id === level1_id) {
                allMenuArray[i].isActive = value;

                // do check on all menu key in json
                let singleMenu: any = allMenuArray[i]?.menu || [];

                for (let j = 0; j < singleMenu?.length; j++) {
                    singleMenu[j].isActive = value;

                    // do check all pages key in json
                    let singlePage: any = singleMenu[j]?.pages || [];

                    for (let k = 0; k < singlePage?.length; k++) {
                        singlePage[k].isActive = value;
                        singlePage[k].permissions.create = value;
                        singlePage[k].permissions.read = value;
                        singlePage[k].permissions.update = value;
                        singlePage[k].permissions.delete = value;
                        singlePage[k].permissions.upload = value;
                        singlePage[k].permissions.download = value;
                    }

                    // do all check level 3 menu key

                    let childMenu: any = singleMenu[j]?.menu || [];

                    for (let k = 0; k < childMenu?.length; k++) {
                        childMenu[k].isActive = value;

                        let childPage: any = childMenu[k]?.pages || [];

                        for (let l = 0; l < childPage?.length; l++) {
                            childPage[l].isActive = value;
                            childPage[l].permissions.create = value;
                            childPage[l].permissions.read = value;
                            childPage[l].permissions.update = value;
                            childPage[l].permissions.delete = value;
                            childPage[l].permissions.upload = value;
                            childPage[l].permissions.download = value;
                        }
                    }
                }

                break;
            }
        }

        setMenuData([...allMenuArray]);
    };

    const handle_Level_2_Pages = (level1_id: any, level2_id: any, value: any) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            // find the menu by id
            if (allMenuArray[i]?.id === level1_id) {
                let topMenuCheck = false;
                // find the level2 doc
                let singleDoc: any = allMenuArray[i]?.menu || [];

                for (let j = 0; j < singleDoc?.length; j++) {
                    if (singleDoc[j].id === level2_id) {
                        singleDoc[j].isActive = value;

                        let singlePage: any = singleDoc[j]?.pages || [];

                        for (let l = 0; l < singlePage?.length; l++) {
                            singlePage[l].isActive = value;

                            singlePage[l].permissions.create = value;
                            singlePage[l].permissions.read = value;
                            singlePage[l].permissions.update = value;
                            singlePage[l].permissions.delete = value;
                            singlePage[l].permissions.upload = value;
                            singlePage[l].permissions.download = value;
                        }

                        let singleMenu: any = singleDoc[j]?.menu || [];

                        for (let l = 0; l < singleMenu?.length; l++) {
                            singleMenu[l].isActive = value;

                            let anotherPage: any = singleMenu[l]?.pages || [];

                            for (let m = 0; m < anotherPage?.length; m++) {
                                anotherPage[m].isActive = value;
                                anotherPage[m].permissions.create = value;
                                anotherPage[m].permissions.read = value;
                                anotherPage[m].permissions.update = value;
                                anotherPage[m].permissions.delete = value;
                                anotherPage[m].permissions.upload = value;
                                anotherPage[m].permissions.download = value;
                            }
                        }
                    }

                    if (singleDoc[j].isActive === true) {
                        topMenuCheck = true;
                    }
                }

                allMenuArray[i].isActive = topMenuCheck;
            }
        }

        setMenuData([...allMenuArray]);
    };

    // all at thirs level page
    const handle_Level_3_Pages = (
        level1_id: any,
        level2_id: any,
        level3_id: any,
        value: any
    ) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            if (allMenuArray[i].id === level1_id) {
                let topMenuCheck = false;
                // level 1
                let singleMenu: any = allMenuArray[i]?.menu || [];
                // level 2
                for (let j = 0; j < singleMenu?.length; j++) {
                    let menuCheck = false;
                    if (singleMenu[j].id === level2_id) {
                        let singlePages: any = singleMenu[j]?.pages || [];

                        for (let k = 0; k < singlePages?.length; k++) {
                            if (singlePages[k].id === level3_id) {
                                singlePages[k].isActive = value;
                                singlePages[k].permissions.create = value;
                                singlePages[k].permissions.read = value;
                                singlePages[k].permissions.delete = value;
                                singlePages[k].permissions.download = value;
                                singlePages[k].permissions.update = value;
                                singlePages[k].permissions.upload = value;
                            }

                            if (singlePages[k].isActive === true) {
                                menuCheck = true;
                            }
                        }

                        singleMenu[j].isActive = menuCheck;
                    }

                    if (singleMenu[j].isActive === true) {
                        topMenuCheck = true;
                    }
                }

                allMenuArray[i].isActive = topMenuCheck;
            }
        }

        setMenuData([...allMenuArray]);
    };

    const handle_Level_3_Menu_Pages = (
        level1_id: any,
        level2_id: any,
        level3_id: any,
        page_id: any,
        value: any
    ) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            // find menu
            if (allMenuArray[i].id === level1_id) {
                let firstMenu: any = allMenuArray[i]?.menu || [];

                let topMenuCheck2 = false;

                for (let j = 0; j < firstMenu?.length; j++) {
                    if (firstMenu[j].id === level2_id) {
                        let secondMenu: any = firstMenu[j]?.menu || [];

                        for (let k = 0; k < secondMenu?.length; k++) {
                            if (secondMenu[k].id === level3_id) {
                                let topMenuCheck = false;
                                let singlePage: any = secondMenu[k].pages;

                                for (let l = 0; l < singlePage?.length; l++) {
                                    if (singlePage[l].id === page_id) {
                                        singlePage[l].isActive = value;
                                        singlePage[l].permissions.create = value;
                                        singlePage[l].permissions.read = value;
                                        singlePage[l].permissions.delete = value;
                                        singlePage[l].permissions.download = value;
                                        singlePage[l].permissions.update = value;
                                        singlePage[l].permissions.upload = value;
                                    }

                                    if (singlePage[l].isActive === true) {
                                        topMenuCheck = true;
                                    }
                                }

                                secondMenu[k].isActive = topMenuCheck;
                            }

                            if (secondMenu[k].isActive === true) {
                                topMenuCheck2 = true;
                            }
                        }
                    }
                }

                allMenuArray[i].isActive = topMenuCheck2;
            }
        }

        setMenuData([...allMenuArray]);
    };

    const handle_Level_3_Menu_All_Pages = (
        level1_id: any,
        level2_id: any,
        level3_id: any,
        value: any,
        keyName: any
    ) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            // find menu
            if (allMenuArray[i].id === level1_id) {
                let firstMenu: any = allMenuArray[i]?.menu || [];

                for (let j = 0; j < firstMenu?.length; j++) {
                    if (firstMenu[j].id === level2_id) {
                        let secondMenu: any = firstMenu[j]?.menu || [];

                        let menuChecked = false;

                        for (let k = 0; k < secondMenu?.length; k++) {
                            if (secondMenu[k].id === level3_id) {
                                secondMenu[k].isActive = value;
                                let singlePage: any = secondMenu[k].pages;

                                for (let l = 0; l < singlePage?.length; l++) {
                                    singlePage[l].isActive = value;
                                    singlePage[l].permissions.create = value;
                                    singlePage[l].permissions.read = value;
                                    singlePage[l].permissions.delete = value;
                                    singlePage[l].permissions.download = value;
                                    singlePage[l].permissions.update = value;
                                    singlePage[l].permissions.upload = value;
                                }
                            }

                            if (secondMenu[k].isActive === true) {
                                menuChecked = true;
                            }
                        }

                        firstMenu[j].isActive = menuChecked;
                    }
                }

                let mainMenuCheck = false;
                for (let j = 0; j < firstMenu?.length; j++) {
                    if (firstMenu[j].isActive === true) {
                        mainMenuCheck = true;
                    }
                }

                allMenuArray[i].isActive = mainMenuCheck;
            }
        }

        setMenuData([...allMenuArray]);
    };

    const handle_Level_3_Single_Page_Check = (
        level1_id: any,
        level2_id: any,
        level3_id: any,
        keyName: any,
        value: any
    ) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            if (allMenuArray[i].id === level1_id) {
                let topMenuCheck = false;
                let singleMenu: any = allMenuArray[i]?.menu || [];
                for (let j = 0; j < singleMenu?.length; j++) {
                    let parentCheck = false;

                    if (singleMenu[j].id === level2_id) {
                        let singlePage: any = singleMenu[j]?.pages || [];

                        for (let k = 0; k < singlePage?.length; k++) {
                            if (singlePage[k].id === level3_id) {
                                singlePage[k].permissions[`${value}`] = keyName;

                                // check all permission are active
                                if (
                                    singlePage[k].permissions.create ||
                                    singlePage[k].permissions.read ||
                                    singlePage[k].permissions.update ||
                                    singlePage[k].permissions.delete ||
                                    singlePage[k].permissions.upload ||
                                    singlePage[k].permissions.download
                                ) {
                                    singlePage[k].isActive = true;
                                } else {
                                    singlePage[k].isActive = false;
                                }
                            }

                            if (singlePage[k].isActive === true) {
                                parentCheck = true;
                            }
                        }

                        singleMenu[j].isActive = parentCheck;
                    }

                    if (singleMenu[j].isActive === true) {
                        topMenuCheck = true;
                    }
                }

                allMenuArray[i].isActive = topMenuCheck;
            }
        }

        setMenuData([...allMenuArray]);
    };

    const handle_Level_3_Single_Menu_Page_Check = (
        level1_id: any,
        level2_id: any,
        level3_id: any,
        keyName: any,
        value: any,
        key: any
    ) => {
        let allMenuArray: any = [...menuData] || [];

        for (let i = 0; i < allMenuArray?.length; i++) {
            if (allMenuArray[i].id === level1_id) {
                // level 1
                let singleMenu: any = allMenuArray[i]?.menu || [];

                for (let j = 0; j < singleMenu?.length; j++) {
                    let secondMenu: any = singleMenu[j]?.menu || [];

                    let topMenuCheck = false;

                    for (let k = 0; k < secondMenu?.length; k++) {
                        if (secondMenu[k].id === level3_id) {
                            // level 2
                            let menuCheck = false;

                            let singlePage: any = secondMenu[k]?.pages || [];

                            for (let l = 0; l < singlePage?.length; l++) {
                                if (singlePage[l].id === keyName) {
                                    singlePage[l].permissions[`${key}`] = value;
                                    // check all permission are active
                                    if (
                                        singlePage[l].permissions.create ||
                                        singlePage[l].permissions.read ||
                                        singlePage[l].permissions.update ||
                                        singlePage[l].permissions.delete ||
                                        singlePage[l].permissions.upload ||
                                        singlePage[l].permissions.download
                                    ) {
                                        singlePage[l].isActive = true;
                                    } else {
                                        singlePage[l].isActive = false;
                                    }
                                }

                                if (singlePage[l].isActive === true) {
                                    menuCheck = true;
                                }
                            }

                            secondMenu[k].isActive = menuCheck;
                        }

                        if (secondMenu[k].isActive === true) {
                            topMenuCheck = true;
                        }
                    }

                    singleMenu[j].isActive = topMenuCheck;
                }

                for (let j = 0; j < singleMenu?.length; j++) {
                    let topMenuCheck = false;

                    let singleChild = singleMenu[j]?.menu || [];

                    for (let k = 0; k < singleChild?.length; k++) {
                        if (singleChild[k].isActive === true) {
                            topMenuCheck = true;
                        }
                    }

                    singleMenu[j].isActive = topMenuCheck;
                }

                // for menu check

                let currentMenu = allMenuArray[i]?.menu || [];

                let topMenuCheck2 = false;

                for (let j = 0; j < currentMenu?.length; j++) {
                    if (currentMenu[j].isActive === true) {
                        topMenuCheck2 = true;
                    }
                }

                allMenuArray[i].isActive = topMenuCheck2;
            }
        }

        setMenuData([...allMenuArray]);
    };

    const getRoleInfo = async () => {
        try {
            const { data } = await POST(POST_GET_ALL_ROLES_DATA, {
                roleId,
            });

            const { data: menus } = await POST(POST_GET_ALL_INITIAL_MENU, {});

            console.log("menus", menus)

            if (data?.success) {
                setMenuData(menus?.data || []);
                let temp = data?.data?.[0]?.roleName;
                let companyInfoId = data?.data?.[0]?.companyId;
                setRoleName(temp || "N/A");
                setCompanyId(companyInfoId);
            } else {
                toast.error("Failed to fetch intiail menu");
            }
        } catch (error) {
            toast.error("Failed to fetch initial menu");
        }
    };

    const updateRoleName = (e: any) => {
        setRoleName(e.target.value);
    };

    const updateRoleApi:any = async () => {
        try {
            const reqBody = {
                roleName,
                menu: menuData,
                companyId,
                roleId,
            };

            const { data } = await POST(POST_UPDATE_SELLER_ROLE, reqBody);
            if (data?.success) {
                navigate("/profile/settings/role-management");
            } else {
                toast.error(data?.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getRoleInfo();
    }, []);

    return (
        <div>
            <div>
                <div className=" lg:ml-5 lg:mr-6 mx-5">
                    <Breadcum label='Update Role' component={Buttons("", updateRoleApi)} />
                </div>
                <div className='mx-5 mt-4'>

                    <div className=" mx-5 flex justify-between items-center">

                        <div className="w-[300px]">
                            <CustomInputBox
                                label="Enter Role Name"
                                value={roleName}
                                onChange={(e) => updateRoleName(e)}
                            />
                        </div>


                        <div className="">
                            <div className="flex ">
                                <div>
                                    <SearchBox label="Search" value="" onChange={() => { }} />
                                </div>
                                <div
                                    className="flex justify-between items-center p-2 gap-x-2"
                                // onClick={() => setFilterModal(true)} 
                                >
                                    {/* <img src={FilterIcon} alt="" /> */}
                                    <span className="text-[#004EFF] text-[14px] font-semibold">
                                        FILTER
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* 
<div className="">
  <CustomAccordion
    menuData={menuData}
    setMenuData={setMenuData}
    handle_Level_1_Menu={handle_Level_1_Menu}
    handle_Level_2_Pages={handle_Level_2_Pages}
    handle_Level_3_Pages={handle_Level_3_Pages}
    handle_Level_3_Menu_Pages={handle_Level_3_Menu_Pages}
    handle_Level_3_Menu_All_Pages={handle_Level_3_Menu_All_Pages}
    handle_Level_3_Single_Page_Check={handle_Level_3_Single_Page_Check}
    handle_Level_3_Single_Menu_Page_Check={
      handle_Level_3_Single_Menu_Page_Check
    }
  />
</div> */}
                    <div className="lg:ml-5 lg:mr-6 mx-5 mt-8">
                        <ReusableAccordion
                            menuData={menuData}
                            setMenuData={setMenuData}
                            handle_Level_1_Menu={handle_Level_1_Menu}
                            handle_Level_2_Pages={handle_Level_2_Pages}
                            handle_Level_3_Pages={handle_Level_3_Pages}
                            handle_Level_3_Menu_Pages={handle_Level_3_Menu_Pages}
                            handle_Level_3_Menu_All_Pages={handle_Level_3_Menu_All_Pages}
                            handle_Level_3_Single_Page_Check={handle_Level_3_Single_Page_Check}
                            handle_Level_3_Single_Menu_Page_Check={
                                handle_Level_3_Single_Menu_Page_Check
                            }
                        />
                    </div>
                </div>

                {/* <CustomModal
        isModalOpen={isSearchModalOpen}
        closeModal={() => {
            setIsSearchModalOpen(false);
        }}
        modalPositionStyle="mid-center"
        children={
            <div className="flex flex-col items-center">
                <img src={DoneGif} alt="Done Gif" width={100} height={100} />
            </div>
        }
    ></CustomModal> */}
                <ToastContainer />
            </div>
        </div>
    )
}

export default UpdateRole
